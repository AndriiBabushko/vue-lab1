<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'
import { ROOT_ROUTE_NAMES } from '@/utils'
import { usePokemonsStore } from '@/stores/pokemons'
import { onMounted, ref } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { useToast } from 'primevue/usetoast'

const { params } = useRoute<ROOT_ROUTE_NAMES.POKEMON>()

const { fetchPokemonById } = usePokemonsStore()
const toast = useToast()

const pokemon = ref(null)

onMounted(async () => {
  const pokemonId = Number(params.id)
  const fetchedPokemon = await fetchPokemonById(pokemonId)

  if (fetchedPokemon) {
    pokemon.value = fetchedPokemon
  } else {
    toast.add({
      severity: 'error',
      summary: t('error.failedToFetchPokemon'),
      life: 3000
    })
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="p-[24px]">
      <PokemonCard v-if="pokemon" :pokemon="pokemon" />
    </div>
  </DefaultLayout>
</template>

<style scoped></style>
