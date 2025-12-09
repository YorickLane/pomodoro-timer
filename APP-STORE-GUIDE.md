# 应用商店发布指南 - App Store Publishing Guide

[中文](#中文版本) | [English](#english-version)

---

## 中文版本

> **构建流程**请参考：[BUILD-AND-RELEASE.md](./BUILD-AND-RELEASE.md)

---

## 1️⃣ 开发者账号注册

### 1.1 Apple Developer Program（iOS 发布必需）

**费用：** $99 美元/年

**注册步骤：**

1. **准备材料**
   - Apple ID（建议使用专门的开发者账号）
   - 有效的信用卡或借记卡
   - 身份证明文件（护照或身份证）
   - 如果是公司账号：D-U-N-S 编号

2. **注册流程**
   ```
   1. 访问 https://developer.apple.com/programs/enroll/
   2. 点击 "Start Your Enrollment"
   3. 使用 Apple ID 登录
   4. 选择账号类型：
      - Individual（个人）- 适合独立开发者
      - Organization（组织）- 适合公司/团队
   5. 填写个人/公司信息
   6. 同意协议并支付年费
   7. 等待审核（通常 24-48 小时）
   ```

3. **审核通过后**
   - 登录 App Store Connect: https://appstoreconnect.apple.com/
   - 创建 App ID 和证书
   - 配置 EAS 提交凭证

**注意事项：**
- 个人账号：应用显示你的真实姓名
- 公司账号：需要 D-U-N-S 编号，审核时间更长
- 年费到期需续费，否则应用将下架

---

### 1.2 Google Play Console（Android 发布必需）

**费用：** $25 美元（一次性）

**注册步骤：**

1. **准备材料**
   - Google 账号
   - 有效的信用卡或借记卡
   - 身份证明（部分情况需要）

2. **注册流程**
   ```
   1. 访问 https://play.google.com/console/signup
   2. 使用 Google 账号登录
   3. 选择账号类型：
      - 个人开发者
      - 组织/公司
   4. 填写开发者信息
   5. 同意开发者协议
   6. 支付 $25 注册费
   7. 完成身份验证（如果需要）
   ```

3. **注册完成后**
   - 登录 Google Play Console: https://play.google.com/console/
   - 创建应用
   - 配置服务账号（用于自动提交）

**配置服务账号（用于 EAS Submit）：**

```bash
# 1. 在 Google Cloud Console 创建服务账号
#    https://console.cloud.google.com/

# 2. 下载服务账号 JSON 密钥文件

# 3. 在 Google Play Console 中授权服务账号
#    设置 → API 访问 → 添加服务账号

# 4. 将密钥文件放在项目目录
#    例如：./google-service-account.json

# 5. 在 eas.json 中配置
"android": {
  "serviceAccountKeyPath": "./google-service-account.json"
}
```

**注意事项：**
- 注册费一次性，终身有效
- 首次发布应用需要更长审核时间
- 需要完成开发者验证（2024年新要求）

---

### 1.3 Expo 账号（EAS Build/Submit 必需）

**费用：** 免费（付费计划可选）

**注册步骤：**

```bash
# 1. 访问 https://expo.dev/signup 注册

# 2. 或通过命令行注册
npx expo register

# 3. 登录
eas login
```

**免费计划限制：**
- 每月 30 次构建
- 队列优先级较低

**付费计划（可选）：**
- Production: $99/月 - 无限构建
- Enterprise: 联系销售

---

## 2️⃣ 商店材料准备

### 2.1 应用图标

**规格要求：**

| 平台 | 尺寸 | 格式 | 说明 |
|------|------|------|------|
| iOS | 1024x1024 | PNG | 不能有透明度、圆角 |
| Android | 512x512 | PNG | 可以有透明度 |

**生成图标：**
```bash
# 使用项目中的图标生成脚本
node scripts/generate-icons.js

# 或使用在线工具
# https://appicon.co/
# https://makeappicon.com/
```

---

### 2.2 应用截图

**iOS 截图尺寸（必需）：**

| 设备 | 尺寸（像素） | 说明 |
|------|-------------|------|
| 6.7" (iPhone 15 Pro Max) | 1290 x 2796 | 必需 |
| 6.5" (iPhone 14 Plus) | 1284 x 2778 | 必需 |
| 5.5" (iPhone 8 Plus) | 1242 x 2208 | 可选 |
| iPad Pro 12.9" | 2048 x 2732 | 如果支持 iPad |

**Android 截图尺寸：**

| 类型 | 尺寸 | 说明 |
|------|------|------|
| 手机 | 至少 320px，最大 3840px | 至少 2 张 |
| 平板 7" | 至少 320px | 可选 |
| 平板 10" | 至少 320px | 可选 |

**截图最佳实践：**
- 展示核心功能（计时器、统计、设置）
- 使用真实数据，不要空白页面
- 考虑添加文字说明（可选）
- 保持风格一致

**截图工具推荐：**
- Simulator（iOS 模拟器自带截图）
- Android Studio Emulator
- 截图美化：https://screenshots.pro/

---

### 2.3 应用描述

**App Store（iOS）：**

| 字段 | 限制 | 说明 |
|------|------|------|
| 应用名称 | 30 字符 | 简洁有力 |
| 副标题 | 30 字符 | 补充说明 |
| 关键词 | 100 字符 | 逗号分隔 |
| 描述 | 4000 字符 | 详细功能介绍 |
| 更新说明 | 4000 字符 | 版本更新内容 |

**Google Play（Android）：**

| 字段 | 限制 | 说明 |
|------|------|------|
| 应用名称 | 30 字符 | 简洁有力 |
| 简短描述 | 80 字符 | 一句话介绍 |
| 详细描述 | 4000 字符 | 详细功能介绍 |

**示例描述（中文）：**

```
番茄时钟 - 简约专注计时器

一款简洁优雅的番茄工作法计时器，帮助你保持专注，提高效率。

【核心功能】
• 经典番茄工作法（25分钟工作 + 5分钟休息）
• 实时统计和进度追踪
• 智能通知提醒
• 自定义时长设置
• 深色模式支持
• 自动开始下一个番茄
• 完全离线可用
• 数据本地存储，保护隐私

【适合人群】
• 备考学生
• 程序员和设计师
• 需要专注工作的职场人士
• 任何想要提高效率的人

简单。专注。高效。
```

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

---

### 2.4 隐私政策

**为什么需要：**
- App Store 和 Google Play 都要求提供隐私政策 URL
- 即使不收集任何数据也需要声明

**内容要点：**
1. 收集哪些数据（如果有）
2. 如何使用数据
3. 是否与第三方共享
4. 数据存储位置
5. 用户权利（删除、导出等）
6. 联系方式

**托管方式：**
- GitHub Pages（免费）
- 自己的网站
- 第三方服务（如 Termly、iubenda）

**示例隐私政策模板：**

```markdown
# 隐私政策 / Privacy Policy

最后更新：2024年1月1日

## 数据收集

番茄时钟应用不收集任何个人信息。所有数据（包括计时记录和设置）
都存储在您的设备本地，不会上传到任何服务器。

## 第三方服务

本应用不使用任何第三方分析或广告服务。

## 数据安全

您的数据仅存储在您的设备上。卸载应用将删除所有数据。

## 联系我们

如有问题，请联系：your-email@example.com
```

---

### 2.5 其他材料

**功能图片（Google Play）：**
- 尺寸：1024 x 500 像素
- 用于商店展示顶部

**视频预览（可选）：**
- iOS：15-30 秒，展示核心功能
- Android：可以添加 YouTube 视频链接

**类别选择：**
- iOS：生产力（Productivity）
- Android：工具 > 生产力

**年龄分级：**
- iOS：4+（无限制内容）
- Android：所有人（Everyone）

---

## 3️⃣ 提交到应用商店

### 3.1 提交到 App Store（iOS）

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

**在 App Store Connect 中配置：**

1. **创建新应用**
   - 登录 https://appstoreconnect.apple.com/
   - 点击 "+" → "新建 App"
   - 填写：名称、主要语言、Bundle ID、SKU

2. **App 信息**
   - 名称和副标题
   - 类别：生产力
   - 隐私政策 URL
   - 支持 URL（可选）

3. **定价和可用性**
   - 选择免费
   - 选择地区（全球或特定地区）

4. **版本信息**
   - 上传截图（按尺寸分组）
   - 填写描述和关键词
   - 选择构建版本
   - 版权信息（© 2024 Your Name）
   - 年龄分级：4+

5. **App 隐私**
   - 数据类型：无（所有数据本地存储）
   - 或如实填写收集的数据类型

6. **提交审核**
   - 检查所有信息
   - 点击"提交以供审核"

---

### 3.2 提交到 Google Play（Android）

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

**在 Google Play Console 中配置：**

1. **创建应用**
   - 登录 https://play.google.com/console/
   - 点击"创建应用"
   - 填写：名称、默认语言、应用类型、免费/付费

2. **商店设置**
   - **主要商店详情**
     - 应用名称
     - 简短描述（80 字符）
     - 详细描述（4000 字符）
   - **图形素材**
     - 应用图标（512x512）
     - 功能图片（1024x500）
     - 手机截图（至少 2 张）

3. **应用内容**
   - **隐私政策**：填写 URL
   - **应用访问权限**：选择"所有功能无限制"
   - **广告**：选择"否"
   - **内容分级**：填写问卷，获得"所有人"分级
   - **目标受众**：选择年龄组
   - **新闻应用**：选择"否"
   - **新冠相关应用**：选择"否"
   - **数据安全**：填写数据收集声明

4. **发布设置**
   - **选择国家/地区**
   - **托管应用签名**（推荐使用 Google Play App Signing）

5. **版本发布**
   - 进入"生产" → "创建新版本"
   - 上传 .aab 文件
   - 填写版本说明
   - 审核并发布

---

## 4️⃣ 审核流程

### 4.1 App Store 审核

**审核时间：** 24-48 小时（首次可能更长）

**常见拒绝原因及解决方案：**

| 原因 | 解决方案 |
|------|----------|
| 隐私政策不完整 | 确保隐私政策 URL 可访问，内容完整 |
| 崩溃或严重 bug | 充分测试后再提交 |
| 功能描述不准确 | 确保描述与实际功能匹配 |
| 使用私有 API | 检查代码，移除不允许的 API 调用 |
| 元数据问题 | 检查截图、描述是否符合规范 |
| 最低功能要求 | 确保应用有足够的功能和价值 |

**申诉流程：**
1. 收到拒绝通知后，查看详细原因
2. 在 App Store Connect 中回复审核团队
3. 解决问题后重新提交

---

### 4.2 Google Play 审核

**审核时间：** 2-7 天（首次可能更长）

**常见拒绝原因及解决方案：**

| 原因 | 解决方案 |
|------|----------|
| 目标 API 级别过低 | 更新 targetSdkVersion |
| 权限说明不清楚 | 在描述中说明为什么需要某些权限 |
| 内容分级不正确 | 重新填写分级问卷 |
| 数据安全声明不完整 | 完善数据收集声明 |
| 违反政策 | 检查是否有违规内容或行为 |

---

## 5️⃣ 发布和更新

### 5.1 发布选项

**App Store：**
- **手动发布**：审核通过后手动点击发布
- **自动发布**：审核通过后自动发布
- **定时发布**：指定日期时间发布

**Google Play：**
- **立即发布**：审核通过后立即发布给所有用户
- **分阶段发布**（推荐）：
  - 先发布给 20% 用户
  - 观察 24-48 小时
  - 逐步增加到 100%

---

### 5.2 版本更新

**语义化版本号：**
- `1.0.0` → `1.0.1` - Bug 修复
- `1.0.0` → `1.1.0` - 新功能
- `1.0.0` → `2.0.0` - 重大更新

**更新流程：**

```bash
# 1. 更新版本号
# 编辑 app.json 和 package.json

# 2. 提交代码
git add .
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags

# 3. 构建新版本
eas build --profile production --platform all

# 4. 提交到商店
eas submit --platform all --latest

# 5. 填写更新说明
# 6. 提交审核
```

**更新说明示例：**

```
版本 1.1.0 更新内容：

新功能：
• 添加每日目标设置
• 新增周统计视图

改进：
• 优化计时器精度
• 改进深色模式显示

修复：
• 修复通知偶尔不显示的问题
• 修复统计数据不准确的问题
```

---

## 6️⃣ 上架检查清单

### 账号准备
- [ ] Apple Developer Program 已注册并激活
- [ ] Google Play Console 已注册并验证
- [ ] Expo 账号已登录

### 商店材料
- [ ] 应用图标（1024x1024 PNG）
- [ ] iPhone 截图（6.7" 和 6.5" 至少各 2 张）
- [ ] Android 截图（至少 2 张）
- [ ] 应用名称（中英文）
- [ ] 简短描述（80 字符）
- [ ] 详细描述（中英文）
- [ ] 关键词（100 字符）
- [ ] 隐私政策 URL 可访问
- [ ] 支持邮箱/网站

### 提交前检查
- [ ] 版本号已更新
- [ ] 所有功能正常
- [ ] 无 console.log 输出
- [ ] TypeScript 编译通过
- [ ] 真机测试通过

### 提交
- [ ] iOS Production Build 完成
- [ ] Android Production Build 完成
- [ ] iOS 已提交到 App Store Connect
- [ ] Android 已提交到 Google Play Console
- [ ] 商店信息填写完整
- [ ] 已提交审核

---

## 有用资源

### 官方文档
- App Store 审核指南: https://developer.apple.com/app-store/review/guidelines/
- Google Play 政策中心: https://play.google.com/console/about/guides/
- EAS Submit: https://docs.expo.dev/submit/introduction/

### 工具链接
- App Store Connect: https://appstoreconnect.apple.com/
- Google Play Console: https://play.google.com/console/
- Apple Developer: https://developer.apple.com/
- Google Cloud Console: https://console.cloud.google.com/

### 隐私政策生成器
- Termly: https://termly.io/
- iubenda: https://www.iubenda.com/
- PrivacyPolicies.com: https://www.privacypolicies.com/

---

# English Version

> **Build process** - see: [BUILD-AND-RELEASE.md](./BUILD-AND-RELEASE.md)

---

## 1️⃣ Developer Account Registration

### 1.1 Apple Developer Program (Required for iOS)

**Cost:** $99 USD/year

**Registration Steps:**

1. **Prepare Materials**
   - Apple ID (recommend dedicated developer account)
   - Valid credit/debit card
   - Identity documents (passport or ID)
   - For organizations: D-U-N-S number

2. **Registration Process**
   ```
   1. Visit https://developer.apple.com/programs/enroll/
   2. Click "Start Your Enrollment"
   3. Sign in with Apple ID
   4. Choose account type:
      - Individual - for independent developers
      - Organization - for companies/teams
   5. Fill in personal/company information
   6. Agree to terms and pay annual fee
   7. Wait for approval (usually 24-48 hours)
   ```

3. **After Approval**
   - Login to App Store Connect: https://appstoreconnect.apple.com/
   - Create App ID and certificates
   - Configure EAS submission credentials

---

### 1.2 Google Play Console (Required for Android)

**Cost:** $25 USD (one-time)

**Registration Steps:**

1. **Prepare Materials**
   - Google account
   - Valid credit/debit card
   - Identity verification (in some cases)

2. **Registration Process**
   ```
   1. Visit https://play.google.com/console/signup
   2. Sign in with Google account
   3. Choose account type:
      - Personal developer
      - Organization/Company
   4. Fill in developer information
   5. Agree to developer agreement
   6. Pay $25 registration fee
   7. Complete identity verification (if required)
   ```

3. **After Registration**
   - Login to Google Play Console
   - Create app
   - Configure service account (for automated submission)

**Configure Service Account (for EAS Submit):**

```bash
# 1. Create service account in Google Cloud Console
#    https://console.cloud.google.com/

# 2. Download service account JSON key file

# 3. Grant service account access in Google Play Console
#    Settings → API access → Add service account

# 4. Place key file in project directory
#    e.g., ./google-service-account.json

# 5. Configure in eas.json
"android": {
  "serviceAccountKeyPath": "./google-service-account.json"
}
```

---

### 1.3 Expo Account (Required for EAS Build/Submit)

**Cost:** Free (paid plans available)

**Registration:**

```bash
# 1. Visit https://expo.dev/signup to register

# 2. Or register via CLI
npx expo register

# 3. Login
eas login
```

---

## 2️⃣ Store Assets Preparation

### 2.1 App Icon

| Platform | Size | Format | Notes |
|----------|------|--------|-------|
| iOS | 1024x1024 | PNG | No transparency, no rounded corners |
| Android | 512x512 | PNG | Transparency allowed |

---

### 2.2 Screenshots

**iOS Screenshot Sizes (Required):**

| Device | Size (pixels) | Required |
|--------|--------------|----------|
| 6.7" (iPhone 15 Pro Max) | 1290 x 2796 | Yes |
| 6.5" (iPhone 14 Plus) | 1284 x 2778 | Yes |
| 5.5" (iPhone 8 Plus) | 1242 x 2208 | Optional |

**Android Screenshots:**
- Phone: At least 2, min 320px, max 3840px
- Tablet: Optional

---

### 2.3 App Description

**App Store (iOS):**

| Field | Limit | Notes |
|-------|-------|-------|
| App Name | 30 chars | Concise |
| Subtitle | 30 chars | Supplementary |
| Keywords | 100 chars | Comma-separated |
| Description | 4000 chars | Feature details |

**Google Play (Android):**

| Field | Limit | Notes |
|-------|-------|-------|
| App Name | 30 chars | Concise |
| Short Description | 80 chars | One-liner |
| Full Description | 4000 chars | Feature details |

---

### 2.4 Privacy Policy

**Why Required:**
- Both App Store and Google Play require privacy policy URL
- Required even if you don't collect any data

**Hosting Options:**
- GitHub Pages (free)
- Your own website
- Third-party services (Termly, iubenda)

---

## 3️⃣ Submit to App Stores

### 3.1 Submit to App Store (iOS)

```bash
# 1. Build Production version
eas build --profile production --platform ios

# 2. Auto-submit to App Store Connect
eas submit --platform ios --latest
```

**In App Store Connect:**
1. Create new app
2. Fill app information
3. Set pricing (Free)
4. Upload screenshots
5. Fill description
6. Complete App Privacy
7. Submit for review

---

### 3.2 Submit to Google Play (Android)

```bash
# 1. Build Production version (AAB format)
eas build --profile production --platform android

# 2. Auto-submit to Google Play
eas submit --platform android --latest
```

**In Google Play Console:**
1. Create app
2. Complete store listing
3. Upload screenshots
4. Fill content rating questionnaire
5. Complete data safety section
6. Upload AAB and submit

---

## 4️⃣ Review Process

### 4.1 App Store Review

**Review Time:** 24-48 hours (first submission may take longer)

**Common Rejection Reasons:**
- Incomplete privacy policy
- Crashes or bugs
- Inaccurate description
- Private API usage
- Metadata issues

---

### 4.2 Google Play Review

**Review Time:** 2-7 days (first submission may take longer)

**Common Rejection Reasons:**
- Low target API level
- Unclear permission usage
- Incorrect content rating
- Incomplete data safety declaration

---

## 5️⃣ Release & Updates

### 5.1 Release Options

**App Store:**
- Manual release
- Auto-release after approval
- Scheduled release

**Google Play:**
- Immediate release
- Staged rollout (recommended)

---

### 5.2 Version Updates

**Semantic Versioning:**
- `1.0.0` → `1.0.1` - Bug fixes
- `1.0.0` → `1.1.0` - New features
- `1.0.0` → `2.0.0` - Major changes

**Update Process:**

```bash
# 1. Update version numbers in app.json and package.json

# 2. Commit and tag
git add .
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags

# 3. Build new version
eas build --profile production --platform all

# 4. Submit to stores
eas submit --platform all --latest

# 5. Fill release notes
# 6. Submit for review
```

---

## 6️⃣ Pre-Launch Checklist

### Account Setup
- [ ] Apple Developer Program registered and active
- [ ] Google Play Console registered and verified
- [ ] Expo account logged in

### Store Assets
- [ ] App icon (1024x1024 PNG)
- [ ] iPhone screenshots (6.7" and 6.5", at least 2 each)
- [ ] Android screenshots (at least 2)
- [ ] App name
- [ ] Short description (80 chars)
- [ ] Full description
- [ ] Keywords (100 chars)
- [ ] Privacy Policy URL accessible
- [ ] Support email/website

### Pre-Submit Checks
- [ ] Version number updated
- [ ] All features working
- [ ] No console.log output
- [ ] TypeScript compiles
- [ ] Device testing passed

### Submission
- [ ] iOS Production Build complete
- [ ] Android Production Build complete
- [ ] iOS submitted to App Store Connect
- [ ] Android submitted to Google Play Console
- [ ] Store information complete
- [ ] Submitted for review

---

## Useful Resources

### Official Documentation
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play Policy Center: https://play.google.com/console/about/guides/
- EAS Submit: https://docs.expo.dev/submit/introduction/

### Tools
- App Store Connect: https://appstoreconnect.apple.com/
- Google Play Console: https://play.google.com/console/
- Apple Developer: https://developer.apple.com/
- Google Cloud Console: https://console.cloud.google.com/

### Privacy Policy Generators
- Termly: https://termly.io/
- iubenda: https://www.iubenda.com/
