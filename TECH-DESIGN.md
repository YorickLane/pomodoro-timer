# TECH-DESIGN - 番茄钟技术方案

## 1. 技术栈

### 核心框架
- **Expo SDK 54** + React Native + TypeScript
- **expo-router** - 文件系统路由
- **Zustand** - 状态管理
- **expo-sqlite** (移动端) / IndexedDB (Web) - 本地存储
- **expo-notifications** - 通知提醒
- **React Native Reanimated** - 动画效果
- **date-fns** - 日期处理
- **EAS Build** - 构建和发布

### 与喝水提醒的技术栈一致
- 可以直接复用存储架构
- 可以直接复用通知系统
- 可以直接复用主题系统

---

## 2. 项目结构

```
/app
  /(tabs)
    index.tsx          # 计时器主页
    stats.tsx          # 统计页面
    settings.tsx       # 设置页面
  /privacy.tsx         # 隐私政策
  /_layout.tsx         # 根布局

/components
  Timer.tsx            # 倒计时器组件
  CircularProgress.tsx # 圆形进度条
  SessionList.tsx      # 番茄钟记录列表
  QuickStartButton.tsx # 快速开始按钮

/lib
  /storage             # 存储层（复用喝水提醒架构）
    types.ts           # 接口定义
    mobile.ts          # SQLite 实现
    web.ts             # IndexedDB 实现
    index.ts           # 平台选择
  db.ts                # 数据库接口
  notifications.ts     # 通知管理
  timer.ts             # 计时器逻辑（核心）

/store
  usePomodoroStore.ts  # 全局状态

/types
  models.ts            # 数据模型

/constants
  Colors.ts            # 主题颜色（复用）

/hooks
  useThemeColors.ts    # 主题 hook（复用）
  useTimer.ts          # 计时器 hook
```

---

## 3. 数据设计

### 3.1 pomodoro_sessions 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT | UUID |
| type | TEXT | work / short_break / long_break |
| duration_minutes | INTEGER | 实际时长 |
| planned_duration | INTEGER | 计划时长 |
| start_time | INTEGER | 开始时间戳 |
| end_time | INTEGER | 结束时间戳 |
| completed | INTEGER | 0=未完成, 1=完成 |
| date_key | TEXT | YYYY-MM-DD |
| label | TEXT | 可选标签 |

**索引：** date_key, type

### 3.2 settings 表

| key | value |
|-----|-------|
| work_duration | 25 |
| short_break_duration | 5 |
| long_break_duration | 15 |
| daily_goal | 8 |
| notification_enabled | true |
| sound_enabled | true |
| auto_start_break | false |
| auto_start_work | false |

---

## 4. 核心逻辑：计时器

### 4.1 状态机

```
[空闲]
  ↓ 开始
[工作中] (25分钟)
  ↓ 完成
[短休息] (5分钟)
  ↓ 完成 (< 4个番茄钟)
[工作中]
  ↓ 完成 (= 4个番茄钟)
[长休息] (15分钟)
  ↓ 完成
[空闲] (循环开始)
```

**状态：**
- `idle` - 空闲
- `working` - 工作中
- `short_break` - 短休息
- `long_break` - 长休息
- `paused` - 暂停

### 4.2 计时实现

**方案：使用 timestamp 而不是 interval**

```typescript
// ❌ 不好：累加误差大
let seconds = 0;
setInterval(() => seconds++, 1000);

// ✅ 好：基于时间戳，精确
const startTime = Date.now();
setInterval(() => {
  const elapsed = Date.now() - startTime;
  const remaining = totalDuration - elapsed;
}, 100); // 100ms 更新一次，流畅
```

### 4.3 后台处理

**App 切到后台：**
- 保存当前状态（开始时间、总时长）
- 继续计时（不暂停）

**App 回到前台：**
- 读取保存的状态
- 计算已过时间
- 更新 UI
- 如果时间已到，触发完成逻辑

---

## 5. 通知策略

### 5.1 通知类型

**工作结束：**
- 标题："番茄钟完成 🍅"
- 内容："干得好！休息 5 分钟吧"
- 声音：✅

**短休息结束：**
- 标题："休息结束 ⏰"
- 内容："准备好继续工作了吗？"
- 声音：✅

**长休息结束：**
- 标题："长休息结束 🎉"
- 内容："完成了 4 个番茄钟！继续加油"
- 声音：✅

### 5.2 通知时机

**定时通知：**
- 在计时器即将结束时（倒数 3 秒）预调度
- 精确在结束时触发

**后台通知：**
- App 在后台时计时器到期
- 发送本地通知
- 点击通知打开 App

---

## 6. UI 设计要点

