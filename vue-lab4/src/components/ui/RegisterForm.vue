<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import InputField from '@/components/common/TextInputField.vue'
import PasswordField from '@/components/common/PasswordField.vue'
import { useToast } from 'primevue/usetoast'
import { ROUTE_NAMES } from '@/utils'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
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
    .register(email, password)
    .then((result) => {
      router.push({ name: ROUTE_NAMES.HOME })
      toast.add({
        severity: 'success',
        summary: result.message,
        life: 3000
      })
    })
    .catch((error) => {
      toast.add({
        severity: 'error',
        summary: error.message,
        life: 3000
      })
    })
})
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <form @submit.prevent="onSubmit" class="w-full max-w-sm shadow-lg rounded-lg border-2">
      <div class="border-b-2 mb-4 p-4">
        <h1 class="text-xl font-bold text-center">Register</h1>
      </div>

      <div class="p-4">
        <div class="mb-6">
          <InputField name="email" label="Email" />
          <PasswordField name="password" label="Password" />
        </div>
        <Button label="Login" type="submit" class="w-full p-button-rounded p-button-primary" />
      </div>
    </form>
  </div>
</template>
