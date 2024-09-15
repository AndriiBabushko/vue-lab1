<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'

const props = defineProps<{
  name: string
  label: string
  rows?: number
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-4">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <textarea
      :id="name"
      :name="name"
      v-model="value"
      class="w-full px-3 py-2 border border-gray-300 rounded"
      :rows="rows || 4"
    ></textarea>
    <ErrorText :message="errorMessage" v-if="errorMessage" />
  </div>
</template>

<style scoped></style>
