<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'
import { useLanguageStore } from '@/stores/language'

const { locale } = useI18n()

const languages = ref([
  { code: 'en', name: '🇺🇸' },
  { code: 'ua', name: '🇺🇦' }
])

const selectedLanguage = ref(locale.value)
const languageStore = useLanguageStore()

onMounted(() => {
  i18n.global.locale.value = languageStore.language
  selectedLanguage.value = languageStore.language
})

function switchLanguage(newLanguage) {
  i18n.global.locale.value = newLanguage.value
  languageStore.setLanguage(newLanguage.value)
}
</script>

<template>
  <Dropdown
    :options="languages"
    v-model="selectedLanguage"
    @change="switchLanguage"
    :highlightOnSelect="true"
    optionLabel="name"
    optionValue="code"
  />
</template>

<style scoped></style>
