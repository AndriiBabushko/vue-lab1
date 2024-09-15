<script setup lang="ts">
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    multiple?: boolean
    accept?: string
  }>(),
  {
    multiple: false,
    accept: ''
  }
)

const { meta, setValue, errorMessage } = useField(() => props.name, 'required')

const files = ref<File[]>([])

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    files.value = Array.from(input.files)
    setValue(files.value) // Update form value
  }
}
</script>

<template>
  <div class="mt-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      type="file"
      :multiple="multiple"
      :name="name"
      :accept="accept"
      @change="handleFileChange"
      class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
    />
    <div v-if="files.length > 0" class="mt-2">
      <p class="text-sm text-gray-600">Selected files:</p>
      <ul class="list-disc list-inside text-sm text-gray-600">
        <li v-for="file in files" :key="file.name">{{ file.name }}</li>
      </ul>
    </div>
    <ErrorText
      v-if="(meta.touched && meta.error) || errorMessage"
      :message="meta.error || errorMessage"
    />
  </div>
</template>

<style scoped></style>
