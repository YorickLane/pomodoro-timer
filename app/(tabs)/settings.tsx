import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import { usePomodoroStore } from '@/store/usePomodoroStore';
import {
  requestNotificationPermissions,
  sendTestNotification,
} from '@/lib/notifications';

export default function SettingsScreen() {
  const { colors } = useThemeColors();
  const { settings, updateSetting, initialize } = usePomodoroStore();

  useEffect(() => {
    initialize();
  }, []);

  // 测试通知
  const handleTestNotification = async () => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      Alert.alert('提示', '请先开启通知权限');
      return;
    }

    await sendTestNotification();
    Alert.alert('成功', '测试通知已发送！');
  };

  // 调整时长
  const adjustDuration = (key: 'work_duration' | 'short_break_duration' | 'long_break_duration', delta: number) => {
    if (!settings) return;
    const currentValue = settings[key];
    const newValue = Math.max(1, Math.min(120, currentValue + delta)); // 限制在 1-120 分钟
    updateSetting(key, newValue);
  };

  // 调整每日目标
  const adjustDailyGoal = (delta: number) => {
    if (!settings) return;
    const newValue = Math.max(1, Math.min(20, settings.daily_goal + delta)); // 限制在 1-20
    updateSetting('daily_goal', newValue);
  };

  if (!settings) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          加载中...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 时长设置 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          时长设置
        </Text>

        {/* 工作时长 */}
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="timer" size={24} color={colors.working} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                工作时长
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                每个番茄钟的专注时间
              </Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('work_duration', -5)}
            >
              <Ionicons name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.counterValue, { color: colors.text }]}>
              {settings.work_duration} 分钟
            </Text>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('work_duration', 5)}
            >
              <Ionicons name="add" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 短休息时长 */}
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="cafe" size={24} color={colors.shortBreak} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                短休息时长
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                每个番茄钟后的休息时间
              </Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('short_break_duration', -1)}
            >
              <Ionicons name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.counterValue, { color: colors.text }]}>
              {settings.short_break_duration} 分钟
            </Text>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('short_break_duration', 1)}
            >
              <Ionicons name="add" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 长休息时长 */}
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="bed" size={24} color={colors.longBreak} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                长休息时长
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                完成 4 个番茄钟后的休息时间
              </Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('long_break_duration', -5)}
            >
              <Ionicons name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.counterValue, { color: colors.text }]}>
              {settings.long_break_duration} 分钟
            </Text>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDuration('long_break_duration', 5)}
            >
              <Ionicons name="add" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 目标设置 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          目标设置
        </Text>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="flag" size={24} color={colors.primary} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                每日目标
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                每天完成的番茄钟数量
              </Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDailyGoal(-1)}
            >
              <Ionicons name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.counterValue, { color: colors.text }]}>
              {settings.daily_goal} 个
            </Text>
            <TouchableOpacity
              style={[styles.counterButton, { borderColor: colors.border }]}
              onPress={() => adjustDailyGoal(1)}
            >
              <Ionicons name="add" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 通知设置 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          通知设置
        </Text>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                启用通知
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                在工作/休息结束时提醒
              </Text>
            </View>
          </View>
          <Switch
            value={settings.notification_enabled}
            onValueChange={(value) => updateSetting('notification_enabled', value)}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={colors.switchThumb}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="volume-high" size={24} color={colors.warning} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                启用声音
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                通知时播放提示音
              </Text>
            </View>
          </View>
          <Switch
            value={settings.sound_enabled}
            onValueChange={(value) => updateSetting('sound_enabled', value)}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={colors.switchThumb}
          />
        </View>

        <TouchableOpacity
          style={[styles.testButton, { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder }]}
          onPress={handleTestNotification}
        >
          <Ionicons name="mail" size={20} color={colors.buttonText} />
          <Text style={[styles.testButtonText, { color: colors.buttonText }]}>
            发送测试通知
          </Text>
        </TouchableOpacity>
      </View>

      {/* 自动控制 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          自动控制
        </Text>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="play-circle" size={24} color={colors.success} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                自动开始休息
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                工作结束后自动开始休息
              </Text>
            </View>
          </View>
          <Switch
            value={settings.auto_start_break}
            onValueChange={(value) => updateSetting('auto_start_break', value)}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={colors.switchThumb}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="timer" size={24} color={colors.working} />
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                自动开始工作
              </Text>
              <Text style={[styles.settingHint, { color: colors.textSecondary }]}>
                休息结束后自动开始工作
              </Text>
            </View>
          </View>
          <Switch
            value={settings.auto_start_work}
            onValueChange={(value) => updateSetting('auto_start_work', value)}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={colors.switchThumb}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingHint: {
    fontSize: 13,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 15,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  testButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
