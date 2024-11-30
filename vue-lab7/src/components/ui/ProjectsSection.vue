<template>
  <section id="projects" class="py-16 px-4 bg-white">
    <h2 class="text-2xl font-semibold text-center mb-8 text-black">Проекти</h2>
    <Carousel
      :value="projects"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
      class="custom-carousel"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded mx-2 p-4 h-full">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                v-if="slotProps.data.image"
                :src="slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full h-40 object-cover rounded"
              />
            </div>
          </div>
          <h3 class="mb-4 font-medium text-black">{{ slotProps.data.name }}</h3>
          <p class="mb-4 text-black">{{ slotProps.data.description }}</p>
          <div class="flex justify-between items-center">
            <Button
              v-if="slotProps.data.link"
              :label="'Детальніше'"
              icon="pi pi-external-link"
              class="p-button-text"
              :onClick="() => openLink(slotProps.data.link)"
            />
          </div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    name: 'Yalla Link & Yalla Marketplace',
    description:
      'Розробка веб-додатку для перегляду інформації про ресторани, включаючи рейтинги, автентифікацію користувачів та пошук.',
    image: '/assets/projects/yalla-marketplace.png',
    link: 'https://yalla.sa'
  },
  {
    id: 2,
    name: 'Sempro',
    description:
      'Інтеграція Bluetooth, керування підключеними пристроями, пуш-сповіщення та біометрична автентифікація.',
    image: '/assets/projects/sempro.png',
    link: 'https://sempro.store'
  },
  {
    id: 3,
    name: 'Boutique Bars',
    description:
      'Розробка мобільного застосунку з автентифікацією, пуш-сповіщеннями, масштабованими бекенд-рішеннями та підтримкою Docker.',
    image: '/assets/projects/boutique-bars.png',
    link: 'https://www.boutiquebars.com/'
  },
  {
    id: 4,
    name: 'Yalla Plus Cashier',
    description:
      'Оптимізація веб- та мобільних застосунків із фокусом на продуктивність, CI/CD та розширені аналітичні інструменти.',
    image: '/assets/projects/yalla-cashier.png',
    link: 'https://apps.apple.com/ua/app/yalla-plus-cashier/id6476494562'
  }
])

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style scoped lang="scss"></style>
