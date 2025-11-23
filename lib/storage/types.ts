/**
 * 存储层抽象接口
 * 支持多平台（Mobile: SQLite, Web: IndexedDB）
 */

import { PomodoroSession, AppSettings } from '@/types/models';

export interface IStorageAdapter {
  // 初始化
  initialize(): Promise<void>;

  // 番茄钟会话记录
  addSession(
    type: 'work' | 'short_break' | 'long_break',
    duration_minutes: number,
    planned_duration: number,
    completed: boolean
  ): Promise<PomodoroSession>;
  deleteSession(id: string): Promise<void>;
  getSessionsByDate(date_key: string): Promise<PomodoroSession[]>;
  getTodayCompletedCount(): Promise<number>;
  getTodayTotalFocusMinutes(): Promise<number>;

  // 设置
  getSettings(): Promise<AppSettings>;
  updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<void>;
}
