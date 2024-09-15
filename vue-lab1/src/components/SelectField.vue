<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'

const props = defineProps<{
  name: string
  label: string
  options: { label: string; value: string }[]
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-4">
    <label :for="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <select :id="label" v-model="value" class="w-full px-3 py-2 border border-gray-300 rounded">
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <ErrorText v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style scoped></style>
