<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAMES } from '@/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

console.log(route.params)

const correctAnswers = computed(() => Number(route.query.correctAnswers || 0))
const successRate = computed(() => Number(route.query.successRate || 0).toFixed(2))
const totalScore = computed(() => Number(route.query.totalScore || 0))

const goBackToTest = () => {
  router.push({ name: ROUTE_NAMES.TEST })
}
</script>

<template>
  <DefaultLayout>
    <div class="p-6 max-w-3xl mx-auto bg-[#18181b] shadow-md rounded border-2 border-[#3f3f46]">
      <h1 class="text-2xl font-bold text-white text-center">{{ t('results.title') }}</h1>

      <div class="mt-6 space-y-4">
        <p class="text-lg text-gray-200">
          {{ t('results.correctAnswers') }}:
          <span class="font-semibold text-white">{{ correctAnswers }}</span>
        </p>
        <p class="text-lg text-gray-200">
          {{ t('results.successRate') }}:
          <span class="font-semibold text-white">{{ successRate }}%</span>
        </p>
        <p class="text-lg text-gray-200">
          {{ t('results.totalScore') }}:
          <span class="font-semibold text-white">{{ totalScore }}</span>
        </p>
      </div>

      <div class="mt-6 text-center">
        <button
          @click="goBackToTest"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {{ t('results.retry') }}
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>
