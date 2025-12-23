import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/hooks/useThemeColors';
import { usePomodoroStore } from '@/store/usePomodoroStore';
import { CircularTimer } from '@/components/CircularTimer';

export default function TimerScreen() {
  const { t } = useTranslation();
  const { colors } = useThemeColors();
  const {
    initialize,
    timerStatus,
    remainingSeconds,
    totalSeconds,
    todayStats,
    settings,
    startWork,
    startBreak,
    pause,
    resume,
    skip,
  } = usePomodoroStore();

  // 初始化
  useEffect(() => {
    initialize();
  }, []);

  // 获取下一个番茄钟类型
  const getNextSessionType = () => {
    if (!todayStats) return 'work';
    const completedCount = todayStats.completed_count;

    if (timerStatus === 'working') {
      // 工作结束后，判断是长休息还是短休息
      return (completedCount + 1) % 4 === 0 ? 'long_break' : 'short_break';
    } else {
      // 休息结束后，开始工作
      return 'work';
    }
  };

  // 开始按钮处理
  const handleStart = () => {
    if (timerStatus === 'idle') {
      startWork();
    } else if (timerStatus === 'paused') {
      resume();
    }
  };

  // 暂停按钮处理
  const handlePause = () => {
    if (timerStatus === 'working' || timerStatus === 'short_break' || timerStatus === 'long_break') {
      pause();
    }
  };

  // 跳过按钮处理
  const handleSkip = () => {
    skip();
  };

  // 判断是否可以开始
  const canStart = timerStatus === 'idle' || timerStatus === 'paused';
  const canPause = timerStatus === 'working' || timerStatus === 'short_break' || timerStatus === 'long_break';
  const canSkip = timerStatus !== 'idle';

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 今日统计卡片 */}
      <View style={[styles.statsCard, { backgroundColor: colors.statsCardBackground, borderColor: colors.statsCardBorder }]}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {todayStats?.completed_count || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t('timer.today_stats.completed')}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {settings?.daily_goal || 8}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t('timer.today_stats.goal')}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {todayStats?.total_focus_minutes || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t('timer.today_stats.focus_minutes')}
            </Text>
          </View>
        </View>
      </View>

      {/* 倒计时器 */}
      <View style={styles.timerContainer}>
        <CircularTimer
          status={timerStatus}
          remainingSeconds={remainingSeconds}
          totalSeconds={totalSeconds}
        />
      </View>

      {/* 控制按钮 */}
      <View style={styles.controlsContainer}>
        {/* 开始/恢复按钮 - 只在可以开始时显示 */}
        {canStart && (
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handleStart}
          >
            <Ionicons
              name={timerStatus === 'paused' ? 'play' : 'play-circle'}
              size={24}
              color="white"
            />
            <Text style={styles.primaryButtonText}>
              {timerStatus === 'paused' ? t('timer.resume') : t('timer.start')}
            </Text>
          </TouchableOpacity>
        )}

        {/* 暂停按钮 */}
        {canPause && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={handlePause}
          >
            <Ionicons name="pause" size={24} color={colors.text} />
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
              {t('timer.pause')}
            </Text>
          </TouchableOpacity>
        )}

        {/* 跳过按钮 */}
        {canSkip && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.border }]}
            onPress={handleSkip}
          >
            <Ionicons name="play-forward" size={24} color={colors.text} />
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
              {t('timer.skip')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 提示文本 */}
      <View style={styles.hintContainer}>
        {timerStatus === 'idle' && (
          <Text style={[styles.hintText, { color: colors.textTertiary }]}>
            {t('timer.hints.ready', { duration: settings?.work_duration || 25 })}
          </Text>
        )}
        {timerStatus === 'working' && (
          <Text style={[styles.hintText, { color: colors.textTertiary }]}>
            {t('timer.hints.working')}
          </Text>
        )}
        {(timerStatus === 'short_break' || timerStatus === 'long_break') && (
          <Text style={[styles.hintText, { color: colors.textTertiary }]}>
            {t('timer.hints.break')}
          </Text>
        )}
      </View>

      {/* 完成率进度条 */}
      {todayStats && (
        <View style={[styles.progressContainer, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>
              {t('timer.completion.title')}
            </Text>
            <Text style={[styles.progressPercentage, { color: colors.primary }]}>
              {t('timer.completion.percentage', { percent: Math.round(todayStats.completion_rate) })}
            </Text>
          </View>
          <View style={[styles.progressBarBackground, { backgroundColor: colors.progressBackground }]}>
            <View
              style={[
                styles.progressBarFill,
                {
                  backgroundColor: colors.primary,
                  width: `${Math.min(todayStats.completion_rate, 100)}%`,
                },
              ]}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    minWidth: 140,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  hintContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
  },
  hintText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    margin: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
