<script setup lang="ts">
import type { Pokemon } from '@/stores/pokemons'
import { useCartStore } from '@/stores/cart'
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'

const props = defineProps<{
  pokemon: Pokemon
  quantity: number
}>()

const { t } = useI18n()
const cartStore = useCartStore()

const onRemoveFromCart = () => {
  cartStore.removeFromCart(props.pokemon.id)
}
</script>

<template>
  <Card :header="props.pokemon.name" class="w-full">
    <template #content>
      <div class="flex flex-row justify-between mb-3">
        <Image :src="props.pokemon.sprites.front_default" />
        <div class="flex flex-col items-center">
          <h1 class="text-lg font-bold uppercase text-center">{{ props.pokemon.name }}</h1>
          <ul class="list-none p-0">
            <li>
              <strong>{{ t('baseExperience') }}:</strong> {{ props.pokemon.base_experience }}
            </li>
            <li>
              <strong>{{ t('height') }}:</strong> {{ props.pokemon.height }} dm
            </li>
            <li>
              <strong>{{ t('weight') }}:</strong> {{ props.pokemon.weight }} hg
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row justify-between">
        <span class="font-bold">Кількість: {{ props.quantity }}</span>
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click.stop="onRemoveFromCart"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
div.p-card {
  flex-direction: column;
  justify-content: center;
}
</style>
