<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import InputField from '@/components/common/TextInputField.vue'
import PasswordField from '@/components/common/PasswordField.vue'
import { useToast } from 'primevue/usetoast'
import { ROUTE_NAMES } from '@/utils'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const schema = yup.object({
  email: yup.string().required(t('message.emailRequired')).email(t('message.emailInvalid')),
  password: yup.string().required(t('message.passwordRequired')).min(6, t('message.passwordMin'))
})

const { handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: schema
})

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values

  await userStore
    .login(email, password)
    .then((result) => {
      if (result.success) {
        router.push({ name: ROUTE_NAMES.HOME })
        toast.add({
          severity: 'success',
          summary: t('message.loginSuccess'),
          life: 3000
        })
      } else {
        toast.add({
          severity: 'error',
          summary: t('message.loginError'),
          life: 3000
        })
      }
    })
    .catch((error) => {
      toast.add({
        severity: 'error',
        detail: error.message,
        life: 3000
      })
    })
})
</script>

<template>
  <div class="flex justify-center items-center">
    <form @submit.prevent="onSubmit" class="w-full max-w-sm shadow-lg rounded-lg border-2">
      <div class="border-b-2 mb-4 p-4">
        <h1 class="text-xl font-bold text-center">{{ t('message.loginTitle') }}</h1>
      </div>

      <div class="p-4">
        <div class="mb-6">
          <InputField name="email" :label="t('message.email')" />
          <PasswordField name="password" :label="t('message.password')" />
        </div>
        <Button
          :label="t('message.loginButton')"
          type="submit"
          class="w-full p-button-rounded p-button-primary"
        />
      </div>
    </form>
  </div>
</template>
