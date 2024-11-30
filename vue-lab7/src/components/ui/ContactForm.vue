<template>
  <section class="py-16 px-4 bg-white">
    <h2 class="text-2xl font-semibold text-center mb-8 text-black">Зв'яжіться зі мною</h2>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto space-y-4">
      <InputText v-model="form.name" placeholder="Ваше ім'я" required class="w-full" />
      <InputText
        v-model="form.email"
        placeholder="Ваш email"
        type="email"
        required
        class="w-full"
      />
      <InputText v-model="form.subject" placeholder="Тема" required class="w-full" />
      <Textarea v-model="form.message" placeholder="Ваше повідомлення" required class="w-full" />
      <Button label="Надіслати" type="submit" class="w-full" />
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('Форма надіслана:', form.value)
}
</script>
