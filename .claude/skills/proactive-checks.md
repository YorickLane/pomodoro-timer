# Proactive Checks - 主动检查 Skill

## 目的
在开发过程中主动验证信息，避免依赖可能过时的知识库，确保使用最新、最准确的 API 和最佳实践。

## 核心原则

### ⚠️ 永远不要假设，始终验证

**问题：**
- AI 知识库可能过时（训练数据截止日期之前的）
- API 会更新、废弃、变更
- 版本号很重要，不同版本 API 可能不同
- 时间敏感的信息需要实时确认

**解决方案：**
- ✅ 主动查询最新文档（Context7 / WebFetch）
- ✅ 确认当前日期和时间
- ✅ 验证 API 版本和兼容性
- ✅ 查看最新的 changelog 和 breaking changes

## 必须主动检查的场景

### 1. 开始新功能开发前

**检查清单：**
```bash
# 1. 确认当前时间
date

# 2. 查询项目依赖版本
cat package.json | grep -A 5 "dependencies"

# 3. 使用 Context7 查询最新文档
# 例如：在提示中添加 "use context7" 或 "查询最新文档"
```

**示例：**
```markdown
我需要实现通知功能，use context7

请帮我：
1. 查询 Expo SDK 54 的 expo-notifications 最新 API
2. 确认是否有废弃的方法
3. 查看推荐的最佳实践
```

### 2. 使用新的 API 或库时

**必做：**
- ✅ 使用 Context7 查询官方文档
- ✅ 确认 API 签名和参数
- ✅ 查看是否有新的推荐方式
- ✅ 检查 breaking changes

**示例：**
```markdown
我要使用 expo-sqlite，use context7

请确认：
1. 是使用 expo-sqlite 还是 expo-sqlite/next？
2. 最新的数据库操作 API 是什么？
3. 是否有废弃的方法需要避免？
```

### 3. 遇到警告或错误时

**必做：**
- ✅ 查询最新文档确认正确用法
- ✅ 搜索该错误的最新解决方案
- ✅ 确认是否是版本问题

**示例：**
```markdown
收到警告：shouldShowAlert is deprecated

use context7 查询 expo-notifications 文档：
1. 新的推荐 API 是什么？
2. 如何正确配置通知处理？
```

### 4. 版本升级时

**必做：**
- ✅ 查看 changelog
- ✅ 确认 breaking changes
- ✅ 验证迁移步骤

## 主动检查命令

### 时间和日期
```bash
# 获取当前日期时间
date

# 获取当前年份（用于搜索最新文档）
date +%Y

# 获取当前月份
date +%Y-%m
```

**为什么重要：**
- 搜索文档时，知道当前是 2025 年，不要搜索 2024 年的文档
- 某些 API 可能有时间相关的变更

### 版本检查
```bash
# 检查 Expo SDK 版本
npx expo --version

# 检查特定包的版本
npm list expo-notifications
npm list react-native

# 查看所有依赖版本
cat package.json | jq '.dependencies'
```

### 文档查询

**方法 1：使用 Context7（最推荐）**
```markdown
我需要实现 [功能]，use context7
```

Context7 会：
- 自动识别技术栈
- 获取对应版本的最新文档
- 提供准确的代码示例

**方法 2：使用 WebFetch**
```markdown
请使用 WebFetch 查询 https://docs.expo.dev/versions/latest/sdk/notifications/
提取：
1. 最新的 API 用法
2. 废弃的方法
3. 推荐的最佳实践
```

**方法 3：使用 WebSearch**
```markdown
搜索："expo-notifications SDK 54 deprecated 2025"
```

## 开发流程中的主动检查点

### 阶段 1：项目初始化
```bash
# 1. 确认当前日期
date

# 2. 查询最新的 Expo SDK 版本
use context7: 最新的 Expo SDK 版本是什么？

# 3. 确认推荐的技术栈
use context7: Expo SDK 54 推荐的状态管理方案？
```

### 阶段 2：核心功能开发
```bash
# 每个新功能开发前
use context7: [功能名] 的最新 API 用法

# 示例
use context7: expo-sqlite 最新用法
use context7: expo-notifications 配置方法
use context7: React Native Reanimated 3 最新 API
```

