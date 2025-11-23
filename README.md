# 🍅 Pomodoro Timer

[中文文档](./README.zh.md) | English

A clean, focused, and efficient Pomodoro Technique timer app to help boost your productivity and concentration.

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
- ✅ Cross-platform data persistence (SQLite + IndexedDB)
- ✅ Three complete pages (timer, stats, settings)
- ✅ Local notification system
- ✅ Auto control features (auto-start break/work)
- ✅ Dark mode support
- ✅ Full internationalization (EN + ZH)
- ✅ All core bugs fixed

**Testing Status:**
- ✅ TypeScript compiles successfully
- ✅ Real device tested (iOS + Android)
- ✅ Core functionality verified
- ✅ i18n tested (EN + ZH)

## 📋 Documentation

### Product & Design
- [PRD.md](./PRD.md) - Product Requirements Document (Chinese)
- [TECH-DESIGN.md](./TECH-DESIGN.md) - Technical Architecture (Chinese)

### Development Guides
- [DEV-CHECKLIST.md](./DEV-CHECKLIST.md) - Development Checklist (Chinese)
- [CODE-REUSE-GUIDE.md](./CODE-REUSE-GUIDE.md) - Code Reuse Guide (Chinese)
- [TESTING-GUIDE.md](./TESTING-GUIDE.md) - Testing Guide (Chinese)
- [BUILD-AND-RELEASE.md](./BUILD-AND-RELEASE.md) - **Build & Release Guide (EN + ZH)** 🚀

### Project Records
- [CHANGELOG.md](./CHANGELOG.md) - Changelog (Chinese)
- [MANUAL-STEPS.md](./MANUAL-STEPS.md) - Manual Setup Steps (Chinese)

### Configuration
- `.claude/mcp.json` - MCP Server Configuration (Context7)
- `.claude/skills/` - Development Assistant Skills

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the App
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run in browser
npx expo start --web
```

### Testing
See [TESTING-GUIDE.md](./TESTING-GUIDE.md) for detailed testing scenarios.

Quick test:
```bash
# Type checking
npx tsc --noEmit

# Run the app
npx expo start
```

## 🛠️ Tech Stack

- **Framework:** Expo SDK 54 + React Native 0.81
- **Language:** TypeScript (100% type-safe)
- **State Management:** Zustand
- **Database:** SQLite (mobile) / IndexedDB (web)
- **Animations:** React Native Reanimated
- **i18n:** i18next + react-i18next + expo-localization
- **Date Utils:** date-fns

## 📊 Project Architecture

```
app/
  (tabs)/
    index.tsx      # Timer page
    stats.tsx      # Statistics page
    settings.tsx   # Settings page
  _layout.tsx      # Root layout

components/
  CircularTimer.tsx  # Circular countdown timer

lib/
  storage/         # Cross-platform storage layer
    types.ts       # Interface definitions
    mobile.ts      # SQLite implementation
    web.ts         # IndexedDB implementation
    index.ts       # Platform selector
  db.ts            # Database initialization
  notifications.ts # Notification management
  timer.ts         # Timer core logic

store/
  usePomodoroStore.ts  # Global state (Zustand)

types/
  models.ts        # Data models

locales/
  en/              # English translations
  zh/              # Chinese translations
  index.ts         # i18n configuration

constants/
  Colors.ts        # Theme colors

hooks/
  useThemeColors.ts  # Theme hook
```

## 🧪 Testing

See [TESTING-GUIDE.md](./TESTING-GUIDE.md) for comprehensive testing guide.

### Quick Test
1. Shorten durations in Settings (e.g., 1 minute work)
2. Enable auto-start features
3. Complete 4 pomodoros to verify the cycle:
   - Pomodoros 1-3: Short breaks
   - Pomodoro 4: Long break
   - Pomodoro 5: Short break (cycle restarts)

## 📦 Build & Deploy

```bash
# Build for iOS and Android
eas build --platform all

# Submit to stores
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
- ⚠️ **Expo Go**: Remote push not supported (local notifications work fine)
- ⚠️ **Web**: Browser notifications require user permission

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
- Easy to add more languages

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

**Simple, Focused, Efficient - The Pomodoro Way!** 🍅
