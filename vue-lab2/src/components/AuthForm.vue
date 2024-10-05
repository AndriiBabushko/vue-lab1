<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import InputField from '@/components/TextInputField.vue'
import PasswordField from '@/components/PasswordField.vue'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { ROOT_ROUTE_NAMES } from '@/utils'

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const schema = yup.object({
  username: yup.string().required(t('error.usernameIsRequired')),
  password: yup
    .string()
    .required(t('error.passwordIsRequired'))
    .min(6, t('error.minPasswordLengthIs6'))
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

watch([() => userStore.isLoggedIn, () => userStore.loginMessage], ([isLoggedIn, loginMessage]) => {
  if (isLoggedIn) {
    router.push({ name: ROOT_ROUTE_NAMES.HOME })
    if (loginMessage) {
      toast.add({
        severity: 'success',
        summary: loginMessage,
        life: 3000
      })
    }
  } else if (loginMessage) {
    toast.add({
      severity: 'error',
      summary: loginMessage,
      life: 3000
    })
  }
  userStore.clearLoginMessage()
})

const onSubmit = handleSubmit((values) => {
  const { username, password } = values

  userStore.login(username, password)
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <form @submit.prevent="onSubmit" class="w-full max-w-sm shadow-lg rounded-lg border-2">
      <div class="border-b-2 mb-4 p-4">
        <h1 class="text-xl font-bold text-center">{{ t('login') }} / {{ t('register') }}</h1>
      </div>

      <div class="p-4">
        <div class="mb-6">
          <InputField name="username" :label="t('username')" />
          <PasswordField name="password" :label="t('password')" />
        </div>
        <Button label="Login" type="submit" class="w-full p-button-rounded p-button-primary" />
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Optional: Customize styles */
</style>
