/**
 * 数据库初始化
 */

import { storageAdapter } from './storage';

export async function initDatabase(): Promise<void> {
  try {
    await storageAdapter.initialize();
    if (__DEV__) {
      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
