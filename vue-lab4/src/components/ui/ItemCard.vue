<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { Item } from '@/stores/items'
import { ref } from 'vue'
import AddEditItem from '@/components/ui/AddEditItem.vue'
import DeleteItem from '@/components/ui/DeleteItem.vue'

const props = defineProps<{
  item: Item
}>()

const isEditItemModalVisible = ref(false)
const isDeleteItemModalVisible = ref(false)

const openEditItemModal = () => {
  isEditItemModalVisible.value = true
}

const onOpenDeleteModal = () => {
  isDeleteItemModalVisible.value = true
}
</script>

<template>
  <Card :header="props.item.name" class="w-full" @click="openEditItemModal">
    <template #content>
      <div class="flex flex-row justify-between mb-3">
        <div class="flex flex-col items-start">
          <h1 class="text-lg font-bold">{{ props.item.name }}</h1>
          <p>{{ props.item.description }}</p>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-lg font-bold">{{ props.item.price }}</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row justify-end items-center">
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-outlined"
          severity="danger"
          @click.stop="onOpenDeleteModal"
        />
      </div>
    </template>
  </Card>

  <AddEditItem v-model:visible="isEditItemModalVisible" :item="props.item" is-edit />
  <DeleteItem v-model:visible="isDeleteItemModalVisible" :item="props.item" />
</template>

<style scoped>
.p-card {
  flex-direction: column;
  justify-content: center;
}
</style>
