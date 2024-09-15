import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
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
    addToCart(pokemon: CartItem) {
      const existingItem = this.cart.find((item) => item.id === pokemon.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ ...pokemon, quantity: 1 })
      }
    },
    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.id !== id)
    },
    clearCart() {
      this.cart = []
    },
    getCartItems() {
      return this.cart
    }
  },
  persist: true // Enable persistence for this store
})
