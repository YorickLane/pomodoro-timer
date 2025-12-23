import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, useColorScheme } from 'react-native';
import 'react-native-reanimated';
import '@/locales';

import { initDatabase } from '@/lib/db';
import { usePomodoroStore } from '@/store/usePomodoroStore';
import { ThemeMode } from '@/types/models';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppContent() {
  const systemColorScheme = useColorScheme();
  const settings = usePomodoroStore((state) => state.settings);
  const router = useRouter();
  const segments = useSegments();

  const themeMode: ThemeMode = settings?.theme_mode || 'system';

  let isDark: boolean;
  if (themeMode === 'system') {
    isDark = systemColorScheme === 'dark';
  } else {
    isDark = themeMode === 'dark';
  }

  useEffect(() => {
    if (settings) {
      const currentSegment = segments[0] as string;
      const inOnboarding = currentSegment === 'onboarding';
      const needsOnboarding = !settings.onboarding_completed;

      if (needsOnboarding && !inOnboarding) {
        router.replace('/onboarding' as never);
      } else if (!needsOnboarding && inOnboarding) {
        router.replace('/(tabs)' as never);
      }
    }
  }, [settings, segments]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ presentation: 'card' }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const initialize = usePomodoroStore((state) => state.initialize);

  useEffect(() => {
    async function prepare() {
      try {
        await initDatabase();
        await initialize();
        if (__DEV__) {
          console.log('App initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, [initialize]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>...</Text>
      </View>
    );
  }

  return <AppContent />;
}
