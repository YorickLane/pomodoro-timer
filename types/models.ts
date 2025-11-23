/**
 * 番茄钟数据模型
 */

// 番茄钟会话类型
export type SessionType = 'work' | 'short_break' | 'long_break';

// 番茄钟会话记录
export interface PomodoroSession {
  id: string;
  type: SessionType;
  duration_minutes: number;      // 实际时长（分钟）
  planned_duration: number;       // 计划时长（分钟）
  start_time: number;             // 开始时间戳
  end_time: number;               // 结束时间戳
  completed: boolean;             // 是否完成
  date_key: string;               // 日期键 (YYYY-MM-DD)
  label?: string;                 // 可选标签
}

// 应用设置
export interface AppSettings {
  work_duration: number;          // 工作时长（分钟）默认 25
  short_break_duration: number;   // 短休息时长（分钟）默认 5
  long_break_duration: number;    // 长休息时长（分钟）默认 15
  daily_goal: number;             // 每日目标（番茄钟数量）默认 8
  notification_enabled: boolean;  // 是否启用通知
  sound_enabled: boolean;         // 是否启用声音
  auto_start_break: boolean;      // 自动开始休息
  auto_start_work: boolean;       // 自动开始工作
}

// 今日统计
export interface TodayStats {
  completed_count: number;        // 完成的番茄钟数量
  total_focus_minutes: number;    // 总专注时长（分钟）
  completion_rate: number;        // 完成率（0-100）
  sessions: PomodoroSession[];    // 今日所有会话
}

// 计时器状态
export type TimerStatus = 'idle' | 'working' | 'short_break' | 'long_break' | 'paused';

// 计时器状态数据
export interface TimerState {
  status: TimerStatus;
  remainingSeconds: number;       // 剩余秒数
  totalSeconds: number;           // 总秒数
  currentSession: PomodoroSession | null;
  completedToday: number;         // 今日完成数
}
