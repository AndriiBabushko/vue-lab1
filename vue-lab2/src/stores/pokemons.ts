import { defineStore } from 'pinia'

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  sprites: {
    front_default: string
    back_default: string
  }
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
              weight: details.weight,
              sprites: details.sprites
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
        if (this.pokemons.length === 0) {
          await this.fetchAllPokemons()
        }

        return this.pokemons.find((p) => p.id === id) as Pokemon
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
    }
  },
  persist: true
})
