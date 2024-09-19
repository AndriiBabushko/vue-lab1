<script setup lang="ts">
import type { Pokemon } from '@/stores/pokemons'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ROOT_ROUTE_PATHS } from '@/utils'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  pokemon: Pokemon
}>()

const router = useRouter()
const { t } = useI18n()
const cartStore = useCartStore()
const toast = useToast()

const quantity = ref(1)

const isInCart = computed(() => {
  return cartStore.cart.some((item) => item.id === props.pokemon.id)
})

const onAddToCart = () => {
  cartStore.addToCart(props.pokemon, quantity.value)
  toast.add({
    severity: 'success',
    summary: t('success.addedToCart', { name: props.pokemon.name.toUpperCase() }),
    life: 3000
  })
  quantity.value = 1
}

const goToPokemonDetail = () => {
  router.push({
    path: ROOT_ROUTE_PATHS.POKEMON + props.pokemon.id,
    params: { id: props.pokemon.id }
  })
}
</script>

<template>
  <Card :header="props.pokemon.name" class="w-full" @click="goToPokemonDetail">
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
        <div class="">
          <InputNumber
            v-model="quantity"
            showButtons
            buttonLayout="horizontal"
            :min="1"
            :max="99"
            inputClass="w-[60px] text-center"
            @click.stop
          >
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
          </InputNumber>
        </div>

        <Button
          :icon="isInCart.value ? 'pi pi-check' : 'pi pi-shopping-cart'"
          class="p-button-rounded p-button-outlined"
          @click.stop="onAddToCart"
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
