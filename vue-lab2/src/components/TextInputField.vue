<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-8">
    <FloatLabel class="mb-4">
      <InputText :id="props.name" v-model="value" class="w-full" />
      <label :for="props.name" class="block text-gray-700">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped></style>
