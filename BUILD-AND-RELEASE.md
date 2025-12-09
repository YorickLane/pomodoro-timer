# 构建流程指南 - Build Guide

[中文](#中文版本) | [English](#english-version)

---

## 中文版本

## 📋 流程概览

```
开发测试 → Development Build → Preview Build → Production Build → 上架
   ↓              ↓                ↓                  ↓            ↓
Expo Go      真机测试        内测分发          最终构建      商店审核
```

> **应用商店发布相关**（账号注册、商店材料、提交审核）请参考：[APP-STORE-GUIDE.md](./APP-STORE-GUIDE.md)

---

## 阶段 1️⃣：开发和测试

### 1.1 Expo Go 快速测试（开发阶段）

**用途：** 快速迭代开发，实时预览

**步骤：**
```bash
# 启动开发服务器
npx expo start

# 在手机上扫码或选择平台
npx expo start --ios
npx expo start --android
```

**优点：**
- ✅ 无需构建，即时预览
- ✅ 热重载，快速迭代
- ✅ 适合 UI 调试

**限制：**
- ⚠️ 通知功能受限（远程推送不可用，本地通知可用）
- ⚠️ 某些原生功能不可用
- ⚠️ 性能不如真机构建

**适用场景：** 开发阶段的快速测试

---

## 阶段 2️⃣：Development Build（开发构建）

### 2.1 什么是 Development Build？

Development Build 是包含开发工具的真机构建版本，可以：
- ✅ 在真机上测试完整功能（包括通知）
- ✅ 使用真实的原生模块
- ✅ 保留调试功能
- ✅ 可以使用 Expo Go 不支持的功能

### 2.2 创建 Development Build

**首次配置（只需一次）：**
```bash
# 登录 EAS
eas login

# 配置 EAS Build
eas build:configure
```

**构建 Development 版本：**
```bash
# iOS Development Build
eas build --profile development --platform ios

# Android Development Build
eas build --profile development --platform android

# 或同时构建两个平台
eas build --profile development --platform all
```

**配置文件（eas.json）：**
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    }
  }
}
```

### 2.3 安装和测试

**iOS：**
```bash
# 构建完成后，下载 .tar.gz 文件
# 解压后在模拟器安装，或通过 TestFlight 安装到真机
```

**Android：**
```bash
# 构建完成后，下载 .apk 文件
# 直接安装到 Android 设备
adb install app.apk
```

**启动开发服务器：**
```bash
npx expo start --dev-client
```

**适用场景：** 测试完整功能，调试原生模块

---

## 阶段 3️⃣：Preview Build（预览构建）

### 3.1 什么是 Preview Build？

Preview Build 是接近生产版本的内部测试版本：
- ✅ 移除调试工具
- ✅ 性能接近生产版本
- ✅ 可以分发给测试人员
- ⚠️ 不能提交到商店（需要 Production Build）

### 3.2 创建 Preview Build

**配置（eas.json）：**
```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    }
  }
}
```

**构建：**
```bash
# iOS Preview
eas build --profile preview --platform ios

# Android Preview
eas build --profile preview --platform android

# 同时构建
eas build --profile preview --platform all
```

### 3.3 分发给测试人员

**iOS - TestFlight（内部测试）：**
```bash
# 自动提交到 TestFlight
eas submit --platform ios --latest

# 或手动上传到 App Store Connect
```

**Android - Internal Testing：**
```bash
# 下载 .aab 文件
# 手动上传到 Google Play Console - Internal Testing
```

**适用场景：** 内部测试、UAT、Beta 测试

---

## 阶段 4️⃣：Production Build（生产构建）

### 4.1 上架前检查清单

**运行自动检查：**
```bash
# 使用 pre-release-check skill
/skill pre-release-check
```

**手动检查清单：**
- [ ] 运行 `npx tsc --noEmit` - 无 TypeScript 错误
- [ ] 运行 `npm audit` - 无安全漏洞
- [ ] 测试所有核心功能 - 完整流程通过
- [ ] 检查 app.json 配置 - 版本号、图标、Bundle ID
- [ ] 准备商店材料 - 截图、描述、隐私政策
- [ ] 移除 console.log - 生产代码干净

**版本号管理：**
```bash
# 更新版本号（手动编辑）
# app.json
"version": "1.0.0"  # 显示给用户的版本

