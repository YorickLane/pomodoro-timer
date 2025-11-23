# 代码复用指南 - 从喝水提醒到番茄钟

## 📦 可复用代码清单

### 🟢 直接复制（100% 复用）

#### 1. 存储架构（lib/storage/）
**复制整个目录：**
```bash
cp -r ~/Documents/WordSpace/GitHub/remember-to-drink-water/lib/storage \
      ~/Documents/WordSpace/GitHub/pomodoro-timer/lib/
```

**需要修改的地方：**
- `mobile.ts` - 修改数据库表结构
- `web.ts` - 修改 IndexedDB 存储结构
- 保持接口（IStorageAdapter）不变

#### 2. 主题系统
```bash
# 颜色配置
cp ~/Documents/WordSpace/GitHub/remember-to-drink-water/constants/Colors.ts \
   ~/Documents/WordSpace/GitHub/pomodoro-timer/constants/

# 主题 Hook
cp ~/Documents/WordSpace/GitHub/remember-to-drink-water/hooks/useThemeColors.ts \
   ~/Documents/WordSpace/GitHub/pomodoro-timer/hooks/
```

**可选修改：**
- 调整主题色为番茄红（#FF6347）

#### 3. 配置文件
```bash
# 已复制
✅ .claude/mcp.json
✅ .claude/skills/*
```

---

### 🟡 参考修改（60-80% 复用）

#### 4. 通知系统（lib/notifications.ts）
**复制文件：**
```bash
cp ~/Documents/WordSpace/GitHub/remember-to-drink-water/lib/notifications.ts \
   ~/Documents/WordSpace/GitHub/pomodoro-timer/lib/
```

**需要修改：**
```typescript
// 之前：饮水提醒
title: '该喝水啦 💧'
body: '记得补充水分，保持健康！'

// 现在：番茄钟提醒
title: '番茄钟完成 🍅'
body: '干得好！休息 5 分钟吧'
```

**新增函数：**
```typescript
// 工作结束通知
export async function notifyWorkComplete()

// 休息结束通知
export async function notifyBreakComplete()

// 长休息通知
export async function notifyLongBreakComplete()
```

#### 5. 状态管理（store/）
**参考：** `useWaterStore.ts`

**结构相似：**
- 状态定义
- 数据加载
- CRUD 操作
- 设置管理

**需要新增：**
- 计时器状态（running、paused、idle）
- 当前会话信息
- 番茄钟计数逻辑

#### 6. 设置页面布局
**参考：** `app/(tabs)/explore.tsx`

**可复用：**
- 开关组件
- 计数器组件（+/-）
- 分组布局
- 样式设计

**需要修改：**
- 设置项内容（时长而不是目标水量）

---

### 🔴 需要新开发（0-20% 复用）

#### 7. 计时器核心逻辑（lib/timer.ts）
**全新开发，关键模块！**

```typescript
// 计时器状态机
export class PomodoroTimer {
  private startTime: number;
  private duration: number;
  private state: TimerState;

  start() { }
  pause() { }
  resume() { }
  skip() { }
  reset() { }

  getRemainingTime(): number { }
  getProgress(): number { }
}
```

#### 8. 倒计时器 UI（components/Timer.tsx）
**参考：** `ProgressRing.tsx`

**相似点：**
- 圆形 SVG 组件
- Reanimated 动画
- 中心文字显示

**差异：**
- 进度递减（而不是递增）
- 显示剩余时间（而不是百分比）
- 颜色根据状态变化

#### 9. 统计图表
**新开发：**
- 柱状图（每日完成数）
- 折线图（7日趋势）

**可用库：**
- react-native-gifted-charts（喝水提醒用的）

---

## 🎯 复用策略

### 阶段 1：基础架构（第1天）
**直接复制：**
1. 存储架构 → 修改数据模型
2. 主题系统 → 可选调整颜色
3. 通知系统 → 修改通知内容

**优势：** 快速搭建稳定的基础

### 阶段 2：核心功能（第2-3天）
**新开发：**
1. 计时器逻辑（关键）
2. 倒计时器 UI
3. 状态管理

**参考复用：**
- UI 组件结构
- 动画实现方式
- TypeScript 类型模式

### 阶段 3：完善功能（第4-5天）
**参考修改：**
1. 统计页面
2. 设置页面
3. 深色模式应用

