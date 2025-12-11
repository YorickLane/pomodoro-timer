# 应用商店发布指南 - App Store Publishing Guide

[中文](#中文版本) | [English](#english-version)

> 最后更新：2025年12月
>
> 信息来源：[Apple Developer](https://developer.apple.com/programs/)、[Google Play Console](https://support.google.com/googleplay/android-developer/)

---

## 中文版本

> **构建流程**请参考：[BUILD-AND-RELEASE.md](./BUILD-AND-RELEASE.md)

---

## 1️⃣ 开发者账号注册

### 1.1 Apple Developer Program（iOS 发布必需）

**费用：** $99 美元/年

**官方链接：** https://developer.apple.com/programs/enroll/

**注册步骤：**

1. **准备材料**
   - Apple ID（建议使用专门的开发者账号，需开启双重认证）
   - 有效的信用卡或借记卡
   - 法定姓名（Apple Account 中的姓名必须是真实姓名，不能使用别名或公司名）
   - 如果是公司账号：D-U-N-S 编号

2. **注册流程**
   ```
   1. 访问 https://developer.apple.com/programs/enroll/
   2. 点击 "Start Your Enrollment"
   3. 使用 Apple ID 登录
   4. 选择账号类型：
      - Individual（个人）- 适合独立开发者
      - Organization（组织）- 需要 D-U-N-S 编号
   5. 填写个人/公司信息
   6. 同意协议并支付年费
   7. 等待审核
   ```

3. **审核时间**
   - 个人账号：通常 24-48 小时
   - 组织账号：3-5 个工作日
   - 如需 D-U-N-S 编号或额外验证：7-10 天

4. **审核通过后（Expo/EAS 项目）**

   使用 EAS 可以**自动完成**证书和配置，无需手动操作：

   ```bash
   # 1. 确保已登录 EAS
   eas login

   # 2. 首次构建时，EAS 会自动引导配置
   eas build --platform ios
   ```

   **首次运行时按提示操作：**
   - 输入 Apple ID 和密码登录
   - 选择 **"Let EAS handle it"** 让 EAS 自动管理证书
   - EAS 会自动创建 App ID、Distribution Certificate、Provisioning Profile

   **手动查看/管理凭证：**
   ```bash
   eas credentials --platform ios
   ```

**会员权益：**
- App Store 发布权限
- TestFlight 内测分发
- 每月 25 小时 Xcode Cloud 计算时间
- 每个应用最高 1PB iCloud 存储

**注意事项：**
- 个人账号：应用显示你的真实姓名作为卖家名称
- 组织账号：需要 D-U-N-S 编号，必须有法律授权代表签约
- 年费到期需续费，否则应用将下架
- 可申请费用减免（非营利组织、教育机构、政府机构）

---

### 1.2 Google Play Console（Android 发布必需）

**费用：** $25 美元（一次性）

**官方链接：** https://play.google.com/console/signup

**注册步骤：**

1. **准备材料**
   - Google 账号
   - 有效的信用卡或借记卡（不接受预付卡）
   - 政府签发的身份证明文件
   - 联系电话和邮箱
   - 如果是组织账号：D-U-N-S 编号

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
   7. 完成身份验证
   ```

3. **身份验证要求（2024年起强制）**

   **个人账号需要提供：**
   - 政府签发的身份证明
   - 联系电话（供 Google 联系）
   - 开发者邮箱（供用户联系）
   - Android 设备验证（通过 Play Console 移动应用）

   **组织账号需要提供：**
   - 组织法定名称和地址
   - D-U-N-S 编号（9位唯一标识）
   - 组织验证文件
   - 联系电话和邮箱

4. **处理时间**
   - 注册处理：最多 5 天
   - 首次发布应用审核可能更长

5. **注册完成后**
   - 登录 Google Play Console: https://play.google.com/console/
   - 创建应用
   - 配置服务账号（用于自动提交）

**配置服务账号（用于 EAS Submit）：**

```bash
# 1. 在 Google Cloud Console 创建服务账号
#    https://console.cloud.google.com/

# 2. 创建 JSON 密钥文件并下载

# 3. 在 Google Play Console 中授权服务账号
#    设置 → API 访问 → 关联项目 → 添加服务账号

# 4. 将密钥文件放在项目目录（添加到 .gitignore）
#    例如：./google-service-account.json

# 5. 在 eas.json 中配置
"android": {
  "serviceAccountKeyPath": "./google-service-account.json"
}
```

**服务费用（付费应用/内购）：**
- 前 $100万/年：15% 服务费
- 超过 $100万：30% 服务费
- 订阅类应用：首日起 15%

**注意事项：**
- 注册费一次性，终身有效
- 2024年起所有开发者必须完成身份验证
- 未完成验证的账号和应用可能被移除
- 2026年起将要求所有 Android 应用开发者验证身份（包括非 Play 商店分发）

---

### 1.3 Expo 账号（EAS Build/Submit 必需）

**费用：** 免费（付费计划可选）

**官方链接：** https://expo.dev/signup

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
- Production: $99/月 - 无限构建，优先队列
- Enterprise: 联系销售

---

## 2️⃣ 商店材料准备

### 2.1 应用图标

| 平台 | 尺寸 | 格式 | 最大文件大小 | 说明 |
|------|------|------|-------------|------|
| iOS | 1024x1024 | PNG | - | 不能有透明度、不能有圆角（系统自动处理） |
| Android | 512x512 | PNG (32位，带 alpha) | 1024 KB | 提供完整正方形，系统自动应用圆角遮罩 |

**Android 图标设计规范：**
- 不要在图标中包含排名、价格、分类等误导性徽章或文字
- 图标应是启动器图标的高保真版本
- 可以有透明区域用于阴影等效果

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

#### iOS 截图尺寸（2024年9月更新）

> **重要变化：** Apple 简化了截图要求，现在只需提供一个主要尺寸，其他尺寸会自动缩放。

| 设备 | 屏幕尺寸 | 像素（竖屏） | 像素（横屏） | 状态 |
|------|---------|-------------|-------------|------|
| iPhone 16 Pro Max, 15 Pro Max, 15 Plus 等 | 6.9" | 1320 x 2868 | 2868 x 1320 | **必需**（或提供 6.5"） |
| iPhone 14 Plus, 13 Pro Max, 12 Pro Max 等 | 6.5" | 1284 x 2778 | 2778 x 1284 | 如未提供 6.9" 则必需 |
| iPhone 16 Pro, 16, 15 Pro, 15, 14 Pro | 6.3" | 1179 x 2556 | 2556 x 1179 | 可选（自动从 6.5" 缩放） |
| iPhone 14, 13 Pro, 13, 12 Pro, 12 等 | 6.1" | 1170 x 2532 | 2532 x 1170 | 可选（自动从 6.5" 缩放） |
| iPhone 8 Plus, 7 Plus, 6S Plus | 5.5" | 1242 x 2208 | 2208 x 1242 | 可选（自动从 6.1" 缩放） |

**iOS 截图要求：**
- 格式：.jpeg、.jpg 或 .png
- 数量：1-10 张
- 分辨率：72 dpi，RGB，无透明度
- **建议：提供 6.9" 尺寸截图，其他尺寸自动生成**

#### Android 截图尺寸

| 类型 | 尺寸要求 | 数量 | 说明 |
|------|---------|------|------|
| 手机 | 最小 1080px 宽，9:16 或 16:9 | 2-8 张 | **必需** |
| 7" 平板 | 最小 1200 x 1920 (竖屏) | 最多 8 张 | 可选 |
| 10" 平板 | 最小 1600 x 2560 (竖屏) | 最多 8 张 | 可选 |
| Wear OS | 384 x 384 (1:1) | 至少 1 张 | 仅手表应用需要 |

**Android 截图要求：**
- 格式：JPEG 或 24位 PNG（无 alpha）
- 最大文件大小：8 MB/张
- 长边不能超过短边的 2 倍
- 截图应展示真实 UI，不要使用误导性视觉效果
- 文字不应超过截图面积的 20%
- 避免使用"最佳"、"第一"、"新"、"免费"等促销词汇

**截图最佳实践：**
- 展示核心功能（计时器、统计、设置）
- 使用真实数据，不要空白页面
- 保持风格一致
- 反映应用最新状态

---

### 2.3 功能图片（Google Play 必需）

| 规格 | 值 |
|------|-----|
| 尺寸 | 1024 x 500 像素 |
| 格式 | JPEG 或 24位 PNG（无 alpha） |
| 最大文件大小 | 1 MB |

**设计要点：**
- 避免在边缘放置重要元素（会被裁切）
- 不要重复使用应用图标的品牌元素
- 不要包含排名、奖项、用户评价、价格等信息
- 用作视频预览的封面和广告

---

### 2.4 应用描述

**App Store（iOS）：**

| 字段 | 限制 | 说明 |
|------|------|------|
| 应用名称 | 30 字符 | 简洁有力 |
| 副标题 | 30 字符 | 补充说明 |
| 关键词 | 100 字符 | 逗号分隔，用于搜索 |
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

### 2.5 隐私政策

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
- 第三方服务：[Termly](https://termly.io/)、[iubenda](https://www.iubenda.com/)

**示例隐私政策模板：**

```markdown
# 隐私政策 / Privacy Policy

最后更新：2025年1月1日

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

### 2.6 其他材料

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

## 2.7 iOS 完整发布流程（Expo/EAS）

> 以下是 Apple Developer 审核通过后，使用 Expo/EAS 发布 iOS 应用的完整流程。

### 步骤 1：EAS 登录和项目关联

```bash
# 登录 EAS（如已登录会提示）
eas login

# 查看当前登录账号
eas whoami

# 如需切换账号，先登出
eas logout
eas login
```

**首次使用或切换账号时，关联项目：**
```bash
# 初始化/关联项目到当前 EAS 账号
eas init

# 如果项目已关联其他账号，需要强制重新初始化
# 先删除 app.json 中的 extra.eas.projectId，然后运行：
eas init
```

关联成功后，`app.json` 会自动添加：
```json
{
  "extra": {
    "eas": {
      "projectId": "your-project-id"
    },
    "owner": "your-eas-username"
  }
}
```

---

### 步骤 2：首次构建 iOS 应用

```bash
eas build --platform ios
```

**构建过程中的交互提示：**

1. **Bundle Identifier 设置**
   ```
   ✔ What would you like your iOS bundle identifier to be?
   → 输入如：com.yourname.appname
   ```

2. **加密声明**
   ```
   ✔ iOS app only uses standard/exempt encryption?
   → 选择 yes（大多数应用选 yes，除非使用了自定义加密）
   ```

3. **Apple ID 登录**
   ```
   ✔ Do you want to log in to your Apple account?
   → 选择 yes
   ✔ Apple ID: → 输入你的 Apple ID
   ✔ Password: → 输入密码
   ```

4. **双重认证**
   ```
   ✔ Please enter the 6 digit code you received at +86 ••• •••• ••XX:
   → 输入手机收到的验证码
   ```

5. **证书生成**
   ```
   ✔ Generate a new Apple Distribution Certificate? → yes
   ✔ Generate a new Apple Provisioning Profile? → yes
   ```

6. **推送通知配置**
   ```
   ✔ Would you like to set up Push Notifications for your project?
   → 选择 Yes（如果应用需要推送通知）
   ✔ Generate a new Apple Push Notifications service key? → yes
   ```

**构建完成后输出：**
```
✔ Build finished

🍏 iOS app:
https://expo.dev/artifacts/eas/xxxxx.ipa
```

---

### 步骤 3：提交到 App Store Connect

```bash
# 提交最新构建到 App Store Connect
eas submit --platform ios --latest
```

**首次提交时的交互提示：**
```
✔ What is your Apple Team ID?
→ 系统会自动检测，直接回车确认

✔ Would you like to submit build to App Store Connect?
→ 选择 yes
```

提交成功后，构建会出现在 App Store Connect 的 TestFlight 中。

---

### 步骤 4：App Store Connect 配置

登录 https://appstoreconnect.apple.com/

#### 4.1 创建新应用（首次发布）

1. 点击 **"+"** → **"新建 App"**
2. 填写信息：
   - **平台**：iOS
   - **名称**：应用显示名称（如：番茄时钟）
   - **主要语言**：简体中文 或 English
   - **Bundle ID**：选择 `com.yourname.appname`
   - **SKU**：唯一标识符（如：pomodoro-timer-001）
   - **用户访问权限**：完全访问权限

#### 4.2 填写应用信息

**App 信息页面：**
- **名称**：应用名称
- **副标题**：简短描述（30 字符内）
- **类别**：生产力
- **内容版权**：否
- **年龄分级**：点击设置 → 全部选"无" → 获得 4+ 分级

**定价和可用性：**
- **价格**：免费
- **可用性**：选择发布地区

**隐私政策：**
- 填写隐私政策 URL（必填）

#### 4.3 准备提交版本

在 **iOS App** 页面：

1. **截图上传**
   - 6.9" 显示屏（iPhone 15 Pro Max）：至少 2 张
   - 或 6.5" 显示屏：至少 2 张
   - 尺寸：1320 x 2868 (6.9") 或 1284 x 2778 (6.5")

2. **应用描述**
   - 宣传文本（可选，170 字符）
   - 描述（必填，4000 字符内）
   - 关键词（100 字符，逗号分隔）
   - 支持 URL
   - 营销 URL（可选）

3. **构建版本**
   - 点击 **"+"** 选择已上传的构建
   - 如未显示，等待几分钟处理

4. **App 审核信息**
   - 登录信息：如无需登录选"不需要登录"
   - 联系信息：填写审核联系人信息
   - 备注（可选）

#### 4.4 App 隐私

在 **App 隐私** 页面：
- 如果应用不收集任何数据，选择 **"不收集数据"**
- 如果收集数据，如实填写数据类型

---

### 步骤 5：提交审核

1. 检查所有信息填写完整
2. 点击右上角 **"添加以供审核"**
3. 确认提交信息
4. 点击 **"提交至 App 审核"**

**审核时间：**
- 通常 24-48 小时
- 首次提交可能稍长
- 可在 App Store Connect 查看审核状态

---

### 步骤 6：发布

审核通过后：
- **手动发布**：在 App Store Connect 中点击"发布此版本"
- **自动发布**：如果选择了自动发布，审核通过后自动上架
- **定时发布**：可以设置具体发布日期

---

### 常见问题

**Q: 构建失败怎么办？**
```bash
# 查看详细日志
eas build:view [BUILD_ID]

# 清除凭证重试
eas credentials --platform ios
```

**Q: 提交失败提示 Bundle ID 已存在？**
- 确保在 App Store Connect 中的 Bundle ID 与构建时设置的一致
- 如果是其他开发者占用，需要换一个 Bundle ID

**Q: 如何更新已发布的应用？**
```bash
# 1. 更新版本号（app.json 中的 version）
# 2. 重新构建
eas build --platform ios

# 3. 提交新版本
eas submit --platform ios --latest

# 4. 在 App Store Connect 填写更新说明，提交审核
```

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
   - 版权信息（© 2025 Your Name）
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
     - 功能图片（1024x500）**必需**
     - 手机截图（至少 2 张）

3. **应用内容**
   - **隐私政策**：填写 URL
   - **应用访问权限**：选择"所有功能无限制"
   - **广告**：选择"否"
   - **内容分级**：填写问卷，获得"所有人"分级
   - **目标受众**：选择年龄组
   - **新闻应用**：选择"否"
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

**审核指南：** https://developer.apple.com/app-store/review/guidelines/

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
| 截图包含误导性内容 | 使用真实 UI 截图 |

**政策中心：** https://play.google.com/console/about/guides/

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

---

## 6️⃣ 上架检查清单

### 账号准备
- [ ] Apple Developer Program 已注册并激活（$99/年）
- [ ] Google Play Console 已注册并完成身份验证（$25 一次性）
- [ ] Expo 账号已登录

### 商店材料
- [ ] 应用图标 - iOS: 1024x1024 PNG（无透明）
- [ ] 应用图标 - Android: 512x512 PNG（带 alpha，<1MB）
- [ ] 功能图片 - Android: 1024x500（必需）
- [ ] iPhone 截图 - 6.9" 或 6.5"（至少 2 张）
- [ ] Android 截图 - 最小 1080px 宽（至少 2 张）
- [ ] 应用名称（中英文，≤30 字符）
- [ ] 简短描述（≤80 字符）
- [ ] 详细描述（≤4000 字符）
- [ ] 关键词（≤100 字符，逗号分隔）
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
- [App Store 审核指南](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect 截图规格](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/)
- [Google Play 政策中心](https://play.google.com/console/about/guides/)
- [Google Play 图标设计规范](https://developer.android.com/distribute/google-play/resources/icon-design-specifications)
- [Google Play 预览素材](https://support.google.com/googleplay/android-developer/answer/9866151)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

### 工具链接
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)
- [Apple Developer](https://developer.apple.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

### 隐私政策生成器
- [Termly](https://termly.io/)
- [iubenda](https://www.iubenda.com/)
- [PrivacyPolicies.com](https://www.privacypolicies.com/)

---

# English Version

> **Build process** - see: [BUILD-AND-RELEASE.md](./BUILD-AND-RELEASE.md)
>
> Last updated: December 2025
>
> Sources: [Apple Developer](https://developer.apple.com/programs/), [Google Play Console](https://support.google.com/googleplay/android-developer/)

---

## 1️⃣ Developer Account Registration

### 1.1 Apple Developer Program (Required for iOS)

**Cost:** $99 USD/year

**Official Link:** https://developer.apple.com/programs/enroll/

**Registration Steps:**

1. **Prepare Materials**
   - Apple ID (with two-factor authentication enabled)
   - Valid credit/debit card
   - Legal name (must match Apple Account, no aliases or company names)
   - For organizations: D-U-N-S number

2. **Registration Process**
   ```
   1. Visit https://developer.apple.com/programs/enroll/
   2. Click "Start Your Enrollment"
   3. Sign in with Apple ID
   4. Choose account type:
      - Individual - for independent developers
      - Organization - requires D-U-N-S number
   5. Fill in personal/company information
   6. Agree to terms and pay annual fee
   7. Wait for approval
   ```

3. **Approval Time**
   - Individual accounts: Usually 24-48 hours
   - Organization accounts: 3-5 business days
   - If D-U-N-S number or additional verification needed: 7-10 days

4. **After Approval (Expo/EAS Projects)**

   EAS can **automatically handle** certificates and configuration:

   ```bash
   # 1. Make sure you're logged in to EAS
   eas login

   # 2. First build will guide you through setup
   eas build --platform ios
   ```

   **Follow the prompts on first run:**
   - Enter Apple ID and password to login
   - Select **"Let EAS handle it"** for automatic certificate management
   - EAS will automatically create App ID, Distribution Certificate, Provisioning Profile

   **Manually view/manage credentials:**
   ```bash
   eas credentials --platform ios
   ```

**Membership Benefits:**
- App Store publishing rights
- TestFlight beta distribution
- 25 compute hours/month for Xcode Cloud
- Up to 1PB iCloud storage per app

---

### 1.2 Google Play Console (Required for Android)

**Cost:** $25 USD (one-time)

**Official Link:** https://play.google.com/console/signup

**Registration Steps:**

1. **Prepare Materials**
   - Google account
   - Valid credit/debit card (prepaid cards not accepted)
   - Government-issued ID
   - Contact phone and email
   - For organizations: D-U-N-S number

2. **Identity Verification Requirements (Mandatory since 2024)**

   **Personal accounts require:**
   - Government-issued ID
   - Contact phone (for Google to contact you)
   - Developer email (for users to contact you)
   - Android device verification (via Play Console mobile app)

   **Organization accounts require:**
   - Organization's legal name and address
   - D-U-N-S number (9-digit unique ID)
   - Organization verification documents
   - Contact phone and email

3. **Processing Time**
   - Registration processing: Up to 5 days
   - First app review may take longer

**Service Fees (For Paid Apps):**
- First $1M/year: 15% service fee
- Above $1M: 30% service fee
- Subscriptions: 15% from day one

**Important Notes:**
- Registration fee is one-time, lifetime valid
- All developers must complete identity verification since 2024
- Unverified accounts and apps may be removed
- Starting 2026, all Android app developers will require identity verification

---

### 1.3 Expo Account (Required for EAS Build/Submit)

**Cost:** Free (paid plans available)

**Official Link:** https://expo.dev/signup

```bash
# Register
npx expo register

# Login
eas login
```

**Free Plan Limits:**
- 30 builds per month
- Lower queue priority

---

## 2️⃣ Store Assets Preparation

### 2.1 App Icon

| Platform | Size | Format | Max File Size | Notes |
|----------|------|--------|--------------|-------|
| iOS | 1024x1024 | PNG | - | No transparency, no rounded corners |
| Android | 512x512 | PNG (32-bit with alpha) | 1024 KB | Full square, system applies mask |

---

### 2.2 Screenshots

#### iOS Screenshot Sizes (Updated September 2024)

> **Important Change:** Apple simplified requirements. Only one primary size needed, others auto-scale.

| Device | Screen Size | Portrait (px) | Landscape (px) | Status |
|--------|------------|--------------|----------------|--------|
| iPhone 16 Pro Max, 15 Pro Max, etc. | 6.9" | 1320 x 2868 | 2868 x 1320 | **Required** (or provide 6.5") |
| iPhone 14 Plus, 13 Pro Max, etc. | 6.5" | 1284 x 2778 | 2778 x 1284 | Required if 6.9" not provided |
| iPhone 16 Pro, 16, 15 Pro, etc. | 6.3" | 1179 x 2556 | 2556 x 1179 | Optional (auto-scales) |
| iPhone 14, 13 Pro, 13, etc. | 6.1" | 1170 x 2532 | 2532 x 1170 | Optional (auto-scales) |

**iOS Requirements:**
- Format: .jpeg, .jpg, or .png
- Quantity: 1-10 screenshots
- Resolution: 72 dpi, RGB, no transparency
- **Recommendation: Provide 6.9" screenshots, others auto-generate**

#### Android Screenshot Sizes

| Type | Size Requirements | Quantity | Notes |
|------|-------------------|----------|-------|
| Phone | Min 1080px width, 9:16 or 16:9 | 2-8 | **Required** |
| 7" Tablet | Min 1200 x 1920 (portrait) | Up to 8 | Optional |
| 10" Tablet | Min 1600 x 2560 (portrait) | Up to 8 | Optional |

**Android Requirements:**
- Format: JPEG or 24-bit PNG (no alpha)
- Max file size: 8 MB per screenshot
- Text should not exceed 20% of screenshot area
- Avoid promotional phrases like "Best," "New," "Free"

---

### 2.3 Feature Graphic (Required for Google Play)

| Specification | Value |
|---------------|-------|
| Size | 1024 x 500 pixels |
| Format | JPEG or 24-bit PNG (no alpha) |
| Max File Size | 1 MB |

---

### 2.4 App Description

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

### 2.5 Privacy Policy

**Why Required:**
- Both App Store and Google Play require privacy policy URL
- Required even if you don't collect any data

**Hosting Options:**
- GitHub Pages (free)
- Your own website
- Third-party services: [Termly](https://termly.io/), [iubenda](https://www.iubenda.com/)

---

## 2.6 Complete iOS Publishing Flow (Expo/EAS)

> Complete flow for publishing iOS apps using Expo/EAS after Apple Developer approval.

### Step 1: EAS Login and Project Setup

```bash
# Login to EAS (will prompt if already logged in)
eas login

# Check current logged in account
eas whoami

# To switch accounts, logout first
eas logout
eas login
```

**First time or switching accounts - link project:**
```bash
# Initialize/link project to current EAS account
eas init

# If project was linked to another account:
# First remove extra.eas.projectId from app.json, then run:
eas init
```

After linking, `app.json` will contain:
```json
{
  "extra": {
    "eas": {
      "projectId": "your-project-id"
    },
    "owner": "your-eas-username"
  }
}
```

---

### Step 2: First iOS Build

```bash
eas build --platform ios
```

**Interactive prompts during build:**

1. **Bundle Identifier**
   ```
   ✔ What would you like your iOS bundle identifier to be?
   → Enter like: com.yourname.appname
   ```

2. **Encryption Declaration**
   ```
   ✔ iOS app only uses standard/exempt encryption?
   → Select yes (most apps select yes unless using custom encryption)
   ```

3. **Apple ID Login**
   ```
   ✔ Do you want to log in to your Apple account?
   → Select yes
   ✔ Apple ID: → Enter your Apple ID
   ✔ Password: → Enter password
   ```

4. **Two-Factor Authentication**
   ```
   ✔ Please enter the 6 digit code you received at +XX ••• •••• ••XX:
   → Enter verification code from your phone
   ```

5. **Certificate Generation**
   ```
   ✔ Generate a new Apple Distribution Certificate? → yes
   ✔ Generate a new Apple Provisioning Profile? → yes
   ```

6. **Push Notifications Setup**
   ```
   ✔ Would you like to set up Push Notifications for your project?
   → Select Yes (if your app needs push notifications)
   ✔ Generate a new Apple Push Notifications service key? → yes
   ```

**Build complete output:**
```
✔ Build finished

🍏 iOS app:
https://expo.dev/artifacts/eas/xxxxx.ipa
```

---

### Step 3: Submit to App Store Connect

```bash
# Submit latest build to App Store Connect
eas submit --platform ios --latest
```

**First submission prompts:**
```
✔ What is your Apple Team ID?
→ System auto-detects, press Enter to confirm

✔ Would you like to submit build to App Store Connect?
→ Select yes
```

After successful submission, the build appears in TestFlight on App Store Connect.

---

### Step 4: App Store Connect Configuration

Login to https://appstoreconnect.apple.com/

#### 4.1 Create New App (First Release)

1. Click **"+"** → **"New App"**
2. Fill in:
   - **Platform**: iOS
   - **Name**: App display name
   - **Primary Language**: English or your language
   - **Bundle ID**: Select `com.yourname.appname`
   - **SKU**: Unique identifier (e.g., pomodoro-timer-001)
   - **User Access**: Full Access

#### 4.2 Fill App Information

**App Information page:**
- **Name**: App name
- **Subtitle**: Short description (30 chars max)
- **Category**: Productivity
- **Content Rights**: No
- **Age Rating**: Click to set → Select "None" for all → Get 4+ rating

**Pricing and Availability:**
- **Price**: Free
- **Availability**: Select release regions

**Privacy Policy:**
- Enter privacy policy URL (required)

#### 4.3 Prepare Submission

On **iOS App** page:

1. **Screenshots**
   - 6.9" display (iPhone 15 Pro Max): At least 2
   - Or 6.5" display: At least 2
   - Size: 1320 x 2868 (6.9") or 1284 x 2778 (6.5")

2. **App Description**
   - Promotional Text (optional, 170 chars)
   - Description (required, 4000 chars max)
   - Keywords (100 chars, comma-separated)
   - Support URL
   - Marketing URL (optional)

3. **Build Version**
   - Click **"+"** to select uploaded build
   - If not showing, wait a few minutes for processing

4. **App Review Information**
   - Sign-in Info: Select "Sign-in not required" if no login needed
   - Contact Info: Fill reviewer contact details
   - Notes (optional)

#### 4.4 App Privacy

On **App Privacy** page:
- If app collects no data, select **"Data Not Collected"**
- If collecting data, fill in data types honestly

---

### Step 5: Submit for Review

1. Verify all information is complete
2. Click **"Add for Review"** (top right)
3. Confirm submission info
4. Click **"Submit to App Review"**

**Review Time:**
- Usually 24-48 hours
- First submission may take longer
- Check status in App Store Connect

---

### Step 6: Release

After approval:
- **Manual Release**: Click "Release This Version" in App Store Connect
- **Auto Release**: If selected, automatically goes live after approval
- **Scheduled Release**: Set specific release date/time

---

### FAQ

**Q: Build failed?**
```bash
# View detailed logs
eas build:view [BUILD_ID]

# Clear credentials and retry
eas credentials --platform ios
```

**Q: Submit failed - Bundle ID already exists?**
- Ensure Bundle ID in App Store Connect matches your build
- If taken by another developer, use a different Bundle ID

**Q: How to update a published app?**
```bash
# 1. Update version number (version in app.json)
# 2. Build again
eas build --platform ios

# 3. Submit new version
eas submit --platform ios --latest

# 4. Fill release notes in App Store Connect, submit for review
```

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
3. Upload feature graphic (required) and screenshots
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

**Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/

---

### 4.2 Google Play Review

**Review Time:** 2-7 days (first submission may take longer)

**Common Rejection Reasons:**
- Low target API level
- Unclear permission usage
- Incorrect content rating
- Incomplete data safety declaration
- Misleading screenshots

**Policy Center:** https://play.google.com/console/about/guides/

---

## 5️⃣ Release & Updates

### 5.1 Release Options

**App Store:**
- Manual release
- Auto-release after approval
- Scheduled release

**Google Play:**
- Immediate release
- Staged rollout (recommended): Start with 20%, gradually increase to 100%

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
- [ ] Apple Developer Program registered and active ($99/year)
- [ ] Google Play Console registered with identity verification ($25 one-time)
- [ ] Expo account logged in

### Store Assets
- [ ] App icon - iOS: 1024x1024 PNG (no transparency)
- [ ] App icon - Android: 512x512 PNG (with alpha, <1MB)
- [ ] Feature graphic - Android: 1024x500 (required)
- [ ] iPhone screenshots - 6.9" or 6.5" (at least 2)
- [ ] Android screenshots - min 1080px wide (at least 2)
- [ ] App name (≤30 chars)
- [ ] Short description (≤80 chars)
- [ ] Full description (≤4000 chars)
- [ ] Keywords (≤100 chars, comma-separated)
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
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Screenshot Specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/)
- [Google Play Policy Center](https://play.google.com/console/about/guides/)
- [Google Play Icon Design Specifications](https://developer.android.com/distribute/google-play/resources/icon-design-specifications)
- [Google Play Preview Assets](https://support.google.com/googleplay/android-developer/answer/9866151)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

### Tools
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)
- [Apple Developer](https://developer.apple.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

### Privacy Policy Generators
- [Termly](https://termly.io/)
- [iubenda](https://www.iubenda.com/)
