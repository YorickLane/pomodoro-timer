/**
 * 移动端存储适配器（SQLite）
 */

import * as SQLite from 'expo-sqlite';
import { PomodoroSession, AppSettings } from '@/types/models';
import { format } from 'date-fns';
import { IStorageAdapter } from './types';

const DB_NAME = 'pomodoro_timer.db';
let db: SQLite.SQLiteDatabase | null = null;

export class MobileStorageAdapter implements IStorageAdapter {
  async initialize(): Promise<void> {
    try {
      db = await SQLite.openDatabaseAsync(DB_NAME);

      // 创建番茄钟会话表
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS pomodoro_sessions (
          id TEXT PRIMARY KEY,
          type TEXT NOT NULL,
          duration_minutes INTEGER NOT NULL,
          planned_duration INTEGER NOT NULL,
          start_time INTEGER NOT NULL,
          end_time INTEGER NOT NULL,
          completed INTEGER NOT NULL,
          date_key TEXT NOT NULL,
          label TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_date_key ON pomodoro_sessions(date_key);
        CREATE INDEX IF NOT EXISTS idx_type ON pomodoro_sessions(type);
      `);

      // 创建设置表
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
      `);

      await this.initDefaultSettings();

      if (__DEV__) {
        console.log('Mobile storage initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize mobile storage:', error);
      throw error;
    }
  }

  private async initDefaultSettings(): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    const defaultSettings: AppSettings = {
      work_duration: 25,
      short_break_duration: 5,
      long_break_duration: 15,
      daily_goal: 8,
      notification_enabled: true,
      sound_enabled: true,
      auto_start_break: false,
      auto_start_work: false,
    };

    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM settings'
    );

    if (result && result.count === 0) {
      for (const [key, value] of Object.entries(defaultSettings)) {
        await db.runAsync(
          'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
          [key, JSON.stringify(value)]
        );
      }
    }
  }

  async addSession(
    type: 'work' | 'short_break' | 'long_break',
    duration_minutes: number,
    planned_duration: number,
    completed: boolean
  ): Promise<PomodoroSession> {
    if (!db) throw new Error('Database not initialized');

    const now = Date.now();
    const session: PomodoroSession = {
      id: this.generateUUID(),
      type,
      duration_minutes,
      planned_duration,
      start_time: now - duration_minutes * 60 * 1000, // 反推开始时间
      end_time: now,
      completed,
      date_key: format(now, 'yyyy-MM-dd'),
    };

    await db.runAsync(
      `INSERT INTO pomodoro_sessions
       (id, type, duration_minutes, planned_duration, start_time, end_time, completed, date_key, label)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.id,
        session.type,
        session.duration_minutes,
        session.planned_duration,
        session.start_time,
        session.end_time,
        completed ? 1 : 0,
        session.date_key,
        session.label || null,
      ]
    );

    return session;
  }

  async deleteSession(id: string): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    await db.runAsync('DELETE FROM pomodoro_sessions WHERE id = ?', [id]);
  }

  async getSessionsByDate(date_key: string): Promise<PomodoroSession[]> {
    if (!db) throw new Error('Database not initialized');

    const sessions = await db.getAllAsync<{
      id: string;
      type: string;
      duration_minutes: number;
      planned_duration: number;
      start_time: number;
      end_time: number;
      completed: number;
      date_key: string;
      label: string | null;
    }>(
      'SELECT * FROM pomodoro_sessions WHERE date_key = ? ORDER BY start_time DESC',
      [date_key]
    );

    return sessions.map(s => ({
      ...s,
      type: s.type as 'work' | 'short_break' | 'long_break',
      completed: s.completed === 1,
      label: s.label || undefined,
    }));
  }

  async getTodayCompletedCount(): Promise<number> {
    if (!db) throw new Error('Database not initialized');

    const today = format(Date.now(), 'yyyy-MM-dd');
    const result = await db.getFirstAsync<{ count: number | null }>(
      `SELECT COUNT(*) as count FROM pomodoro_sessions
       WHERE date_key = ? AND type = 'work' AND completed = 1`,
      [today]
    );

    return result?.count || 0;
  }

  async getTodayTotalFocusMinutes(): Promise<number> {
    if (!db) throw new Error('Database not initialized');

    const today = format(Date.now(), 'yyyy-MM-dd');
    const result = await db.getFirstAsync<{ total: number | null }>(
      `SELECT SUM(duration_minutes) as total FROM pomodoro_sessions
       WHERE date_key = ? AND type = 'work' AND completed = 1`,
      [today]
    );

    return result?.total || 0;
  }

  async getSettings(): Promise<AppSettings> {
    if (!db) throw new Error('Database not initialized');

    const rows = await db.getAllAsync<{ key: string; value: string }>(
      'SELECT key, value FROM settings'
    );

    const settings: Partial<AppSettings> = {};
    rows?.forEach(row => {
      const key = row.key as keyof AppSettings;
      settings[key] = JSON.parse(row.value);
    });

    return settings as AppSettings;
  }

  async updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');

    await db.runAsync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [key, JSON.stringify(value)]
    );
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
