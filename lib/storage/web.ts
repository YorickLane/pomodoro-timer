/**
 * Web 端存储适配器（IndexedDB）
 */

import { PomodoroSession, AppSettings } from '@/types/models';
import { format } from 'date-fns';
import { IStorageAdapter } from './types';

const DB_NAME = 'PomodoroTimerDB';
const DB_VERSION = 1;
const SESSIONS_STORE = 'pomodoro_sessions';
const SETTINGS_STORE = 'settings';

export class WebStorageAdapter implements IStorageAdapter {
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        this.initDefaultSettings().then(resolve).catch(reject);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 创建 pomodoro_sessions 存储
        if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
          const sessionsStore = db.createObjectStore(SESSIONS_STORE, { keyPath: 'id' });
          sessionsStore.createIndex('date_key', 'date_key', { unique: false });
          sessionsStore.createIndex('start_time', 'start_time', { unique: false });
          sessionsStore.createIndex('type', 'type', { unique: false });
        }

        // 创建 settings 存储
        if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
        }
      };
    });
  }

  private async initDefaultSettings(): Promise<void> {
    const settings = await this.getSettings();

    // 如果没有设置，创建默认值
    if (!settings.work_duration) {
      const defaultSettings: AppSettings = {
        work_duration: 25,
        short_break_duration: 5,
        long_break_duration: 15,
        daily_goal: 8,
        notification_enabled: false, // Web 上默认关闭（浏览器通知需要权限）
        sound_enabled: true,
        auto_start_break: false,
        auto_start_work: false,
        theme_mode: 'system',
        onboarding_completed: false,
      };

      for (const [key, value] of Object.entries(defaultSettings)) {
        await this.updateSetting(key as keyof AppSettings, value);
      }
    }
  }

  async addSession(
    type: 'work' | 'short_break' | 'long_break',
    duration_minutes: number,
    planned_duration: number,
    completed: boolean
  ): Promise<PomodoroSession> {
    if (!this.db) throw new Error('Database not initialized');

    const now = Date.now();
    const session: PomodoroSession = {
      id: this.generateUUID(),
      type,
      duration_minutes,
      planned_duration,
      start_time: now - duration_minutes * 60 * 1000,
      end_time: now,
      completed,
      date_key: format(now, 'yyyy-MM-dd'),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SESSIONS_STORE], 'readwrite');
      const store = transaction.objectStore(SESSIONS_STORE);
      const request = store.add(session);

      request.onsuccess = () => resolve(session);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteSession(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SESSIONS_STORE], 'readwrite');
      const store = transaction.objectStore(SESSIONS_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSessionsByDate(date_key: string): Promise<PomodoroSession[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SESSIONS_STORE], 'readonly');
      const store = transaction.objectStore(SESSIONS_STORE);
      const index = store.index('date_key');
      const request = index.getAll(date_key);

      request.onsuccess = () => {
        const sessions = request.result as PomodoroSession[];
        // 按开始时间倒序排列
        sessions.sort((a, b) => b.start_time - a.start_time);
        resolve(sessions);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getTodayCompletedCount(): Promise<number> {
    const today = format(Date.now(), 'yyyy-MM-dd');
    const sessions = await this.getSessionsByDate(today);
    return sessions.filter(s => s.type === 'work' && s.completed).length;
  }

  async getTodayTotalFocusMinutes(): Promise<number> {
    const today = format(Date.now(), 'yyyy-MM-dd');
    const sessions = await this.getSessionsByDate(today);
    return sessions
      .filter(s => s.type === 'work' && s.completed)
      .reduce((sum, s) => sum + s.duration_minutes, 0);
  }

  async getSettings(): Promise<AppSettings> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SETTINGS_STORE], 'readonly');
      const store = transaction.objectStore(SETTINGS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const rows = request.result as Array<{ key: string; value: string }>;
        const settings: Partial<AppSettings> = {};

        rows.forEach(row => {
          const key = row.key as keyof AppSettings;
          settings[key] = JSON.parse(row.value);
        });

        resolve(settings as AppSettings);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SETTINGS_STORE], 'readwrite');
      const store = transaction.objectStore(SETTINGS_STORE);
      const request = store.put({ key, value: JSON.stringify(value) });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
