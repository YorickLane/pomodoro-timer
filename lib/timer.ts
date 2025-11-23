/**
 * 番茄钟计时器核心逻辑
 * 使用 timestamp 实现精确计时，支持后台恢复
 */

import { TimerStatus } from '@/types/models';

export interface TimerState {
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
  startTime: number | null;
  pausedAt: number | null;
  sessionCount: number; // 当前周期已完成的工作会话数
}

export class PomodoroTimer {
  private state: TimerState;
  private interval: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<(state: TimerState) => void> = new Set();

  constructor() {
    this.state = {
      status: 'idle',
      remainingSeconds: 0,
      totalSeconds: 0,
      startTime: null,
      pausedAt: null,
      sessionCount: 0,
    };
  }

  /**
   * 订阅状态变化
   */
  subscribe(listener: (state: TimerState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * 通知所有订阅者
   */
  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * 获取当前状态
   */
  getState(): TimerState {
    return { ...this.state };
  }

  /**
   * 开始工作会话
   */
  startWork(durationMinutes: number): void {
    this.start('working', durationMinutes * 60);
  }

  /**
   * 开始短休息
   */
  startShortBreak(durationMinutes: number): void {
    this.start('short_break', durationMinutes * 60);
  }

  /**
   * 开始长休息
   */
  startLongBreak(durationMinutes: number): void {
    this.start('long_break', durationMinutes * 60);
  }

  /**
   * 通用开始方法
   */
  private start(status: TimerStatus, totalSeconds: number): void {
    this.stop();

    this.state = {
      status,
      remainingSeconds: totalSeconds,
      totalSeconds,
      startTime: Date.now(),
      pausedAt: null,
      sessionCount: this.state.sessionCount,
    };

    this.startInterval();
    this.notify();
  }

  /**
   * 暂停
   */
  pause(): void {
    if (this.state.status === 'idle' || this.state.status === 'paused') {
      return;
    }

    this.stopInterval();
    this.state.status = 'paused';
    this.state.pausedAt = Date.now();
    this.notify();
  }

  /**
   * 恢复
   */
  resume(): void {
    if (this.state.status !== 'paused' || !this.state.startTime || !this.state.pausedAt) {
      return;
    }

    // 计算暂停时长
    const pausedDuration = Date.now() - this.state.pausedAt;

    // 调整开始时间，使得剩余时间不变
    this.state.startTime += pausedDuration;
    this.state.pausedAt = null;

    // 恢复之前的状态（working 或 break）
    const previousStatus = this.getPreviousStatus();
    this.state.status = previousStatus;

    this.startInterval();
    this.notify();
  }

  /**
   * 获取暂停前的状态
   */
  private getPreviousStatus(): TimerStatus {
    // 根据剩余时间和总时间判断之前是什么状态
    // 这里简单处理，实际可以存储更多状态信息
    if (this.state.totalSeconds >= 20 * 60) {
      return 'working';
    } else if (this.state.totalSeconds >= 10 * 60) {
      return 'long_break';
    } else {
      return 'short_break';
    }
  }

  /**
   * 跳过当前会话
   */
  skip(): void {
    this.stop();
  }

  /**
   * 停止并重置
   */
  stop(): void {
    this.stopInterval();

    this.state = {
      status: 'idle',
      remainingSeconds: 0,
      totalSeconds: 0,
      startTime: null,
      pausedAt: null,
      sessionCount: this.state.sessionCount,
    };

    this.notify();
  }

  /**
   * 重置所有状态（包括会话计数）
   */
  reset(): void {
    this.stop();
    this.state.sessionCount = 0;
    this.notify();
  }

  /**
   * 完成当前会话
   */
  complete(isWork: boolean): void {
    if (isWork) {
      this.state.sessionCount++;
    }
    this.stop();
  }

  /**
   * 开始计时循环
   */
  private startInterval(): void {
    this.stopInterval();

    this.interval = setInterval(() => {
      this.tick();
    }, 100); // 每 100ms 更新一次，更流畅
  }

  /**
   * 停止计时循环
   */
  private stopInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * 计时更新（基于 timestamp 的精确计时）
   */
  private tick(): void {
    if (!this.state.startTime || this.state.status === 'idle' || this.state.status === 'paused') {
      return;
    }

    // 计算已过时间
    const elapsed = Date.now() - this.state.startTime;
    const elapsedSeconds = Math.floor(elapsed / 1000);

    // 计算剩余时间
    const remaining = this.state.totalSeconds - elapsedSeconds;

    if (remaining <= 0) {
      // 计时结束
      this.state.remainingSeconds = 0;
      this.notify();
      this.handleComplete();
    } else {
      this.state.remainingSeconds = remaining;
      this.notify();
    }
  }

  /**
   * 处理计时结束
   */
  private handleComplete(): void {
    const wasWorking = this.state.status === 'working';
    this.complete(wasWorking);
  }

  /**
   * 从后台恢复
   * 在 App 从后台回到前台时调用
   */
  restoreFromBackground(): void {
    if (this.state.status === 'idle' || this.state.status === 'paused') {
      return;
    }

    // 立即更新状态
    this.tick();

    // 如果计时器还在运行，确保 interval 正在执行
    const isActive = this.state.status === 'working' ||
                     this.state.status === 'short_break' ||
                     this.state.status === 'long_break';
    if (isActive && !this.interval) {
      this.startInterval();
    }
  }

  /**
   * 获取进度百分比
   */
  getProgress(): number {
    if (this.state.totalSeconds === 0) return 0;
    return ((this.state.totalSeconds - this.state.remainingSeconds) / this.state.totalSeconds) * 100;
  }

  /**
   * 获取格式化的剩余时间
   */
  getFormattedTime(): string {
    const minutes = Math.floor(this.state.remainingSeconds / 60);
    const seconds = this.state.remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