### 阶段 3：遇到问题时
```bash
# 1. 确认问题的最新解决方案
use context7: [错误信息]

# 2. 搜索 GitHub Issues
WebSearch: "expo-notifications deprecated 2025"

# 3. 查看官方文档
WebFetch: https://docs.expo.dev/...
```

### 阶段 4：优化和上架前
```bash
# 1. 检查是否有最新的最佳实践
use context7: Expo app 性能优化最新建议

# 2. 确认上架要求
use context7: App Store 提交要求 2025

# 3. 检查安全问题
npm audit
```

## 实际案例

### 案例 1：通知 API 变更

**之前的做法（可能过时）：**
```typescript
// 直接使用可能过时的 API
shouldShowAlert: true  // ❌ 已废弃！
```

**正确的做法：**
```markdown
1. use context7: expo-notifications 最新配置方法
2. 查看文档后使用：
   shouldShowBanner: true,
   shouldShowList: true
```

### 案例 2：数据库 API

**之前的做法（可能过时）：**
```typescript
// 使用旧的 API（可能已废弃）
SQLite.openDatabase()  // ❌ 可能过时
```

**正确的做法：**
```markdown
1. use context7: expo-sqlite SDK 54 最新 API
2. 确认应该使用：
   SQLite.openDatabaseAsync()  // ✅ 最新
```

### 案例 3：确认当前时间

**场景：** 搜索最新文档时

**之前的做法（可能错误）：**
```
搜索 "expo-notifications 2024"  // ❌ 如果现在是 2025 年
```

**正确的做法：**
```bash
# 1. 先确认当前年份
date +%Y  # 输出：2025

# 2. 使用正确的年份搜索
搜索 "expo-notifications 2025 latest"  # ✅
```

## 检查频率建议

### 🔴 每次必查（强制）
- 开始新项目/新功能时
- 使用从未用过的 API 时
- 遇到警告或错误时
- 版本升级时

### 🟡 经常检查（建议）
- 实现核心功能前
- 提交重要代码前
- 准备上架前

### 🟢 偶尔检查（可选）
- 重构代码时
- 性能优化时
- 添加新依赖时

## 自动化提醒

### 在提示词中使用关键词触发

**当用户说：**
- "添加新功能"
- "实现 XXX"
- "使用 YYY 库"

**应该立即：**
1. 确认当前日期：`date`
2. 查询最新文档：`use context7` 或 `WebFetch`
3. 验证 API 版本

## 集成到开发流程

### 修改后的开发流程

```markdown
用户：我要实现通知功能

AI 的正确响应：
1. [主动] 确认当前时间：`date`
2. [主动] 使用 Context7 查询最新文档
3. [主动] 确认项目的 Expo SDK 版本
4. 基于最新文档开始实现
5. 遇到问题时再次查询最新解决方案
```

## 工具使用优先级

### 1. Context7（最高优先级）
**何时使用：**
- 所有涉及框架/库的 API 使用
- 不确定具体用法时
- 想要最新最佳实践时

**优势：**
- 自动获取特定版本的文档
- 消除幻觉 API
- 提供准确的代码示例

### 2. WebFetch（次优先级）
**何时使用：**
- 需要查看完整的文档页面
- Context7 没有覆盖的内容
- 需要查看 changelog

### 3. WebSearch（辅助）
**何时使用：**
- 查找社区解决方案
- 搜索特定错误信息
- 查找示例代码

### 4. 知识库（最后）
**何时使用：**
- 通用编程概念
- 已验证的基础知识
- 不涉及特定版本的逻辑

## 检查清单模板

### 开始新功能前
```markdown
□ 确认当前日期：date
□ 确认项目版本：cat package.json
□ 查询最新文档：use context7 [功能名]
□ 确认 API 没有废弃
□ 查看最新最佳实践
```

### 遇到问题时
```markdown
□ 确认错误信息完整
□ 查询最新文档：use context7 [错误关键词]
□ 搜索最新解决方案：WebSearch
□ 验证解决方案适用当前版本
```

