import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore(
  'language',
  () => {
    const language = ref<string>('en')

    function setLanguage(newLanguage: string) {
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