**优势：** 有成熟的模板参考

---

## 📝 数据模型转换

### 喝水提醒 → 番茄钟

```typescript
// 之前：WaterLog
interface WaterLog {
  id: string;
  amount_ml: number;      // 水量
  timestamp: number;
  date_key: string;
}

// 现在：PomodoroSession
interface PomodoroSession {
  id: string;
  type: 'work' | 'break'; // 类型
  duration_minutes: number; // 时长
  start_time: number;
  end_time: number;
  completed: boolean;     // 是否完成
  date_key: string;
}
```

**数据库操作类似：**
- addWaterLog() → addPomodoroSession()
- getLogsByDate() → getSessionsByDate()
- getTodayTotal() → getTodayCompletedCount()

---

## 🎨 UI 组件转换

### 进度环 → 倒计时环

```typescript
// 之前：显示进度增长
<ProgressRing
  current={todayTotal}
  goal={dailyGoal}
/>

// 现在：显示时间递减
<Timer
  remainingSeconds={1500}  // 25分钟 = 1500秒
  totalSeconds={1500}
  status="working"
/>
```

### 快捷按钮 → 快速开始

```typescript
// 之前：快速添加水量
<QuickAddButtons amounts={[200, 300, 500]} />

// 现在：快速开始番茄钟
<QuickStartButtons durations={[25, 45, 90]} />
// 25分钟、45分钟、90分钟
```

---

## 🔧 技术栈对比

| 技术 | 喝水提醒 | 番茄钟 | 复用度 |
|------|----------|--------|--------|
| Expo SDK | 54 | 54 | ✅ 100% |
| React Native | 0.81 | 0.81 | ✅ 100% |
| TypeScript | ✅ | ✅ | ✅ 100% |
| expo-router | ✅ | ✅ | ✅ 100% |
| Zustand | ✅ | ✅ | ✅ 90% |
| SQLite/IndexedDB | ✅ | ✅ | ✅ 95% |
| Notifications | ✅ | ✅ | ✅ 80% |
| Reanimated | ✅ | ✅ | ✅ 90% |
| date-fns | ✅ | ✅ | ✅ 100% |

**依赖包几乎相同，可以直接安装相同版本！**

---

## 📋 开发顺序建议

### 第 1 天：基础搭建
1. 项目初始化（手动）
2. 复制存储架构
3. 复制主题系统
4. 搭建基础页面结构

### 第 2 天：核心逻辑
1. 实现计时器状态机
2. 实现精确计时
3. 实现后台恢复
4. 单元测试

### 第 3 天：主页 UI
1. 倒计时器组件
2. 控制按钮
3. 状态显示
4. 动画效果

### 第 4 天：通知和统计
1. 集成通知系统
2. 实现统计页面
3. 历史记录

### 第 5 天：设置和主题
1. 设置页面
2. 深色模式
3. 触觉反馈

### 第 6 天：测试优化
1. 完整功能测试
2. 性能优化
3. Bug 修复

### 第 7 天：上架准备
1. 生成图标
2. 准备截图
3. 填写商店描述
4. 提交构建

---

## ⚡ 快速复用命令

```bash
# 1. 复制存储架构
cp -r ../remember-to-drink-water/lib/storage lib/

# 2. 复制主题系统
cp -r ../remember-to-drink-water/constants/Colors.ts constants/
cp -r ../remember-to-drink-water/hooks/useThemeColors.ts hooks/

# 3. 复制类型定义（参考）
cp ../remember-to-drink-water/types/models.ts types/models.ts.example

# 4. 安装相同的依赖
npx expo install expo-sqlite expo-notifications zustand date-fns \
  @react-native-async-storage/async-storage \
  react-native-gifted-charts \
  @react-native-community/datetimepicker
```

---

## 💡 关键差异点

### 核心逻辑
- **喝水提醒**：简单的记录和累加
- **番茄钟**：复杂的状态机和精确计时 ⚠️ 重点

### UI 重点
- **喝水提醒**：进度增长
- **番茄钟**：时间递减，状态切换 ⚠️ 重点

### 通知
- **喝水提醒**：定时提醒（每 N 分钟）
- **番茄钟**：事件触发（工作/休息结束）⚠️ 不同

---

**复用现有架构，专注核心差异，快速高质量完成！** 🚀
