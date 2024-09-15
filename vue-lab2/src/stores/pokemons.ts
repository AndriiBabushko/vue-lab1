// src/stores/pokemons.ts
import { defineStore } from 'pinia'

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
}

interface State {
  pokemons: Pokemon[]
  searchValue: string
}

export const usePokemonsStore = defineStore('pokemons', {
  state: (): State => ({
    pokemons: [],
    searchValue: ''
  }),
  actions: {
    async fetchAllPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        const data = await response.json()
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const detailResponse = await fetch(pokemon.url)
            const details = await detailResponse.json()
            return {
              id: details.id,
              name: details.name,
              base_experience: details.base_experience,
              height: details.height,
              weight: details.weight
            } as Pokemon
          })
        )
        this.pokemons = detailedPokemons
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
      }
    },
    async fetchPokemonById(id: number) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await response.json()
        return {
          id: pokemon.id,
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          height: pokemon.height,
          weight: pokemon.weight
        } as Pokemon
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
        return null
      }
    },
    searchPokemons(searchValue: string) {
      this.searchValue = searchValue
      return this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    },
    createPokemon(pokemon: Pokemon) {
      this.pokemons.push(pokemon)
    },
    updatePokemon(updatedPokemon: Pokemon) {
      const index = this.pokemons.findIndex((p) => p.id === updatedPokemon.id)
      if (index !== -1) {
        this.pokemons[index] = updatedPokemon
      }
    },
    deletePokemon(id: number) {
      this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id)
    }
  },
  persist: true
})
