<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="mb-4">
    <FloatLabel class="mb-4">
      <Password :id="props.name" v-model="value" input-class="w-full" class="w-full" />
      <label :for="props.name" class="block text-gray-700">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped></style>
