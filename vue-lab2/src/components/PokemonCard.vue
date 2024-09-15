<!-- src/components/PokemonCard.vue -->
<script setup lang="ts">
import { defineProps } from 'vue'
import type { Pokemon } from '@/stores/pokemons'

// Define props for the component
const props = defineProps<{
  pokemon: Pokemon
}>()

// Image URL based on the Pokémon ID
const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`
</script>

<template>
  <Card :header="props.pokemon.name" class="pokemon-card">
    <div class="flex flex-col items-center">
      <Avatar :image="pokemonImageUrl" size="xlarge" shape="circle" class="mb-3" />

      <ul class="list-none p-0">
        <li><strong>Base Experience:</strong> {{ props.pokemon.base_experience }}</li>
        <li><strong>Height:</strong> {{ props.pokemon.height }} dm</li>
        <li><strong>Weight:</strong> {{ props.pokemon.weight }} hg</li>
      </ul>
    </div>
  </Card>
</template>

<style scoped>
.pokemon-card {
  width: 300px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

ul {
  text-align: left;
}

li {
  margin: 5px 0;
}
</style>
