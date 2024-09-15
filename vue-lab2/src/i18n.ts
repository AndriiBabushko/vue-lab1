import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ua from '@/locales/ua.json'

// Create the i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ua
  }
})

export default i18n
