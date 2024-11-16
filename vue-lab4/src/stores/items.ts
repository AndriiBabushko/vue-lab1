import { defineStore } from 'pinia'
import { addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { itemsCollection } from '@/utils/firebase'
import { onUnmounted } from 'vue'

export interface Item {
  id: string
  name: string
  description?: string
  price: number
}

interface State {
  items: Item[]
}

export const useItemsStore = defineStore('items', {
  state: (): State => ({
    items: []
  }),
  actions: {
    async fetchItems() {
      try {
        const unsubscribe = onSnapshot(itemsCollection, (querySnapshot) => {
          this.items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Item[]
        })
        onUnmounted(unsubscribe)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },

    async createItem(newItem: Omit<Item, 'id'>) {
      try {
        await addDoc(itemsCollection, newItem)
      } catch (error) {
        console.error('Error adding item:', error)
      }
    },

    async updateItem(updatedItem: Item) {
      try {
        const itemDoc = doc(itemsCollection, updatedItem.id)
        await updateDoc(itemDoc, {
          name: updatedItem.name,
          description: updatedItem.description,
          price: updatedItem.price
        })
      } catch (error) {
        console.error('Error updating item:', error)
      }
    },

    async deleteItem(itemId: string) {
      try {
        const itemDoc = doc(itemsCollection, itemId)
        await deleteDoc(itemDoc)
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }
})
