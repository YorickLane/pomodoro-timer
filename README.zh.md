# 🍅 番茄钟 - Pomodoro Timer

中文文档 | [English](./README.md)

简洁、专注、高效。一款优雅的番茄工作法计时器，帮助你提升专注力和工作效率。

## ✨ 核心特性

- ⏱️ **经典番茄钟** - 25分钟工作 + 5分钟短休息 + 15分钟长休息
- 📊 **实时统计** - 今日完成数、专注时长、完成率
- 🔔 **智能提醒** - 工作和休息结束时的通知提醒
- ⚙️ **灵活设置** - 自定义时长、目标、自动控制
- 🌙 **深色模式** - 完整的明暗主题支持
- 🔒 **隐私安全** - 数据完全本地存储，离线可用
- ⏸️ **完整控制** - 暂停、恢复、跳过功能
- 📝 **记录管理** - 查看和管理所有会话记录
- 🌍 **国际化** - 支持英文（默认）和中文

## 🎯 项目状态

**当前版本：** v1.1.0 - MVP 完成 + 国际化 ✅

**已完成功能：**
- ✅ 精确计时器（误差 < 1 秒）
- ✅ 状态机（空闲 → 工作 → 休息 → 循环）
- ✅ 跨平台数据持久化（SQLite + IndexedDB）
- ✅ 三个完整页面（计时器、统计、设置）
- ✅ 本地通知系统
- ✅ 自动控制功能（自动开始休息/工作）
- ✅ 深色模式支持
- ✅ 完整国际化（英文 + 中文）
- ✅ 所有核心 bug 已修复

**测试状态：**
- ✅ TypeScript 编译通过
- ✅ 真机测试通过（iOS + Android）
- ✅ 核心功能验证完成
- ✅ 国际化测试完成（英文 + 中文）

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

快速测试：
```bash
# 类型检查
npx tsc --noEmit

# 运行应用
npx expo start
```

## 🛠️ 技术栈

- **框架：** Expo SDK 54 + React Native 0.81
- **语言：** TypeScript（100% 类型安全）
- **状态管理：** Zustand
- **数据库：** SQLite（移动端）/ IndexedDB（Web端）
- **动画：** React Native Reanimated
- **国际化：** i18next + react-i18next + expo-localization
- **日期工具：** date-fns

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

locales/
  en/              # 英文翻译
  zh/              # 中文翻译
  index.ts         # i18n 配置

constants/
  Colors.ts        # 主题颜色配置

hooks/
  useThemeColors.ts  # 主题 Hook
```

## 🧪 测试

详见 [TESTING-GUIDE.md](./TESTING-GUIDE.md)

### 快速测试流程
1. 在设置中调短时长（如工作 1 分钟）
2. 开启自动控制功能
3. 完成 4 个番茄钟验证循环：
   - 第 1-3 个：短休息
   - 第 4 个：长休息
   - 第 5 个：短休息（循环重新开始）

## 📦 构建和发布

```bash
# 构建 iOS 和 Android 版本
eas build --platform all

# 提交到应用商店
eas submit
```

## 🐛 已知问题和说明

### 关于 Expo Go 的通知 ERROR

在 Expo Go 中可能会看到这个 ERROR：
```
ERROR expo-notifications: Android Push notifications (remote notifications)
functionality provided by expo-notifications was removed from Expo Go
```

**可以安全忽略，因为：**
- ✅ 我们只使用**本地通知**，不使用远程推送
- ✅ 本地通知在 Expo Go 中完全正常工作
- ✅ 这是 Expo Go 的限制，不是代码问题
- ✅ 使用 `eas build` 构建时不会有此错误

### 平台限制
- ⚠️ **Expo Go**：不支持远程推送（我们只用本地通知，所以没问题）
- ⚠️ **Web**：浏览器通知需要用户授权，功能有限

### 生产环境建议
正式发布时使用 `eas build` 而不是 Expo Go：
```bash
eas build --platform all
```

## 🌍 国际化

**支持语言：**
- 🇺🇸 **English (en)** - 默认语言，回退语言
- 🇨🇳 **简体中文 (zh)** - 简体中文

**功能特性：**
- 自动检测系统语言
- 在设置中手动切换语言
- 所有 UI 文本、通知和消息都已翻译
- 易于添加新语言

**添加新语言：**
详见 `.claude/skills/i18n.md` 获取详细指南。

## 🔮 未来计划 (V1.2+)

- 📈 7天/30天统计图表
- 🏷️ 任务标签（学习、工作、阅读等）
- 🎵 白噪音/专注音乐
- 📅 历史日历查看
- 🏆 成就徽章系统
- 📤 数据导出/导入
- 🌏 更多语言支持（日语、韩语、西班牙语等）

## 📝 开源协议

MIT

---

**简洁、专注、高效 - 番茄工作法！** 🍅
