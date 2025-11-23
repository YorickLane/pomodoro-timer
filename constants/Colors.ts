/**
 * 应用主题颜色配置
 */

export const Colors = {
  light: {
    // 基础颜色
    background: '#FFFFFF',
    secondaryBackground: '#F8F9FA',
    cardBackground: '#FFFFFF',

    // 文本颜色
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textDisabled: '#C7C7CC',

    // 主题色
    primary: '#FF6347', // 番茄红
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    // 边框和分隔线
    border: '#E5E5EA',
    separator: '#C6C6C8',

    // 番茄钟状态颜色
    working: '#FF6347',        // 工作中 - 番茄红
    shortBreak: '#34C759',     // 短休息 - 绿色
    longBreak: '#0A84FF',      // 长休息 - 蓝色
    idle: '#9E9E9E',           // 空闲 - 灰色
    paused: '#FF9500',         // 暂停 - 橙色

    // 进度环颜色
    progressBackground: '#E0E0E0',
    progressWorking: '#FF6347',
    progressBreak: '#34C759',

    // 按钮
    buttonBackground: '#E3F2FD',
    buttonBorder: '#90CAF9',
    buttonText: '#1976D2',

    // 记录列表
    sessionItemBackground: '#F5F5F5',

    // Switch
    switchTrackOff: '#D1D1D6',
    switchTrackOn: '#34C759',
    switchThumb: '#FFFFFF',

    // 统计卡片
    statsCardBackground: '#F5F5F5',
    statsCardBorder: '#E5E5EA',
  },

  dark: {
    // 基础颜色
    background: '#000000',
    secondaryBackground: '#1C1C1E',
    cardBackground: '#1C1C1E',

    // 文本颜色
    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textTertiary: '#8E8E93',
    textDisabled: '#48484A',

    // 主题色
    primary: '#FF6347', // 番茄红
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',

    // 边框和分隔线
    border: '#38383A',
    separator: '#48484A',

    // 番茄钟状态颜色
    working: '#FF6347',        // 工作中 - 番茄红
    shortBreak: '#30D158',     // 短休息 - 绿色
    longBreak: '#0A84FF',      // 长休息 - 蓝色
    idle: '#8E8E93',           // 空闲 - 灰色
    paused: '#FF9F0A',         // 暂停 - 橙色

    // 进度环颜色
    progressBackground: '#3A3A3C',
    progressWorking: '#FF6347',
    progressBreak: '#30D158',

    // 按钮
    buttonBackground: '#1C3A52',
    buttonBorder: '#2D5A7B',
    buttonText: '#5AC8FA',

    // 记录列表
    sessionItemBackground: '#2C2C2E',

    // Switch
    switchTrackOff: '#39393D',
    switchTrackOn: '#30D158',
    switchThumb: '#FFFFFF',

    // 统计卡片
    statsCardBackground: '#2C2C2E',
    statsCardBorder: '#38383A',
  },
};

export type ColorScheme = 'light' | 'dark';
