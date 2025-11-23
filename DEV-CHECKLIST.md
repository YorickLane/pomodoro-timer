# DEV-CHECKLIST - 开发执行清单

## A. 项目初始化（手动 ⚠️）

### 你需要手动执行：
```bash
# 1. 在 GitHub 创建新仓库
# 仓库名：pomodoro-timer
# 描述：A simple and elegant Pomodoro Timer app

# 2. 初始化 Expo 项目
cd ~/Documents/WordSpace/GitHub/pomodoro-timer
npx create-expo-app@latest . --template blank-typescript

# 3. 关联 Git 仓库
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[你的用户名]/pomodoro-timer.git
git push -u origin main

# 4. 配置 EAS Build
eas login
eas build:configure
```

---

## B. 复制可复用代码（参考喝水提醒）

### 从喝水提醒项目复制：

```bash
# 已复制的配置文件
✅ .claude/mcp.json
✅ .claude/skills/*

# 需要手动复制的代码（参考，不是直接复制）
□ lib/storage/ 目录（完整复制）
□ constants/Colors.ts（完整复制）
□ hooks/useThemeColors.ts（完整复制）
□ lib/notifications.ts（参考修改）
```

---

## C. 核心功能开发

### C1. 数据层
- [ ] 创建 `types/models.ts`（番茄钟数据模型）
- [ ] 复制 `lib/storage/` 目录
- [ ] 修改数据库表结构（pomodoro_sessions）
- [ ] 测试数据存储

### C2. 计时器核心逻辑
- [ ] 创建 `lib/timer.ts`（计时器状态机）
- [ ] 实现精确计时（基于 timestamp）
- [ ] 实现后台恢复逻辑
- [ ] 创建 `hooks/useTimer.ts`

### C3. 状态管理
- [ ] 创建 `store/usePomodoroStore.ts`
- [ ] 集成计时器逻辑
- [ ] 集成数据存储
- [ ] 集成通知系统

---

## D. UI 开发

### D1. 主页面（计时器）
- [ ] 创建 `components/CircularProgress.tsx`（圆形倒计时）
- [ ] 创建 `components/Timer.tsx`（计时器组件）
- [ ] 创建 `app/(tabs)/index.tsx`（主页）
- [ ] 实现开始/暂停/跳过/重置按钮
- [ ] 显示今日完成数量

### D2. 统计页面
- [ ] 创建 `app/(tabs)/stats.tsx`
- [ ] 显示今日统计（完成数、总时长）
- [ ] 显示本周趋势（可选）
- [ ] 历史记录列表

### D3. 设置页面
- [ ] 创建 `app/(tabs)/settings.tsx`
- [ ] 时长设置（工作/短休息/长休息）
- [ ] 每日目标设置
- [ ] 通知开关
- [ ] 自动开始选项
- [ ] 关于和隐私政策

---

## E. 通知系统

- [ ] 复制 `lib/notifications.ts`
- [ ] 修改通知内容（番茄钟相关）
- [ ] 实现计时器结束时的通知
- [ ] 测试后台通知
- [ ] 测试通知点击跳转

---

## F. 主题和样式

- [ ] 复制 `constants/Colors.ts`
- [ ] 调整颜色方案（番茄红为主题色）
- [ ] 复制 `hooks/useThemeColors.ts`
- [ ] 应用深色模式到所有页面
- [ ] 添加动画效果（Reanimated）

---

## G. 测试和优化

### 功能测试
- [ ] 计时精确性测试（长时间运行）
- [ ] 后台恢复测试
- [ ] 通知准时性测试
- [ ] 数据持久化测试
- [ ] 深色模式测试

### 性能测试
- [ ] 启动时间 < 1.5s
- [ ] 动画流畅（60fps）
- [ ] 内存占用正常
- [ ] 电量消耗测试

### 跨平台测试
- [ ] iOS 真机测试
- [ ] Android 真机测试
- [ ] Web 版本测试（可选）

---

## H. 打包上架

- [ ] 运行 `/skill pre-release-check`
- [ ] 生成 App 图标（修改 generate-icons.js）
- [ ] 准备商店描述
- [ ] 准备应用截图
- [ ] 配置 Hermes 引擎
- [ ] `eas build --profile production`
- [ ] 提交到商店

---

## 开发里程碑

### Sprint 1（第 1-2 天）
- ✅ 项目初始化
- ✅ 数据层完成
- ✅ 计时器核心逻辑完成

### Sprint 2（第 3-4 天）
- ✅ 主页 UI 完成
- ✅ 基础功能可用（开始/暂停/跳过）
- ✅ 通知系统集成

### Sprint 3（第 5-6 天）
- ✅ 统计页面完成
- ✅ 设置页面完成
- ✅ 深色模式完成
- ✅ 动画优化

### Sprint 4（第 7 天）
- ✅ 测试和优化
- ✅ 上架准备
- ✅ 提交商店

---

**预计 5-7 天完成高质量番茄钟应用！** 🍅
