<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete'

const props = defineProps<{
  name: string
  label: string
  suggestions: string[]
}>()

const { value, errorMessage } = useField<string>(() => props.name)
const filteredItems = ref(props.suggestions)

const search = (event: AutoCompleteCompleteEvent) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredItems.value = [...filteredItems.value]
    } else {
      filteredItems.value = filteredItems.value.filter((item) => {
        return item.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }
  }, 250)
}
</script>

<template>
  <div class="my-[32px]">
    <FloatLabel class="mb-4">
      <AutoComplete
        v-model="value"
        dropdown
        :suggestions="filteredItems"
        @complete="search"
        class="w-full"
      />
      <label :for="props.name" class="block text-gray-700">{{ props.label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped></style>
