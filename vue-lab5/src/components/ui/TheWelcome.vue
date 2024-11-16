<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const labInfo = computed(() => {
  return {
    title: t('labInfo.title'),
    description: t('labInfo.description'),
    tasks: [
      t('labInfo.tasks.integrateVeeValidate'),
      t('labInfo.tasks.setUpValidationRules'),
      t('labInfo.tasks.developTestInterface'),
      t('labInfo.tasks.validateAnswers'),
      t('labInfo.tasks.displaySummary')
    ]
  }
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-4">{{ labInfo.title }}</h1>
    <p class="mb-6">{{ labInfo.description }}</p>
    <ul class="list-disc pl-6">
      <li v-for="task in labInfo.tasks" :key="task" class="mb-2">{{ task }}</li>
    </ul>
  </div>
</template>
