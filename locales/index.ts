/**
 * i18n 国际化配置
 * 默认语言：英文（en）
 * 支持语言：英文（en）、简体中文（zh）
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en';
import zh from './zh';

// 语言资源
const resources = {
  en: { translation: en },
  zh: { translation: zh },
  'zh-CN': { translation: zh },
  'zh-TW': { translation: zh },
  'zh-HK': { translation: zh },
};

// 获取系统语言，如果不支持则默认英文
const getInitialLanguage = () => {
  const systemLocale = Localization.getLocales()[0];
  const languageCode = systemLocale?.languageCode || 'en';

  // 如果是中文（任何变体），使用 zh
  if (languageCode.startsWith('zh')) {
    return 'zh';
  }

  // 如果资源中有该语言，使用它，否则默认英文
  return resources[languageCode as keyof typeof resources] ? languageCode : 'en';
};

// 初始化 i18n
i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en', // 默认回退到英文
  interpolation: {
    escapeValue: false, // React 已经处理了 XSS
  },
  compatibilityJSON: 'v4', // 兼容性设置
});

export default i18n;
