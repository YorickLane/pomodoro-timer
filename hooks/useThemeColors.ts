/**
 * 主题颜色 Hook
 */

import { useColorScheme } from 'react-native';
import { Colors, ColorScheme } from '@/constants/Colors';
import { usePomodoroStore } from '@/store/usePomodoroStore';
import { ThemeMode } from '@/types/models';

export function useThemeColors() {
  const systemColorScheme = useColorScheme() as ColorScheme;
  const settings = usePomodoroStore((state) => state.settings);

  const themeMode: ThemeMode = settings?.theme_mode || 'system';

  // 根据主题模式决定实际使用的主题
  let theme: ColorScheme;
  if (themeMode === 'system') {
    theme = systemColorScheme === 'dark' ? 'dark' : 'light';
  } else {
    theme = themeMode;
  }

  return {
    colors: Colors[theme],
    isDark: theme === 'dark',
    theme,
    themeMode,
  };
}
