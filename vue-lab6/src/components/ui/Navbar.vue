<script setup lang="ts">
import { ref } from 'vue'
import VueSVG from '@/assets/vue.svg?url'
import { ROUTE_PATHS } from '@/utils'
import AddEditEventModal from './AddEditEventModal.vue'
import { type Event, useEventsStore } from '@/stores/events'

const eventsStore = useEventsStore()
const isEventModalVisible = ref(false)

const openAddEventModal = () => {
  isEventModalVisible.value = true
}

const handleSave = (event: Event) => {
  eventsStore.addEvent(event)
}
</script>

<template>
  <Menubar>
    <template #start>
      <Button as="router-link" link :to="ROUTE_PATHS.HOME">
        <Avatar class="hidden" :image="VueSVG" shape="square" />
      </Button>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Button
          label="Add Event"
          icon="pi pi-plus"
          class="p-button-success"
          @click="openAddEventModal"
        />
      </div>
    </template>
  </Menubar>

  <AddEditEventModal v-model:visible="isEventModalVisible" :isEdit="false" @save="handleSave" />
</template>