### 6.1 计时器页面（主页）

**布局：**
```
┌─────────────────┐
│   今日: 3/8 🍅   │  ← 顶部状态
├─────────────────┤
│                 │
│   ┌─────────┐   │
│   │         │   │
│   │  24:59  │   │  ← 大圆形计时器
│   │  工作中  │   │
│   └─────────┘   │
│                 │
├─────────────────┤
│  [开始] [暂停]  │  ← 操作按钮
│  [跳过] [重置]  │
└─────────────────┘
```

**颜色方案：**
- 工作中：红色系（🍅 番茄色）
- 短休息：绿色系（🌿 放松色）
- 长休息：蓝色系（🌊 休息色）
- 暂停：灰色系

### 6.2 圆形进度条

**设计：**
- 外圈：进度环（递减）
- 中心：剩余时间（大字）
- 下方：当前状态文字

**动画：**
- 平滑递减（每 100ms 更新）
- 状态切换时颜色渐变
- 完成时缩放动画

---

## 7. 统计计算

### 今日统计
```typescript
// 今日完成的番茄钟数
SELECT COUNT(*) FROM pomodoro_sessions
WHERE date_key = today AND type = 'work' AND completed = 1

// 今日总专注时长
SELECT SUM(duration_minutes) FROM pomodoro_sessions
WHERE date_key = today AND type = 'work' AND completed = 1

// 完成率
completed / daily_goal * 100
```

### 7日趋势
```typescript
SELECT date_key, COUNT(*) as count
FROM pomodoro_sessions
WHERE date_key >= date_7_days_ago
  AND type = 'work'
  AND completed = 1
GROUP BY date_key
```

---

## 8. 可复用的代码（从喝水提醒）

### 直接复用（几乎不改）
- ✅ `lib/storage/` - 整个存储架构
- ✅ `constants/Colors.ts` - 主题颜色系统
- ✅ `hooks/useThemeColors.ts` - 主题 hook
- ✅ `lib/notifications.ts` - 通知基础（改提醒内容）
- ✅ `.claude/` - 所有 skills 和 MCP 配置

### 参考修改
- `components/ProgressRing.tsx` → `CircularProgress.tsx`（改为倒计时）
- `store/useWaterStore.ts` → `usePomodoroStore.ts`（改状态管理）
- 设置页面布局（改设置项）

### 需要新开发
- `lib/timer.ts` - 计时器核心逻辑
- `components/Timer.tsx` - 倒计时器组件
- `hooks/useTimer.ts` - 计时器 hook
- 统计图表组件

**预计代码复用率：60-70%**

---

## 9. 性能优化

### 计时器性能
- 使用 requestAnimationFrame（更流畅）
- 避免频繁的 state 更新
- 使用 Reanimated 驱动动画（原生线程）

### 存储优化
- 批量插入记录
- 索引优化
- 定期清理旧数据（可选）

---

## 10. 测试策略

### 功能测试
- 计时精确性（长时间测试）
- 后台恢复正确性
- 通知触发准时性
- 状态切换正确性

### 边界测试
- App 被杀死后恢复
- 系统时间修改
- 权限拒绝处理
- 低电量模式

---

## 11. 与喝水提醒的对比

| 方面 | 喝水提醒 | 番茄钟 | 复用性 |
|------|----------|--------|--------|
| 数据存储 | ✅ | ✅ | 100% |
| 通知系统 | ✅ | ✅ | 90% |
| 主题系统 | ✅ | ✅ | 100% |
| 设置页面 | ✅ | ✅ | 80% |
| 核心逻辑 | 记录 | **计时** | 0% |
| 主 UI | 进度环 | **倒计时** | 60% |
| 统计功能 | 简单 | **复杂** | 40% |

**核心差异：** 计时器逻辑和倒计时 UI

---

## 12. 开发时间估算

基于喝水提醒的开发经验：

| 任务 | 时间 | 说明 |
|------|------|------|
| 项目初始化 | 0.5天 | 复用配置 |
| 数据层 | 0.5天 | 复用架构，改模型 |
| 计时器核心 | 1天 | 新开发（关键） |
| 主页 UI | 1天 | 倒计时器 + 按钮 |
| 统计页面 | 0.5天 | 简单统计 |
| 设置页面 | 0.5天 | 复用布局 |
| 通知集成 | 0.5天 | 复用系统 |
| 深色模式 | 0.5天 | 复用主题 |
| 测试优化 | 1天 | 计时精确性 |
| 上架准备 | 0.5天 | 复用流程 |

**总计：约 5-7 天**（vs 喝水提醒的 2 周）

---

**复用现有架构，快速完成高质量应用！** 🚀
