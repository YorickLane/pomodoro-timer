# 项目开发注意事项

## Expo Router 常见问题

### 1. 返回按钮显示路由名称而非友好文本

**问题描述：**
从 tabs 页面导航到非 tabs 页面时，返回按钮可能显示 `(tabs)` 或其他路由名称，而不是 "返回" 或 "Back"。

**解决方案：**
在 Stack.Screen 的 options 中设置 `headerBackTitle`：

```tsx
<Stack.Screen
  options={{
    title: '页面标题',
    headerBackTitle: t('common.back'), // 设置返回按钮文本
  }}
/>
```

**官方文档：**
- https://docs.expo.dev/router/advanced/stack/#header-options

### 2. 动态路由类型检查错误

**问题描述：**
使用 `router.push()` 或 `router.replace()` 时，TypeScript 报错路径不存在。

**解决方案：**
使用类型断言 `as never`：

```tsx
router.push('/some-route' as never);
router.replace('/(tabs)' as never);
```

## React Native Reanimated

### SharedValue 类型导入

从 `react-native-reanimated` 直接导入 `SharedValue` 类型：

```tsx
import Animated, { SharedValue } from 'react-native-reanimated';
```

## 布局注意事项

### 按钮布局避免换行

- 运行时状态不显示禁用按钮，避免按钮过多导致换行
- 控制按钮容器不使用 `flexWrap: 'wrap'`
- 适当减小按钮的 padding 和 minWidth
