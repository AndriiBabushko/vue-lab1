<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import ItemCard from '@/components/ui/ItemCard.vue'

const itemsStore = useItemsStore()

onMounted(() => {
  itemsStore.fetchItems()
})
</script>

<template>
  <DefaultLayout>
    <h3 v-if="itemsStore.items.length === 0" class="text-center w-full">No items available</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-[12px]">
      <ItemCard
        v-for="item in itemsStore.items"
        :item="item"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      />
    </div>
  </DefaultLayout>
</template>
