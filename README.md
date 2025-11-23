# 🍅 番茄钟 - Pomodoro Timer

简洁、专注、高效。一款优雅的番茄工作法计时器，帮助你提升专注力和工作效率。

## ✨ Core Features

- ⏱️ **Classic Pomodoro** - 25min work + 5min short break + 15min long break
- 📊 **Real-time Stats** - Completed count, focus time, completion rate
- 🔔 **Smart Notifications** - Alerts when work/break ends
- ⚙️ **Flexible Settings** - Customize duration, goals, auto control
- 🌙 **Dark Mode** - Full light/dark theme support
- 🔒 **Privacy First** - All data stored locally, works offline
- ⏸️ **Full Control** - Pause, resume, skip features
- 📝 **Session Management** - View and manage all sessions
- 🌍 **Internationalization** - English (default) + Chinese support

## 🎯 Project Status

**Current Version:** v1.1.0 - MVP Complete + i18n ✅

**Completed Features:**
- ✅ Accurate timer (< 1s error)
- ✅ State machine (idle → work → break → loop)
- ✅ Cross-platform data persistence
- ✅ Three complete pages (timer, stats, settings)
- ✅ Notification system (local notifications)
- ✅ Auto control features
- ✅ Dark mode support
- ✅ Full internationalization (EN + ZH)
- ✅ All core bugs fixed

**Testing Status:**
- ✅ TypeScript compiles successfully
- ✅ Real device tested
- ✅ Core functionality verified
- ✅ i18n tested (EN + ZH)

## 📋 文档索引

### 产品和设计
- [PRD.md](./PRD.md) - 产品需求文档
- [TECH-DESIGN.md](./TECH-DESIGN.md) - 技术架构设计

### 开发指南
- [DEV-CHECKLIST.md](./DEV-CHECKLIST.md) - 开发执行清单
- [CODE-REUSE-GUIDE.md](./CODE-REUSE-GUIDE.md) - 代码复用指南
- [TESTING-GUIDE.md](./TESTING-GUIDE.md) - 测试指南

### 项目记录
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志
- [MANUAL-STEPS.md](./MANUAL-STEPS.md) - 手动操作步骤

### 配置文件
- `.claude/mcp.json` - MCP 服务器配置（Context7）
- `.claude/skills/` - 开发辅助 Skills

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 运行应用
```bash
# 启动开发服务器
npx expo start

# 在 iOS 模拟器运行
npx expo start --ios

# 在 Android 模拟器运行
npx expo start --android

# 在浏览器运行
npx expo start --web
```

### 测试建议
详见 [TESTING-GUIDE.md](./TESTING-GUIDE.md)

## 🛠️ 技术栈

- Expo SDK 54
- React Native 0.81
- TypeScript（100% 类型安全）
- Zustand（状态管理）
- SQLite/IndexedDB（本地存储）
- Reanimated（动画）

## 📊 项目架构

```
app/
  (tabs)/
    index.tsx      # 计时器主页
    stats.tsx      # 统计页面
    settings.tsx   # 设置页面
  _layout.tsx      # 根布局

components/
  CircularTimer.tsx  # 圆形倒计时器组件

lib/
  storage/         # 跨平台存储层
    types.ts       # 接口定义
    mobile.ts      # SQLite 实现
    web.ts         # IndexedDB 实现
    index.ts       # 平台选择器
  db.ts            # 数据库初始化
  notifications.ts # 通知管理
  timer.ts         # 计时器核心逻辑

store/
  usePomodoroStore.ts  # 全局状态管理（Zustand）

types/
  models.ts        # 数据模型定义

constants/
  Colors.ts        # 主题颜色配置

hooks/
  useThemeColors.ts  # 主题 Hook
```

## 🧪 测试

详见 [TESTING-GUIDE.md](./TESTING-GUIDE.md)

### 快速测试
```bash
# 编译检查
npx tsc --noEmit

# 运行应用
npx expo start
```

## 📦 构建和发布

```bash
# 构建 iOS 和 Android
eas build --platform all

# 提交到商店
eas submit
```

## 🐛 Known Issues & Notes

### About Expo Go Notifications ERROR

You may see this ERROR in Expo Go:
```
ERROR expo-notifications: Android Push notifications (remote notifications)
functionality provided by expo-notifications was removed from Expo Go
```

**This can be safely ignored because:**
- ✅ We only use **local notifications**, not remote push
- ✅ Local notifications work perfectly in Expo Go
- ✅ This is an Expo Go limitation, not a code issue
- ✅ When you build with `eas build`, there will be no such error

### Platform Limitations
- ⚠️ **Expo Go**: Remote push notifications not supported (we only use local notifications, so this is fine)
- ⚠️ **Web**: Browser notifications require user permission and have limited functionality

### Recommendation for Production
Use `eas build` instead of Expo Go for production builds:
```bash
eas build --platform all
```

## 🌍 Internationalization

**Supported Languages:**
- 🇺🇸 **English (en)** - Default, fallback language
- 🇨🇳 **简体中文 (zh)** - Simplified Chinese

**Features:**
- Auto-detect system language
- Manual language switching in Settings
- All UI text, notifications, and messages are translated
- Easy to add more languages (just copy and translate language files)

**Adding New Languages:**
See `.claude/skills/i18n.md` for detailed guide.

## 🔮 Future Plans (V1.2+)

- 📈 7-day/30-day statistics charts
- 🏷️ Task labels (study, work, reading, etc.)
- 🎵 White noise / focus music
- 📅 Historical calendar view
- 🏆 Achievement badge system
- 📤 Data export/import
- 🌏 More languages (Japanese, Korean, Spanish, etc.)

## 📝 License

MIT

---

**简洁、专注、高效 - 番茄工作法！** 🍅