# iOS Build Number（自动递增）
"buildNumber": "1"

# Android Version Code（自动递增）
"versionCode": 1
```

### 4.2 配置 Production Profile

**eas.json 配置：**
```json
{
  "build": {
    "production": {
      "autoIncrement": true,
      "env": {
        "EXPO_PUBLIC_ENV": "production"
      },
      "ios": {
        "simulator": false,
        "bundleIdentifier": "com.yourname.pomodoro"
      },
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABC123XYZ"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 4.3 构建 Production 版本

**完整构建流程：**

```bash
# 1. 确保代码已提交
git status
git add .
git commit -m "chore: prepare for v1.0.0 release"

# 2. 更新版本号
# 编辑 app.json 和 package.json 的 version 字段

# 3. 运行上架前检查
/skill pre-release-check

# 4. 构建 Production 版本
eas build --profile production --platform all

# 构建时间：约 10-20 分钟
# 会输出下载链接
```

**只构建单个平台：**
```bash
# 仅 iOS
eas build --profile production --platform ios

# 仅 Android
eas build --profile production --platform android
```

### 4.4 下载构建产物

**构建完成后：**
```bash
# 查看构建历史
eas build:list

# 下载构建文件
eas build:download --platform ios
eas build:download --platform android
```

**产物类型：**
- iOS: `.ipa` 文件
- Android: `.aab` 文件（或 `.apk`）

---

## 阶段 5️⃣：真机测试

### 5.1 iOS 真机测试

**方法 1：通过 TestFlight（推荐）**

```bash
# 1. 提交到 TestFlight
eas submit --platform ios --latest

# 2. 在 App Store Connect 中：
#    - 进入 TestFlight
#    - 添加内部测试人员
#    - 填写测试信息
#    - 开始测试
```

**方法 2：直接安装（开发者设备）**
```bash
# 下载 .ipa 文件
# 使用 Xcode 或 Apple Configurator 安装到设备
```

### 5.2 Android 真机测试

**方法 1：通过 Google Play Internal Testing（推荐）**

```bash
# 1. 提交到 Google Play
eas submit --platform android --latest

# 2. 在 Google Play Console 中：
#    - 选择 Internal Testing
#    - 上传 .aab 文件
#    - 创建测试组
#    - 分发测试链接
```

**方法 2：直接安装 APK**
```bash
# 下载 .apk 文件（如果构建了 apk）
# 直接传输到设备安装
adb install app.apk

# 或通过文件管理器安装
```

### 5.3 真机测试清单

**功能测试：**
- [ ] 完整的番茄钟流程（工作 → 短休息 → 长休息）
- [ ] 通知功能（工作结束、休息结束）
- [ ] 暂停、恢复、跳过
- [ ] 数据持久化（关闭重开）
- [ ] 统计数据准确性
- [ ] 设置修改生效
- [ ] 语言切换
- [ ] 深色模式

**性能测试：**
- [ ] 启动时间 < 2 秒
- [ ] 动画流畅（60fps）
- [ ] 无卡顿
- [ ] 内存占用正常

**边界测试：**
- [ ] 后台切换恢复
- [ ] 网络断开（离线可用）
- [ ] 低电量模式
- [ ] 系统时间修改

---

## 常用命令速查

### 构建命令
```bash
# Development Build
eas build --profile development --platform all

# Preview Build
eas build --profile preview --platform all

# Production Build
eas build --profile production --platform all

# 仅 iOS
eas build --profile production --platform ios

# 仅 Android
eas build --profile production --platform android
```

### 提交命令
```bash
# 自动提交最新构建
eas submit --platform ios --latest
eas submit --platform android --latest

# 提交所有平台
eas submit --platform all --latest
```

### 查看和管理
```bash
# 查看构建历史
eas build:list

# 查看构建详情
eas build:view [BUILD_ID]

# 下载构建文件
eas build:download --platform ios
eas build:download --platform android

# 取消正在进行的构建
eas build:cancel
```

### 维护命令
```bash
# 修复 Expo 依赖版本兼容性
npx expo install --fix

# 清除并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 验证配置
cat eas.json
cat app.json
```

---

## 故障排查

### 构建失败

**常见问题：**

1. **证书问题（iOS）**
   ```bash
   # 清除凭证
   eas credentials
   # 选择 Remove credentials
   # 重新构建
   ```

2. **依赖问题**
   ```bash
   # 清除并重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **配置错误**
   ```bash
   # 验证配置
   cat eas.json
   cat app.json
   ```

4. **Expo 包版本不兼容**
   ```bash
   # 修复版本
   npx expo install --fix
   ```

---

## 时间估算

| 阶段 | 时间 |
|------|------|
| 配置 EAS Build | 10-15 分钟（首次） |
| Development Build | 10-15 分钟 |
| Preview Build | 10-15 分钟 |
| Production Build | 15-20 分钟 |
| TestFlight 处理 | 5-10 分钟 |

---

## 最佳实践

### 1. 构建策略
- ✅ Development - 频繁构建，快速迭代
- ✅ Preview - 每个功能完成后构建，内部测试
- ✅ Production - 充分测试后再构建，减少审核次数

### 2. 测试策略
- ✅ Expo Go - 日常开发
- ✅ Development Build - 测试原生功能
- ✅ Preview Build - 内部测试
- ✅ Production Build - 最终验证

### 3. 版本管理
- ✅ 使用 Git Tags 标记版本
- ✅ 记录 CHANGELOG.md
- ✅ 语义化版本号
- ✅ 自动递增 Build Number

---

## 有用的资源

### 官方文档
- EAS Build: https://docs.expo.dev/build/introduction/
- EAS Submit: https://docs.expo.dev/submit/introduction/

### 工具
- EAS Dashboard: https://expo.dev/accounts/[your-account]/projects

---

# English Version

## 📋 Process Overview

```
Development → Development Build → Preview Build → Production Build → Release
     ↓              ↓                  ↓                 ↓              ↓
 Expo Go      Device Testing      Beta Testing      Final Build    Store Review
```

> **App Store publishing** (account registration, store assets, submission) - see: [APP-STORE-GUIDE.md](./APP-STORE-GUIDE.md)

---

## Stage 1️⃣: Development & Testing

### 1.1 Expo Go Quick Testing (Development Phase)

**Purpose:** Fast iteration, real-time preview

**Steps:**
```bash
# Start development server
npx expo start

# Scan QR code on device or select platform
npx expo start --ios
npx expo start --android
```

**Pros:**
- ✅ No build needed, instant preview
- ✅ Hot reload, fast iteration
- ✅ Great for UI debugging

**Limitations:**
- ⚠️ Limited notification support (remote push unavailable, local works)
- ⚠️ Some native features unavailable
- ⚠️ Performance not representative

**Use Case:** Quick testing during development

---

## Stage 2️⃣: Development Build

### 2.1 What is Development Build?

A real device build with development tools:
- ✅ Test full functionality on real devices
- ✅ Use real native modules
- ✅ Keep debugging features
- ✅ Access features not available in Expo Go

### 2.2 Create Development Build

**Initial Setup (one-time):**
```bash
# Login to EAS
eas login

# Configure EAS Build
eas build:configure
```

**Build Development Version:**
```bash
# iOS Development Build
eas build --profile development --platform ios

# Android Development Build
eas build --profile development --platform android

# Both platforms
eas build --profile development --platform all
```

### 2.3 Install & Test

**iOS:**
- Download .tar.gz file
- Install on simulator or via TestFlight

**Android:**
- Download .apk file
- Install directly: `adb install app.apk`

**Start dev server:**
```bash
npx expo start --dev-client
```

---

## Stage 3️⃣: Preview Build

### 3.1 What is Preview Build?

Internal testing build close to production:
- ✅ Debug tools removed
- ✅ Performance close to production
- ✅ Can distribute to testers
- ⚠️ Cannot submit to stores

### 3.2 Create Preview Build

**Build:**
```bash
# iOS Preview
eas build --profile preview --platform ios

# Android Preview
eas build --profile preview --platform android

# Both
eas build --profile preview --platform all
```

### 3.3 Distribute to Testers

**iOS - TestFlight (Internal):**
```bash
# Auto submit to TestFlight
eas submit --platform ios --latest
```

**Android - Internal Testing:**
- Download .aab file
- Upload to Google Play Console - Internal Testing

---

## Stage 4️⃣: Production Build

### 4.1 Pre-Release Checklist

**Run automated checks:**
```bash
# Use pre-release-check skill
/skill pre-release-check
```

**Manual Checklist:**
- [ ] Run `npx tsc --noEmit` - No TypeScript errors
- [ ] Run `npm audit` - No vulnerabilities
- [ ] Test all core features - Complete flow passes
- [ ] Check app.json - Version, icon, Bundle ID
- [ ] Prepare store assets - Screenshots, description, privacy policy
- [ ] Remove console.log - Clean production code

### 4.2 Build Production Version

```bash
# 1. Ensure code is committed
git status
git add .
git commit -m "chore: prepare for v1.0.0 release"

# 2. Update version number
# Edit version in app.json and package.json

# 3. Run pre-release checks
/skill pre-release-check

# 4. Build Production version
eas build --profile production --platform all

# Build time: ~10-20 minutes
```

### 4.3 Download Build Artifacts

```bash
# View build history
eas build:list

# Download build files
eas build:download --platform ios
eas build:download --platform android
```

**Artifact Types:**
- iOS: `.ipa` file
- Android: `.aab` file (or `.apk`)

---

## Stage 5️⃣: Device Testing

### 5.1 iOS Device Testing

**Method 1: TestFlight (Recommended)**

```bash
# 1. Submit to TestFlight
eas submit --platform ios --latest

# 2. In App Store Connect:
#    - Go to TestFlight
#    - Add internal testers
#    - Start testing
```

### 5.2 Android Device Testing

**Method 1: Google Play Internal Testing (Recommended)**

```bash
# 1. Submit to Google Play
eas submit --platform android --latest

# 2. In Google Play Console:
#    - Select Internal Testing
#    - Create test group
#    - Distribute test link
```

**Method 2: Direct APK Install**
```bash
adb install app.apk
```

### 5.3 Device Testing Checklist

**Functional Testing:**
- [ ] Complete pomodoro cycle (work → short break → long break)
- [ ] Notifications (work end, break end)
- [ ] Pause, resume, skip
- [ ] Data persistence (close & reopen)
- [ ] Statistics accuracy
- [ ] Settings changes take effect
- [ ] Language switching
- [ ] Dark mode

**Performance Testing:**
- [ ] Startup time < 2s
- [ ] Smooth animations (60fps)
- [ ] No lag
- [ ] Normal memory usage

---

## Quick Command Reference

### Build Commands
```bash
# Development Build
eas build --profile development --platform all

# Preview Build
eas build --profile preview --platform all

# Production Build
eas build --profile production --platform all
```

### Submit Commands
```bash
# Auto-submit latest build
eas submit --platform ios --latest
eas submit --platform android --latest
```

### View & Manage
```bash
# View build history
eas build:list

# Download build files
eas build:download --platform ios
eas build:download --platform android

# Cancel ongoing build
eas build:cancel
```

### Maintenance Commands
```bash
# Fix Expo dependency version compatibility
npx expo install --fix

# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Troubleshooting

### Build Failures

1. **Certificate Issues (iOS)**
   ```bash
   eas credentials
   # Select Remove credentials
   # Rebuild
   ```

2. **Dependency Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Expo Package Version Incompatibility**
   ```bash
   npx expo install --fix
   ```

---

## Time Estimates

| Stage | Time |
|-------|------|
| Configure EAS Build | 10-15 min (first time) |
| Development Build | 10-15 min |
| Preview Build | 10-15 min |
| Production Build | 15-20 min |
| TestFlight Processing | 5-10 min |

---

## Best Practices

### 1. Build Strategy
- ✅ Development - Build frequently, fast iteration
- ✅ Preview - Build after feature completion, internal testing
- ✅ Production - Build after thorough testing, minimize reviews

### 2. Testing Strategy
- ✅ Expo Go - Daily development
- ✅ Development Build - Test native features
- ✅ Preview Build - Internal testing
- ✅ Production Build - Final verification

### 3. Version Management
- ✅ Use Git Tags for versions
- ✅ Maintain CHANGELOG.md
- ✅ Semantic versioning
- ✅ Auto-increment Build Numbers

---

## Useful Resources

### Official Documentation
- EAS Build: https://docs.expo.dev/build/introduction/
- EAS Submit: https://docs.expo.dev/submit/introduction/

### Tools
- EAS Dashboard: https://expo.dev/accounts/[your-account]/projects
