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
    <div class="flex flex-wrap justify-between gap-2">
      <div v-for="option in options" :key="option.value" class="flex flex-row gap-1 items-center">
        <input :id="option.value" type="checkbox" :value="option.value" v-model="value" />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
    <ErrorText v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style scoped></style>
