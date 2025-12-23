import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function PrivacyPolicyScreen() {
  const { t, i18n } = useTranslation();
  const { colors } = useThemeColors();

  const isEnglish = i18n.language === 'en';

  return (
    <>
      <Stack.Screen
        options={{
          title: t('settings.about.privacy_policy.label'),
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {isEnglish ? 'Privacy Policy' : '隐私政策'}
          </Text>
          <Text style={[styles.updateDate, { color: colors.textSecondary }]}>
            {isEnglish ? 'Last Updated: December 2025' : '最后更新：2025年12月'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? 'Introduction' : '简介'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? 'This Privacy Policy explains how Zenmodoro ("we", "our", or "the app") handles your information.'
              : '本隐私政策说明 Zenmodoro（"我们"或"本应用"）如何处理您的信息。'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? 'Data Collection' : '数据收集'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? 'We do not collect any personal information.\n\nZenmodoro is designed with privacy in mind. All data, including your timer settings, session history, and statistics, is stored locally on your device only.'
              : '我们不收集任何个人信息。\n\nZenmodoro 在设计时充分考虑了隐私保护。所有数据，包括您的计时器设置、会话历史和统计数据，都仅存储在您的设备本地。'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? 'Data Storage' : '数据存储'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? '• All app data is stored locally on your device\n• No data is transmitted to external servers\n• No cloud sync or backup services are used\n• Uninstalling the app will permanently delete all data'
              : '• 所有应用数据都存储在您设备本地\n• 不会向外部服务器传输任何数据\n• 不使用云同步或备份服务\n• 卸载应用将永久删除所有数据'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? 'Third-Party Services' : '第三方服务'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? 'This app does not use any third-party analytics, advertising, or tracking services.'
              : '本应用不使用任何第三方分析、广告或跟踪服务。'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? 'Permissions' : '权限'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? 'The app may request the following permissions:\n• Notifications: To alert you when a timer session ends (optional, can be disabled)'
              : '应用可能会请求以下权限：\n• 通知：在计时器结束时提醒您（可选，可禁用）'}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isEnglish ? "Children's Privacy" : '儿童隐私'}
          </Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            {isEnglish
              ? 'This app does not knowingly collect any information from children under the age of 13.'
              : '本应用不会故意收集 13 岁以下儿童的任何信息。'}
          </Text>

          <View style={styles.summary}>
            <Text style={[styles.summaryText, { color: colors.primary }]}>
              {isEnglish
                ? 'Summary: Your data stays on your device. We don\'t collect, store, or share any personal information.'
                : '总结：您的数据留在您的设备上。我们不收集、存储或分享任何个人信息。'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  updateDate: {
    fontSize: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  summary: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
});
