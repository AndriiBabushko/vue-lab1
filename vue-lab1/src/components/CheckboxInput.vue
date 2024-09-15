<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-4">
    <label :for="label" class="text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input :id="label" type="checkbox" v-model="value" class="ml-2" />
    <ErrorText v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style scoped></style>
