<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { usePokemonsStore } from '@/stores/pokemons'

// Access the Pokémon store
const pokemonsStore = usePokemonsStore()

// Local state for the search value
const searchValue = ref('')

// Computed property to filter Pokémon based on the search value
const filteredPokemons = computed(() => {
  if (!searchValue.value) {
    return pokemonsStore.pokemons // Return all Pokémon if no search value
  }
  return pokemonsStore.searchPokemons(searchValue.value) // Use the store's search function
})

// Watcher to fetch Pokémon data on component mount
watch(() => {
  if (pokemonsStore.pokemons.length === 0) {
    pokemonsStore.fetchAllPokemons()
  }
})
</script>

<template>
  <div class="max-w-md mx-auto p-5">
    <!-- Search Input with PrimeVue InputText -->
    <div class="p-inputgroup mb-5">
      <span class="p-inputgroup-addon">
        <i class="pi pi-search"></i>
      </span>
      <InputText
        v-model="searchValue"
        placeholder="Search Pokémon by name..."
        class="p-inputtext p-component w-full"
      />
    </div>

    <!-- Filtered Pokémon List using PrimeVue Listbox -->
    <Listbox
      v-model="selectedPokemon"
      :options="filteredPokemons"
      optionLabel="name"
      optionValue="id"
      class="w-full"
      :emptyMessage="'No Pokémon found.'"
    >
      <template #item="{ name, id }">
        <div class="flex items-center">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`"
            alt="pokemon-image"
            class="mr-2 w-8 h-8"
          />
          <span>{{ name }} (ID: {{ id }})</span>
        </div>
      </template>
    </Listbox>
  </div>
</template>
