<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PokemonCartCard from '@/components/PokemonCartCard.vue'
import { useCartStore } from '@/stores/cart'
import { useI18n } from 'vue-i18n'

const cartStore = useCartStore()
const { t } = useI18n()
</script>

<template>
  <DefaultLayout>
    <div v-if="cartStore.cart.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-[24px]">
        <PokemonCartCard
          v-for="item in cartStore.cart"
          :key="item.pokemon.id"
          :pokemon="item.pokemon"
          :quantity="item.quantity"
        />
      </div>
      <div class="flex justify-between items-center">
        <Button severity="secondary" class="m-2" @click="cartStore.clearCart()">
          <span class="pi pi-trash"></span>
          {{ t('button.clearCart') }}
        </Button>
        <Button class="m-2" @click="cartStore.clearCart()">
          <span class="pi pi-check-circle"></span>
          {{ t('button.checkout') }}
        </Button>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <Message>{{ t('message.yourCartIsEmpty') }}</Message>
    </div>
  </DefaultLayout>
</template>
