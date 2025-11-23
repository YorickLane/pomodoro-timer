/**
 * 通知管理
 * Web 平台禁用通知功能（浏览器通知需要额外实现）
 */

import { Platform } from 'react-native';
import i18n from '@/locales';

// 条件导入：仅在非 Web 平台导入 expo-notifications
let Notifications: typeof import('expo-notifications') | null = null;

if (Platform.OS !== 'web') {
  Notifications = require('expo-notifications');
}

// 扩展 Expo Notifications 类型定义
type TimeIntervalTriggerInput = {
  type: any;
  seconds: number;
  repeats?: boolean;
};

// 配置通知处理方式（仅移动端）
if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/**
 * 请求通知权限
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  // Web 平台暂不支持
  if (Platform.OS === 'web') {
    return false;
  }

  if (!Notifications) return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * 工作结束通知
 */
export async function notifyWorkComplete(soundEnabled: boolean = true): Promise<void> {
  if (Platform.OS === 'web' || !Notifications) {
    return;
  }

  const trigger: TimeIntervalTriggerInput = {
    type: Notifications!.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 1,
  };

  await Notifications!.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.work_complete.title'),
      body: i18n.t('notifications.work_complete.body'),
      sound: soundEnabled,
    },
    trigger,
  });
}

/**
 * 短休息结束通知
 */
export async function notifyShortBreakComplete(soundEnabled: boolean = true): Promise<void> {
  if (Platform.OS === 'web' || !Notifications) {
    return;
  }

  const trigger: TimeIntervalTriggerInput = {
    type: Notifications!.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 1,
  };

  await Notifications!.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.short_break_complete.title'),
      body: i18n.t('notifications.short_break_complete.body'),
      sound: soundEnabled,
    },
    trigger,
  });
}

/**
 * 长休息结束通知
 */
export async function notifyLongBreakComplete(soundEnabled: boolean = true): Promise<void> {
  if (Platform.OS === 'web' || !Notifications) {
    return;
  }

  const trigger: TimeIntervalTriggerInput = {
    type: Notifications!.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 1,
  };

  await Notifications!.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.long_break_complete.title'),
      body: i18n.t('notifications.long_break_complete.body'),
      sound: soundEnabled,
    },
    trigger,
  });
}

/**
 * 取消所有通知
 */
export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === 'web' || !Notifications) {
    return;
  }
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * 发送立即通知（测试用）
 */
export async function sendTestNotification(): Promise<void> {
  if (Platform.OS === 'web' || !Notifications) {
    // Web 平台使用浏览器通知（可选）
    if (Platform.OS === 'web' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(i18n.t('notifications.test.title'), {
          body: i18n.t('notifications.test.body'),
          icon: '/favicon.png',
        });
      }
    }
    return;
  }

  const trigger: TimeIntervalTriggerInput = {
    type: Notifications!.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 1,
  };

  await Notifications!.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.test.title'),
      body: i18n.t('notifications.test.body'),
      sound: true,
    },
    trigger,
  });
}
