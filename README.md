# 🍅 番茄钟 - Pomodoro Timer

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

## 🎯 项目状态

**当前版本：** v1.0.1 - MVP 完成 ✅

**已完成功能：**
- ✅ 精确计时器（误差 < 1 秒）
- ✅ 状态机（空闲 → 工作 → 休息 → 循环）
- ✅ 数据持久化（跨平台存储）
- ✅ 三个完整页面（计时器、统计、设置）
- ✅ 通知系统
- ✅ 自动控制功能
- ✅ 深色模式
- ✅ 所有核心逻辑 bug 已修复

**测试状态：**
- ✅ TypeScript 编译通过
- ✅ 真机测试通过
- ✅ 核心功能验证完成

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

## 🐛 已知问题

- ⚠️ Expo Go 中通知功能受限，建议使用 development build
- ⚠️ Web 平台通知功能暂未实现

## 🔮 未来计划（V1.1+）

- 📈 7日/30日统计图表
- 🏷️ 任务标签（学习、工作、阅读等）
- 🎵 白噪音/专注音乐
- 📅 历史日历查看
- 🏆 成就徽章系统
- 📤 数据导出/导入

## 📝 License

MIT

---

**简洁、专注、高效 - 番茄工作法！** 🍅
