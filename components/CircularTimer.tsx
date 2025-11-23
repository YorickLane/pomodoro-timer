/**
 * 圆形倒计时器组件
 */

import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useEffect } from 'react';
import { TimerStatus } from '@/types/models';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularTimer({
  status,
  remainingSeconds,
  totalSeconds,
  size = 280,
  strokeWidth = 24,
}: CircularTimerProps) {
  const { colors } = useThemeColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 计算进度（剩余时间的比例）
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;

  // 动画值
  const animatedProgress = useSharedValue(1);

  // 更新进度时触发动画
  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 100,
    });
  }, [progress]);

  // 根据状态显示不同颜色
  const getColor = () => {
    switch (status) {
      case 'working':
        return colors.working;
      case 'short_break':
        return colors.shortBreak;
      case 'long_break':
        return colors.longBreak;
      case 'paused':
        return colors.paused;
      default:
        return colors.idle;
    }
  };

  // 格式化时间显示
  const formatTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 获取状态文本
  const getStatusText = () => {
    switch (status) {
      case 'working':
        return '专注工作中';
      case 'short_break':
        return '短休息';
      case 'long_break':
        return '长休息';
      case 'paused':
        return '已暂停';
      default:
        return '准备开始';
    }
  };

  // 动画进度圆环属性
  const animatedProps = useAnimatedProps(() => {
    const animatedStrokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset: animatedStrokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* 背景圆环 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.progressBackground}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* 进度圆环 - 带动画 */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* 中心文本 */}
      <View style={styles.textContainer}>
        <Text style={[styles.time, { color: getColor() }]}>
          {formatTime()}
        </Text>
        <Text style={[styles.status, { color: colors.textSecondary }]}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  time: {
    fontSize: 56,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  status: {
    fontSize: 18,
    marginTop: 8,
  },
});
