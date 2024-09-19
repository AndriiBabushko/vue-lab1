<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { usePokemonsStore } from '@/stores/pokemons'
import { onMounted } from 'vue'

const { pokemons, fetchAllPokemons } = usePokemonsStore()

onMounted(() => {
  fetchAllPokemons()
})
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-[24px]">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
  </DefaultLayout>
</template>
