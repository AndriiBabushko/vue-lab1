<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label: string
  showTime?: boolean
}>()

const { value, errorMessage } = useField<string>(() => props.name)

const computedValue = computed({
  get: () => new Date(value.value),
  set: (val: string) => {
    value.value = val
  }
})
</script>

<template>
  <div class="my-[32px]">
    <FloatLabel class="mb-4">
      <DatePicker
        :id="props.name"
        :showTime="showTime"
        fluid
        v-model="computedValue"
        class="w-full"
      />
      <label :for="props.name" class="block text-gray-700">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped></style>
