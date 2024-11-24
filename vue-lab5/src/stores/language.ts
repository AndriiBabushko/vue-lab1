import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Languages = 'en' | 'ua'

export const useLanguageStore = defineStore(
  'language',
  () => {
    const language = ref<Languages>('en')

    function setLanguage(newLanguage: Languages) {
      language.value = newLanguage
    }

    return {
      language,
      setLanguage
    }
  },
  {
    persist: true
  }
)
