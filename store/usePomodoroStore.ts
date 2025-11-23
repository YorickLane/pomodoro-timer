/**
 * 番茄钟全局状态管理
 */

import { create } from 'zustand';
import { format } from 'date-fns';
import { AppSettings, PomodoroSession, TimerStatus, TodayStats } from '@/types/models';
import { storageAdapter } from '@/lib/storage';
import { PomodoroTimer } from '@/lib/timer';
import {
  notifyWorkComplete,
  notifyShortBreakComplete,
  notifyLongBreakComplete,
} from '@/lib/notifications';

interface PomodoroState {
  // 设置
  settings: AppSettings | null;
  settingsLoaded: boolean;

  // 计时器状态
  timer: PomodoroTimer;
  timerStatus: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;

  // 今日统计
  todayStats: TodayStats | null;
  sessions: PomodoroSession[];

  // Actions - 初始化
  initialize: () => Promise<void>;
  loadSettings: () => Promise<void>;
  loadTodayStats: () => Promise<void>;

  // Actions - 设置
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;

  // Actions - 计时器
  startWork: () => void;
  startBreak: (isLong: boolean) => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  reset: () => void;

  // Actions - 会话记录
  completeSession: (type: 'work' | 'short_break' | 'long_break', completed: boolean) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

// 创建计时器实例
const timer = new PomodoroTimer();

export const usePomodoroStore = create<PomodoroState>((set, get) => {
  // 订阅计时器状态变化
  timer.subscribe((timerState) => {
    // 保存之前的状态，用于判断计时结束时是工作还是休息
    const previousStatus = get().timerStatus;

    set({
      timerStatus: timerState.status,
      remainingSeconds: timerState.remainingSeconds,
      totalSeconds: timerState.totalSeconds,
    });

    // 计时结束时的处理
    if (timerState.remainingSeconds === 0 && timerState.status === 'idle') {
      const state = get();
      const wasWorking = previousStatus === 'working';

      if (wasWorking) {
        // 工作结束，异步保存工作会话
        get().completeSession('work', true).then(() => {
          // 发送通知
          if (state.settings?.notification_enabled) {
            notifyWorkComplete(state.settings.sound_enabled);
          }

          // 自动开始休息
          if (state.settings?.auto_start_break) {
            // 判断是长休息还是短休息：每完成 4 个工作番茄钟后是长休息
            const todayStats = get().todayStats;
            const completedCount = todayStats?.completed_count || 0;
            const isLongBreak = completedCount % 4 === 0;

            if (__DEV__) {
              console.log(`Auto start break: completed=${completedCount}, isLong=${isLongBreak}`);
            }

            setTimeout(() => get().startBreak(isLongBreak), 1000);
          }
        });
      } else {
        // 休息结束
        const isLongBreak = previousStatus === 'long_break';
        const isShortBreak = previousStatus === 'short_break';

        if (isLongBreak || isShortBreak) {
          // 保存休息会话
          const breakType = isLongBreak ? 'long_break' : 'short_break';
          get().completeSession(breakType, true).then(() => {
            // 发送通知
            if (state.settings?.notification_enabled) {
              if (isLongBreak) {
                notifyLongBreakComplete(state.settings.sound_enabled);
              } else {
                notifyShortBreakComplete(state.settings.sound_enabled);
              }
            }

            // 自动开始工作
            if (state.settings?.auto_start_work) {
              setTimeout(() => get().startWork(), 1000);
            }
          });
        }
      }
    }
  });

  return {
    // 初始状态
    settings: null,
    settingsLoaded: false,
    timer,
    timerStatus: 'idle',
    remainingSeconds: 0,
    totalSeconds: 0,
    todayStats: null,
    sessions: [],

    // 初始化
    initialize: async () => {
      await get().loadSettings();
      await get().loadTodayStats();
    },

    // 加载设置
    loadSettings: async () => {
      try {
        const settings = await storageAdapter.getSettings();
        set({ settings, settingsLoaded: true });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    },

    // 加载今日统计
    loadTodayStats: async () => {
      try {
        const today = format(Date.now(), 'yyyy-MM-dd');
        const sessions = await storageAdapter.getSessionsByDate(today);
        const completedCount = await storageAdapter.getTodayCompletedCount();
        const totalFocusMinutes = await storageAdapter.getTodayTotalFocusMinutes();

        const settings = get().settings;
        const dailyGoal = settings?.daily_goal || 8;
        const completionRate = (completedCount / dailyGoal) * 100;

        set({
          sessions,
          todayStats: {
            completed_count: completedCount,
            total_focus_minutes: totalFocusMinutes,
            completion_rate: Math.min(completionRate, 100),
            sessions,
          },
        });
      } catch (error) {
        console.error('Failed to load today stats:', error);
      }
    },

    // 更新设置
    updateSetting: async (key, value) => {
      try {
        await storageAdapter.updateSetting(key, value);
        await get().loadSettings();
      } catch (error) {
        console.error('Failed to update setting:', error);
      }
    },

    // 开始工作
    startWork: () => {
      const settings = get().settings;
      if (!settings) return;

      timer.startWork(settings.work_duration);
    },

    // 开始休息
    startBreak: (isLong: boolean) => {
      const settings = get().settings;
      if (!settings) return;

      if (isLong) {
        timer.startLongBreak(settings.long_break_duration);
      } else {
        timer.startShortBreak(settings.short_break_duration);
      }
    },

    // 暂停
    pause: () => {
      timer.pause();
    },

    // 恢复
    resume: () => {
      timer.resume();
    },

    // 跳过
    skip: () => {
      timer.skip();
    },

    // 重置
    reset: () => {
      timer.reset();
    },

    // 完成会话
    completeSession: async (type: 'work' | 'short_break' | 'long_break', completed: boolean) => {
      try {
        const state = get();

        // 计算实际时长（分钟）
        const duration = Math.floor(state.totalSeconds / 60);
        const planned = duration; // 计划时长等于总时长

        await storageAdapter.addSession(type, duration, planned, completed);
        await get().loadTodayStats();

        if (__DEV__) {
          console.log(`Session completed: ${type}, duration: ${duration} min, completed: ${completed}`);
        }
      } catch (error) {
        console.error('Failed to complete session:', error);
      }
    },

    // 删除会话
    deleteSession: async (id: string) => {
      try {
        await storageAdapter.deleteSession(id);
        await get().loadTodayStats();
      } catch (error) {
        console.error('Failed to delete session:', error);
      }
    },
  };
});
