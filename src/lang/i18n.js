import Vue from 'vue';
import VueI18n from 'vue-i18n';
import localeEN from 'view-design/dist/locale/en-US';
import localeZH from 'view-design/dist/locale/zh-CN';
import en from './en';
import zh from './zh';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: { ...localeEN, ...en },
    zh: { ...localeZH, ...zh },
  },
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});
