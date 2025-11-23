# 构建和发布流程 - Build and Release Guide

[中文](#中文版本) | [English](#english-version)

---

## 中文版本

## 📋 流程概览

```
开发测试 → Development Build → Preview Build → Production Build → 上架
   ↓              ↓                ↓                  ↓            ↓
Expo Go      真机测试        内测分发          最终构建      商店审核
```

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

## 阶段 6️⃣：提交到应用商店

### 6.1 准备商店材料

**必需材料：**

**图标和截图：**
- [ ] App Icon (1024x1024 PNG)
- [ ] iPhone 截图（至少 2 张）
  - 6.7" (iPhone 15 Pro Max): 1290 x 2796
  - 6.5" (iPhone 14 Plus): 1284 x 2778
  - 5.5" (iPhone 8 Plus): 1242 x 2208
- [ ] iPad 截图（可选）
- [ ] Android 截图
  - Phone: 至少 2 张
  - Tablet: 可选

**文字材料：**
- [ ] 应用名称（30 字符以内）
- [ ] 副标题（30 字符以内，iOS）
- [ ] 简短描述（80 字符，Android）
- [ ] 详细描述（4000 字符以内）
- [ ] 关键词（100 字符，逗号分隔）
- [ ] 隐私政策 URL（必需）
- [ ] 支持 URL（可选）

**示例描述（英文）：**
```
Pomodoro Timer - Simple & Elegant

A clean and focused Pomodoro timer to boost your productivity.

FEATURES:
• Classic Pomodoro Technique (25/5/15 min)
• Real-time statistics and progress tracking
• Smart notifications when sessions end
• Customizable work and break durations
• Dark mode support
• Auto-start next session
• Complete offline functionality
• Your data stays on your device

PERFECT FOR:
• Students studying for exams
• Developers and designers
• Anyone who needs focused work time

Simple. Focused. Efficient.
```

### 6.2 提交到 App Store（iOS）

**步骤：**

```bash
# 1. 构建 Production 版本
eas build --profile production --platform ios

# 2. 自动提交到 App Store Connect
eas submit --platform ios --latest

# 或手动提交：
# - 下载 .ipa 文件
# - 使用 Transporter 或 Xcode 上传
```

**在 App Store Connect 中：**

1. **App 信息**
   - 名称、副标题、类别（生产力）
   - 隐私政策 URL
   - 支持 URL

2. **定价和可用性**
   - 选择免费
   - 选择地区（全球或特定地区）

3. **准备提交**
   - 上传截图（不同尺寸的 iPhone）
   - 填写描述和关键词
   - 选择构建版本
   - 版权信息
   - 年龄分级（4+）

4. **App 隐私**
   - 数据类型：无（所有数据本地存储）
   - 隐私实践说明

5. **提交审核**
   - 检查所有信息
   - 点击"提交审核"
   - 等待审核（通常 24-48 小时）

### 6.3 提交到 Google Play（Android）

**步骤：**

```bash
# 1. 构建 Production 版本（AAB 格式）
eas build --profile production --platform android

# 2. 自动提交到 Google Play
eas submit --platform android --latest

# 或手动提交：
# - 下载 .aab 文件
# - 在 Google Play Console 上传
```

**在 Google Play Console 中：**

1. **应用详情**
   - 应用名称
   - 简短描述（80 字符）
   - 详细描述（4000 字符）
   - 应用图标
   - 功能图片

2. **商店展示**
   - 上传截图（手机和平板）
   - 宣传图（可选）
   - 视频（可选）

3. **内容分级**
   - 填写问卷
   - 获得分级（所有人）

4. **目标受众和内容**
   - 目标年龄组：所有人
   - 商店展示：生产力

5. **选择国家/地区**
   - 选择所有国家或特定地区
   - 定价：免费

6. **发布到生产环境**
   - 选择构建版本
   - 提交审核
   - 等待审核（通常 2-7 天）

---

## 阶段 7️⃣：审核和发布

### 7.1 审核时间

**App Store（iOS）：**
- 平均审核时间：24-48 小时
- 可能被拒原因：
  - 隐私政策不完整
  - 功能不完整（崩溃）
  - 违反指南
  - 元数据问题

**Google Play（Android）：**
- 平均审核时间：2-7 天
- 首次提交可能更长

### 7.2 审核通过后

**App Store：**
- 手动发布 或 自动发布（可配置）
- 发布后 1-2 小时全球可见

**Google Play：**
- 分阶段发布（推荐）
  - 先 20% 用户
  - 观察 24 小时无问题
  - 逐步增加到 100%
- 或立即发布到所有用户

---

## 阶段 8️⃣：版本更新

### 8.1 更新版本号

**语义化版本（Semantic Versioning）：**
- `1.0.0` → `1.0.1` - 修复 bug
- `1.0.0` → `1.1.0` - 新增功能
- `1.0.0` → `2.0.0` - 重大更新

**更新文件：**
```bash
# 1. 更新 app.json
"version": "1.1.0"

# 2. 更新 package.json
"version": "1.1.0"

# 3. iOS/Android build number 自动递增（如果配置了 autoIncrement）
```

### 8.2 发布更新

**流程：**
```bash
# 1. 更新代码
git add .
git commit -m "feat: add new features for v1.1.0"
git tag v1.1.0
git push origin main --tags

# 2. 构建新版本
eas build --profile production --platform all

# 3. 提交到商店
eas submit --platform all --latest

# 4. 等待审核
# 5. 发布
```

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

### 提交失败

**iOS 常见拒绝原因：**
- 隐私政策不完整
- 崩溃或严重 bug
- 功能描述不准确
- 使用了私有 API

**Android 常见问题：**
- 目标 API 级别过低
- 权限说明不清楚
- 内容分级不正确

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

### 4. 发布节奏
- ✅ 小步快跑：频繁的小更新
- ✅ Bug 修复：1-2 周发布一次
- ✅ 新功能：1 个月发布一次
- ✅ 重大更新：季度发布

---

## 时间估算

| 阶段 | 时间 |
|------|------|
| 配置 EAS Build | 10-15 分钟（首次） |
| Development Build | 10-15 分钟 |
| Preview Build | 10-15 分钟 |
| Production Build | 15-20 分钟 |
| TestFlight 处理 | 5-10 分钟 |
| 准备商店材料 | 1-2 小时 |
| App Store 审核 | 1-2 天 |
| Google Play 审核 | 2-7 天 |

**首次完整上架：** 约 3-10 天
**更新发布：** 约 1-7 天

---

## 检查清单模板

### 上架前总检查清单

**代码质量：**
- [ ] TypeScript 编译通过
- [ ] 无 console.log
- [ ] 无 TODO/FIXME
- [ ] 代码已提交并打 tag

**功能测试：**
- [ ] 所有核心功能正常
- [ ] 真机测试通过
- [ ] 通知功能正常
- [ ] 数据持久化正常
- [ ] 多语言切换正常

**配置检查：**
- [ ] 版本号已更新
- [ ] Bundle ID / Package Name 正确
- [ ] 图标和启动页完整
- [ ] eas.json 配置正确

**商店材料：**
- [ ] 截图准备完毕（各尺寸）
- [ ] 描述文字撰写完成
- [ ] 隐私政策 URL 可访问
- [ ] 关键词优化

**提交：**
- [ ] iOS 构建并提交
- [ ] Android 构建并提交
- [ ] 填写商店信息
- [ ] 提交审核

---

## 有用的资源

### 官方文档
- EAS Build: https://docs.expo.dev/build/introduction/
- EAS Submit: https://docs.expo.dev/submit/introduction/
- App Store 审核指南: https://developer.apple.com/app-store/review/guidelines/
- Google Play 政策: https://play.google.com/console/about/guides/

### 工具
- App Store Connect: https://appstoreconnect.apple.com/
- Google Play Console: https://play.google.com/console/
- EAS Dashboard: https://expo.dev/accounts/[your-account]/projects

---

# English Version

## 📋 Process Overview

```
Development → Development Build → Preview Build → Production Build → Release
     ↓              ↓                  ↓                 ↓              ↓
 Expo Go      Device Testing      Beta Testing      Final Build    Store Review
```

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

**Configuration (eas.json):**
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

**Use Case:** Test full features, debug native modules

---

## Stage 3️⃣: Preview Build

### 3.1 What is Preview Build?

Internal testing build close to production:
- ✅ Debug tools removed
- ✅ Performance close to production
- ✅ Can distribute to testers
- ⚠️ Cannot submit to stores

### 3.2 Create Preview Build

**Configuration (eas.json):**
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

**Use Case:** Internal testing, UAT, Beta testing

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

**Version Management:**
```bash
# Update version (manually edit)
# app.json
"version": "1.0.0"  # User-visible version

# iOS Build Number (auto-increment)
"buildNumber": "1"

# Android Version Code (auto-increment)
"versionCode": 1
```

### 4.2 Configure Production Profile

**eas.json Configuration:**
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
        "buildType": "aab"
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

### 4.3 Build Production Version

**Complete Build Process:**

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

**Single Platform:**
```bash
# iOS only
eas build --profile production --platform ios

# Android only
eas build --profile production --platform android
```

### 4.4 Download Build Artifacts

**After build completes:**
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
#    - Fill testing info
#    - Start testing
```

**Method 2: Direct Install (Developer Devices)**
- Download .ipa file
- Install via Xcode or Apple Configurator

### 5.2 Android Device Testing

**Method 1: Google Play Internal Testing (Recommended)**

```bash
# 1. Submit to Google Play
eas submit --platform android --latest

# 2. In Google Play Console:
#    - Select Internal Testing
#    - Upload .aab file
#    - Create test group
#    - Distribute test link
```

**Method 2: Direct APK Install**
```bash
# Download .apk file
# Install directly
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

**Edge Cases:**
- [ ] Background/foreground switching
- [ ] Offline functionality
- [ ] Low battery mode
- [ ] System time changes

---

## Stage 6️⃣: Submit to App Stores

### 6.1 Prepare Store Assets

**Required Assets:**

**Icons & Screenshots:**
- [ ] App Icon (1024x1024 PNG)
- [ ] iPhone Screenshots (at least 2)
  - 6.7" (iPhone 15 Pro Max): 1290 x 2796
  - 6.5" (iPhone 14 Plus): 1284 x 2778
  - 5.5" (iPhone 8 Plus): 1242 x 2208
- [ ] iPad Screenshots (optional)
- [ ] Android Screenshots
  - Phone: at least 2
  - Tablet: optional

**Text Materials:**
- [ ] App Name (max 30 characters)
- [ ] Subtitle (max 30 characters, iOS)
- [ ] Short Description (80 characters, Android)
- [ ] Full Description (max 4000 characters)
- [ ] Keywords (100 characters, comma-separated)
- [ ] Privacy Policy URL (required)
- [ ] Support URL (optional)

**Sample Description (English):**
```
Pomodoro Timer - Simple & Elegant

A clean and focused Pomodoro timer to boost your productivity.

FEATURES:
• Classic Pomodoro Technique (25/5/15 min)
• Real-time statistics and progress tracking
• Smart notifications when sessions end
• Customizable work and break durations
• Dark mode support
• Auto-start next session
• Complete offline functionality
• Your data stays on your device

PERFECT FOR:
• Students studying for exams
• Developers and designers
• Anyone who needs focused work time

Simple. Focused. Efficient.
```

### 6.2 Submit to App Store (iOS)

**Steps:**

```bash
# 1. Build Production version
eas build --profile production --platform ios

# 2. Auto-submit to App Store Connect
eas submit --platform ios --latest

# Or manual:
# - Download .ipa file
# - Upload via Transporter or Xcode
```

**In App Store Connect:**

1. **App Information**
   - Name, subtitle, category (Productivity)
   - Privacy Policy URL
   - Support URL

2. **Pricing & Availability**
   - Select Free
   - Select regions (worldwide or specific)

3. **Prepare for Submission**
   - Upload screenshots (different iPhone sizes)
   - Fill description and keywords
   - Select build version
   - Copyright info
   - Age rating (4+)

4. **App Privacy**
   - Data types: None (all data stored locally)
   - Privacy practices description

5. **Submit for Review**
   - Review all information
   - Click "Submit for Review"
   - Wait for review (usually 24-48 hours)

### 6.3 Submit to Google Play (Android)

**Steps:**

```bash
# 1. Build Production version (AAB format)
eas build --profile production --platform android

# 2. Auto-submit to Google Play
eas submit --platform android --latest

# Or manual:
# - Download .aab file
# - Upload in Google Play Console
```

**In Google Play Console:**

1. **App Details**
   - App name
   - Short description (80 chars)
   - Full description (4000 chars)
   - App icon
   - Feature graphic

2. **Store Listing**
   - Upload screenshots (phone & tablet)
   - Promo graphic (optional)
   - Video (optional)

3. **Content Rating**
   - Complete questionnaire
   - Get rating (Everyone)

4. **Target Audience & Content**
   - Target age: Everyone
   - Store category: Productivity

5. **Select Countries/Regions**
   - All countries or specific regions
   - Pricing: Free

6. **Release to Production**
   - Select build version
   - Submit for review
   - Wait for review (usually 2-7 days)

---

## Stage 7️⃣: Review & Release

### 7.1 Review Time

**App Store (iOS):**
- Average: 24-48 hours
- Possible rejection reasons:
  - Incomplete privacy policy
  - Incomplete features (crashes)
  - Guideline violations
  - Metadata issues

**Google Play (Android):**
- Average: 2-7 days
- First submission may take longer

### 7.2 After Approval

**App Store:**
- Manual release or Auto-release (configurable)
- Available worldwide 1-2 hours after release

**Google Play:**
- Staged rollout (recommended)
  - Start with 20% users
  - Monitor for 24 hours
  - Gradually increase to 100%
- Or immediate release to all users

---

## Stage 8️⃣: Version Updates

### 8.1 Update Version Number

**Semantic Versioning:**
- `1.0.0` → `1.0.1` - Bug fixes
- `1.0.0` → `1.1.0` - New features
- `1.0.0` → `2.0.0` - Major changes

**Update Files:**
```bash
# 1. Update app.json
"version": "1.1.0"

# 2. Update package.json
"version": "1.1.0"

# 3. iOS/Android build numbers auto-increment (if configured)
```

### 8.2 Release Update

**Process:**
```bash
# 1. Update code
git add .
git commit -m "feat: add new features for v1.1.0"
git tag v1.1.0
git push origin main --tags

# 2. Build new version
eas build --profile production --platform all

# 3. Submit to stores
eas submit --platform all --latest

# 4. Wait for review
# 5. Release
```

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

# iOS only
eas build --profile production --platform ios

# Android only
eas build --profile production --platform android
```

### Submit Commands
```bash
# Auto-submit latest build
eas submit --platform ios --latest
eas submit --platform android --latest

# Submit all platforms
eas submit --platform all --latest
```

### View & Manage
```bash
# View build history
eas build:list

# View build details
eas build:view [BUILD_ID]

# Download build files
eas build:download --platform ios
eas build:download --platform android

# Cancel ongoing build
eas build:cancel
```

---

## Troubleshooting

### Build Failures

**Common Issues:**

1. **Certificate Issues (iOS)**
   ```bash
   # Clear credentials
   eas credentials
   # Select Remove credentials
   # Rebuild
   ```

2. **Dependency Issues**
   ```bash
   # Clean and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Configuration Errors**
   ```bash
   # Verify configs
   cat eas.json
   cat app.json
   ```

### Submission Failures

**iOS Common Rejections:**
- Incomplete privacy policy
- Crashes or critical bugs
- Inaccurate feature descriptions
- Using private APIs

**Android Common Issues:**
- Target API level too low
- Unclear permission descriptions
- Incorrect content rating

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

### 4. Release Cadence
- ✅ Small steps: Frequent small updates
- ✅ Bug fixes: Every 1-2 weeks
- ✅ New features: Monthly
- ✅ Major updates: Quarterly

---

## Time Estimates

| Stage | Time |
|-------|------|
| Configure EAS Build | 10-15 min (first time) |
| Development Build | 10-15 min |
| Preview Build | 10-15 min |
| Production Build | 15-20 min |
| TestFlight Processing | 5-10 min |
| Prepare Store Assets | 1-2 hours |
| App Store Review | 1-2 days |
| Google Play Review | 2-7 days |

**First Release:** ~3-10 days
**Update Release:** ~1-7 days

---

## Pre-Release Checklist Template

### Complete Pre-Release Checklist

**Code Quality:**
- [ ] TypeScript compiles
- [ ] No console.log statements
- [ ] No TODO/FIXME comments
- [ ] Code committed and tagged

**Functional Testing:**
- [ ] All core features work
- [ ] Device testing passed
- [ ] Notifications working
- [ ] Data persistence working
- [ ] Language switching working

**Configuration:**
- [ ] Version number updated
- [ ] Bundle ID / Package Name correct
- [ ] Icons and splash screens complete
- [ ] eas.json configured correctly

**Store Assets:**
- [ ] Screenshots ready (all sizes)
- [ ] Description written
- [ ] Privacy Policy URL accessible
- [ ] Keywords optimized

**Submission:**
- [ ] iOS built and submitted
- [ ] Android built and submitted
- [ ] Store info filled
- [ ] Submitted for review

---

## Useful Resources

### Official Documentation
- EAS Build: https://docs.expo.dev/build/introduction/
- EAS Submit: https://docs.expo.dev/submit/introduction/
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play Policies: https://play.google.com/console/about/guides/

### Tools
- App Store Connect: https://appstoreconnect.apple.com/
- Google Play Console: https://play.google.com/console/
- EAS Dashboard: https://expo.dev/accounts/[your-account]/projects

---

**准备好发布你的应用了吗？按照这个指南，一步步完成！** 🚀
