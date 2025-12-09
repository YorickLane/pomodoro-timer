# 手动操作步骤清单

**这些步骤需要你亲自执行，无法自动化。**

---

## 📍 当前位置

你现在应该在：
```
~/Documents/WordSpace/GitHub/pomodoro-timer/
```

这个目录已经包含：
- ✅ 项目文档（PRD、技术设计、开发清单等）
- ✅ MCP 配置（Context7）
- ✅ Skills（4个通用 skills）
- ✅ 代码复用指南

---

## 🎯 你需要手动执行的步骤

### 步骤 1：在 GitHub 创建新仓库 ⏰ 2分钟

**浏览器操作：**
1. 访问 https://github.com/new
2. 填写信息：
   - Repository name: `pomodoro-timer`
   - Description: `A simple and elegant Pomodoro Timer app for iOS, Android, and Web`
   - Public（公开）或 Private（私有）
   - ❌ 不要勾选 "Initialize with README"（我们已经有了）
3. 点击 "Create repository"

**记录仓库 URL：**
```
https://github.com/[你的用户名]/pomodoro-timer.git
```

---

### 步骤 2：初始化 Expo 项目 ⏰ 5分钟

**在终端执行：**

```bash
# 确认当前目录
pwd
# 应该输出：/Users/fengxiu/Documents/WordSpace/GitHub/pomodoro-timer

# 初始化 Expo 项目（使用 TypeScript 模板）
npx create-expo-app@latest . --template blank-typescript

# 说明：
# - 使用 . 表示在当前目录初始化
# - blank-typescript 是最简洁的模板
# - 会自动安装基础依赖
```

**预期输出：**
```
✔ Downloaded and extracted project files.
> npm install
...
✅ Your project is ready!
```

---

### 步骤 3：关联 Git 仓库 ⏰ 2分钟

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit with project docs and config"

# 关联远程仓库（替换成你的 URL）
git remote add origin https://github.com/[你的用户名]/pomodoro-timer.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

### 步骤 4：安装项目依赖 ⏰ 3分钟

```bash
# 安装番茄钟特定的依赖（和喝水提醒相同）
npx expo install \
  expo-sqlite \
  expo-notifications \
  zustand \
  date-fns \
  @react-native-async-storage/async-storage \
  react-native-gifted-charts \
  @react-native-community/datetimepicker \
  react-native-svg

# Expo 会自动选择兼容的版本
```

---

### 步骤 5：验证项目运行 ⏰ 2分钟

```bash
# 启动开发服务器
npx expo start

# 在模拟器中运行
npx expo start --ios
# 或
npx expo start --android
```

**应该能看到默认的 Expo 欢迎页面。**

---

### 步骤 6：配置 EAS Build ⏰ 3分钟

```bash
# 登录 EAS（如果还没登录）
eas login

# 配置 EAS Build
eas build:configure

# 选择：
# - 平台：All（iOS + Android + Web）
# - Bundle ID：com.[你的名字].pomodoro
```

---

## ✅ 完成检查清单

执行完上述步骤后，你应该有：

- [ ] GitHub 仓库已创建
- [ ] Expo 项目已初始化
- [ ] 代码已推送到 GitHub
- [ ] 依赖已安装完成
- [ ] 项目可以正常运行
- [ ] EAS Build 已配置

---

## 🎯 完成后告诉我

完成所有步骤后，我会帮你：

1. **开始开发核心功能**
   - 创建计时器逻辑
   - 实现倒计时 UI
   - 集成通知系统

2. **复制和修改可复用代码**
   - 从喝水提醒复制存储架构
   - 复制主题系统
   - 复制通知系统基础

3. **构建完整应用**
   - 主页、统计、设置
   - 深色模式
   - 动画效果

**预计 4-5 天后可以开始构建和上架！**

---

## ⏰ 估算总时间

| 步骤 | 预计时间 |
|------|----------|
| 步骤 1-6 | 约 20 分钟 |
| 等待安装 | 约 5 分钟 |
| **总计** | **约 25 分钟** |

---

## 💡 提示

1. **保留喝水提醒项目**
   - 作为参考
   - 随时查看代码
   - 复制需要的部分

2. **使用相同的命令**
   - Expo 版本相同
   - 依赖版本相同
   - 避免兼容性问题

3. **遇到问题**
   - 查看喝水提醒的解决方案
   - 参考 TECH-DESIGN.md
   - 使用 `/skill latest-docs`

---

**准备好了就开始吧！完成后告诉我！** 🚀

---

## 🔧 常用维护命令

### 修复 Expo 依赖版本

当运行 `npm start` 或 `npx expo start` 时，如果看到类似以下警告：

```
The following packages should be updated for best compatibility with the installed expo version:
  expo@54.0.25 - expected version: ~54.0.27
  expo-router@6.0.15 - expected version: ~6.0.17
  ...
```

**解决方法：**

```bash
# 1. 先停止正在运行的 Expo CLI（如果有）

# 2. 运行修复命令
npx expo install --fix

# 3. 重新启动项目
npm start
```

**说明：**
- `npx expo install --fix` 会自动将所有 Expo 相关包更新到当前 SDK 的兼容版本
- 如果在另一个终端有 Expo CLI 正在运行，需要先停止，否则可能无法完全更新
- 更新后建议提交变更（package.json、package-lock.json、app.json）
