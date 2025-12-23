# 版本号管理指南

## 语义化版本（Semantic Versioning）

版本格式：**MAJOR.MINOR.PATCH**（如 `1.1.0`）

| 类型 | 位置 | 何时递增 | 示例 |
|------|------|----------|------|
| **MAJOR** | 1.x.x | 重大变更、不兼容更新 | 完全重写、架构大改、API 破坏性变更 |
| **MINOR** | x.1.x | 新功能（向下兼容） | 添加主题切换、新页面、新入口 |
| **PATCH** | x.x.1 | Bug 修复、小优化 | 修复崩溃、UI 微调、性能优化 |

## 版本号示例

```
1.0.0 → 1.0.1  # Bug 修复
1.0.1 → 1.1.0  # 新增功能
1.1.0 → 2.0.0  # 重大重构
```

## 何时更新版本号

| 场景 | 是否更新版本号 |
|------|----------------|
| 每次 git commit | ❌ 不需要 |
| 本地开发测试 | ❌ 不需要 |
| PR 合并到 main | ❌ 不需要 |
| **提交到应用商店** | ✅ 必须更新 |

## 推荐工作流程

```
开发中的改动
    ↓
多次 git commit（不改版本号）
    ↓
功能完成，准备发布
    ↓
更新 app.json 中的 version
    ↓
构建并提交商店
```

## 修改版本号位置

文件：`app.json`

```json
{
  "expo": {
    "version": "1.1.0",  // ← 修改这里
    ...
  }
}
```

## 构建号（Build Number）

除了用户可见的 `version`，还有构建号：

| 平台 | 字段 | 说明 |
|------|------|------|
| iOS | `ios.buildNumber` | 同一 version 下可递增 |
| Android | `android.versionCode` | 每次提交必须递增 |

> **注意**：EAS Build 会自动管理构建号，通常不需要手动修改。

## 发布检查清单

发布新版本前确认：

- [ ] 版本号已更新（高于商店当前版本）
- [ ] 更新日志已编写
- [ ] 所有功能已测试
- [ ] TypeScript 编译通过

## 参考

- [Semantic Versioning 官网](https://semver.org/)
- [Expo 版本配置文档](https://docs.expo.dev/versions/latest/config/app/#version)