## 集成到现有 Skills

### 更新 latest-docs.md
添加"主动使用"章节，强调：
- 不要等用户要求才查询
- 遇到不确定的 API 立即查询
- 开发前先查，而不是开发后再改

### 在其他 skills 中引用
在 `typescript-strict.md`、`pre-release-check.md` 中添加：
```markdown
⚠️ 检查前先确认：
1. 运行 `date` 确认当前时间
2. use context7 查询最新的 linting 规则
3. 验证 TypeScript 版本的最新要求
```

## 实施建议

### 立即行动
1. ✅ 创建此 skill（proactive-checks.md）
2. ✅ 更新 latest-docs.md 强调主动性
3. ✅ 在其他 skills 中引用此检查清单

### 开发习惯
- 每次开始新功能：先 `date`，再 `use context7`
- 每次遇到问题：先查最新文档，再编码
- 每次使用新 API：先验证版本，再实现

## 示例对话流程

### ❌ 之前的流程（可能过时）
```
用户：实现通知功能
AI：好的，我使用 expo-notifications...（直接编码）
结果：可能使用了废弃的 API
```

### ✅ 改进后的流程
```
用户：实现通知功能
AI：
1. 先确认当前时间：date → 2025-11-23
2. use context7 查询 expo-notifications SDK 54 最新 API
3. 确认：应该使用 shouldShowBanner 而不是 shouldShowAlert
4. 基于最新文档开始实现
结果：使用最新、正确的 API
```

## 自我检查问题

在编码前问自己：

1. **我确定这个 API 是最新的吗？**
   - 如果不确定 → use context7

2. **我知道当前日期吗？**
   - 如果不确定 → date

3. **这个方法会不会已经废弃？**
   - 如果不确定 → 查询文档

4. **有没有更好的新方法？**
   - 如果不确定 → 查询最佳实践

## 集成到工作流

### Git Commit 前检查
```bash
# 1. 确认代码使用的都是最新 API
grep -r "deprecated\|废弃" . --include="*.ts" --include="*.tsx"

# 2. 运行类型检查
npx tsc --noEmit

# 3. 查看是否有警告
npx expo start --no-dev （检查控制台警告）
```

### Code Review 检查
- □ 所有 API 都是最新的？
- □ 没有使用废弃的方法？
- □ 有 Context7 验证过？
- □ 版本号正确？

## 工具快捷方式

### Context7 触发词
在提示中添加以下任一关键词：
- `use context7`
- `查询最新文档`
- `最新 API`
- `官方文档`

### 常用查询模板

**查询 API 用法：**
```
use context7: [库名] [功能] SDK [版本号] 最新用法
```

**查询最佳实践：**
```
use context7: [技术栈] 最佳实践 2025
```

**查询问题解决：**
```
use context7: [错误信息] 解决方案
```

## 为什么这很重要

### 真实案例
1. **shouldShowAlert 废弃**
   - 如果不查最新文档 → 使用废弃 API → 产生警告
   - 查询后 → 使用 shouldShowBanner → 无警告

2. **expo-sqlite API 变更**
   - 旧版：`SQLite.openDatabase()`
   - 新版：`SQLite.openDatabaseAsync()`
   - 不查文档 → 使用旧 API → 可能出错

3. **时间敏感搜索**
   - 搜索 "React Native 2024" 在 2025 年可能得到旧信息
   - 正确：先 `date` 确认年份，再搜索 "React Native 2025"

## 总结

### 三个核心习惯

1. **🕐 主动确认时间**
   ```bash
   date
   ```

2. **📚 主动查询文档**
   ```markdown
   use context7
   ```

3. **✅ 主动验证版本**
   ```bash
   npm list [package-name]
   ```

### 口诀

**"不确定就查询，查询用 Context7"**

---

**养成主动检查的习惯，写出永远最新、最正确的代码！** 🎯

## 使用方法

在开发过程中，随时提醒：
- 我应该先查询最新文档
- 我应该确认当前时间
- 我应该验证 API 版本

或者在提示中加入这些检查。
