<script setup lang="ts">
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useField } from 'vee-validate'
import ErrorText from '@/components/ErrorText.vue'

const props = defineProps<{
  name: string
}>()
const { executeRecaptcha } = useReCaptcha()
const { errorMessage, setValue } = useField(() => props.name)

const handleRecaptcha = async () => {
  try {
    const token = await executeRecaptcha('verify')
    console.log(`token -> ${token}`)
    if (!token) {
      setValue('')
      return
    }
    setValue(token)
  } catch (error) {
    setValue('')
  }
}
</script>

<template>
  <div class="mb-4">
    <p class="block text-sm font-medium text-gray-700 mb-1">
      Please complete the reCAPTCHA to verify you are not a bot:
    </p>
    <button
      type="button"
      class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      @click="handleRecaptcha"
    >
      Verify reCAPTCHA
    </button>
    <ErrorText v-if="errorMessage" :message="errorMessage" />
  </div>
</template>

<style scoped></style>
