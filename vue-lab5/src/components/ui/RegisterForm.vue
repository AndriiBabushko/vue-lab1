<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { type FirebaseUser, UserSex, useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import InputField from '@/components/common/TextInputField.vue'
import PasswordField from '@/components/common/PasswordField.vue'
import { useToast } from 'primevue/usetoast'
import { ROUTE_NAMES } from '@/utils'
import { useI18n } from 'vue-i18n'
import NumberInputField from '@/components/common/NumberInputField.vue'
import DropdownField from '@/components/common/DropdownField.vue'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()
const toast = useToast()

const schema = yup.object({
  name: yup.string().required(t('message.nameRequired')).min(3, t('message.nameMin')),
  age: yup.number().required(t('message.ageRequired')).min(18, t('message.ageMin')),
  phone: yup.string().required(t('message.phoneRequired')).min(10, t('message.phoneMin')),
  email: yup.string().required(t('message.emailRequired')).email(t('message.emailInvalid')),
  sex: yup
    .string()
    .oneOf(Object.values(UserSex), t('message.sexInvalid'))
    .required(t('message.sexRequired')),
  password: yup.string().required(t('message.passwordRequired')).min(6, t('message.passwordMin'))
})

const { handleSubmit } = useForm({
  initialValues: {
    name: '',
    age: 18,
    phone: '',
    email: '',
    sex: UserSex.MALE,
    password: ''
  },
  validationSchema: schema
})

const onSubmit = handleSubmit(async (firebaseUser) => {
  await userStore
    .register(firebaseUser)
    .then((result) => {
      if (result) {
        router.push({ name: ROUTE_NAMES.HOME })
        toast.add({
          severity: 'success',
          summary: t('message.userRegistered'),
          life: 3000
        })
      } else
        toast.add({
          severity: 'error',
          summary: t('message.userRegistrationFailed'),
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
        <h1 class="text-xl font-bold text-center">{{ t('message.register') }}</h1>
      </div>

      <div class="p-4">
        <div class="mb-6">
          <InputField name="name" :label="t('message.name')" />
          <NumberInputField name="age" :label="t('message.age')" />
          <InputField name="phone" :label="t('message.phone')" />
          <InputField name="email" :label="t('message.email')" />
          <DropdownField
            name="sex"
            :label="t('message.sex')"
            :suggestions="[UserSex.MALE, UserSex.FEMALE, UserSex.VUEJS, UserSex.OTHER]"
          />
          <PasswordField name="password" :label="t('message.password')" />
        </div>
        <Button
          :label="t('message.register')"
          type="submit"
          class="w-full p-button-rounded p-button-primary font-bold"
        />
      </div>
    </form>
  </div>
</template>
