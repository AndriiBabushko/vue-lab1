import { defineStore } from 'pinia'
import type { Pokemon } from '@/stores/pokemons'

interface CartItem {
  pokemon: Pokemon
  quantity: number
}

interface State {
  cart: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    cart: []
  }),
  actions: {
    addToCart(pokemon: Pokemon, quantity = 1) {
      const existingItem = this.cart.find((item) => item.pokemon.id === pokemon.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cart.push({ pokemon, quantity })
      }
    },
    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.pokemon.id !== id)
    },
    clearCart() {
      this.cart = []
    }
  },
  persist: true
})
