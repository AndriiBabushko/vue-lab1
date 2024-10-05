<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage } = useField<string>(props.name)
const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ inputRef })
</script>

<template>
  <div class="my-[32px]">
    <FloatLabel class="mb-4">
      <InputText :id="props.name" v-model="value" class="w-full" ref="inputRef" />
      <label :for="props.name" class="block text-gray-700">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped></style>
