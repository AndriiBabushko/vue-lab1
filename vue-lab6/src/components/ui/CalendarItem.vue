<script setup lang="ts">
import { useEventsStore, type Event } from '@/stores/events'
import AddEditEventModal from '@/components/ui/AddEditEventModal.vue'
import { ref } from 'vue'
import { formatDate, formatTime } from '@/utils'

const props = defineProps<{ event: Event }>()

const eventsStore = useEventsStore()
const isEventModalVisible = ref(false)

const openEditEventModal = () => {
  isEventModalVisible.value = true
}

const handleSave = (event: Event) => {
  eventsStore.updateEvent(event)
}

const deleteEvent = (eventId: number) => {
  eventsStore.deleteEvent(eventId)
}
</script>

<template>
  <Card class="w-full shadow-2xl text-white">
    <template #content>
      <div class="flex flex-col mb-3">
        <p class="text-2xl text-white">
          {{ props.event.title }}
        </p>
        <p class="text-sm text-gray-700">
          {{ props.event.description || 'No description available' }}
        </p>
        <div class="mt-2 text-sm text-gray-600">
          <strong>Date:</strong> {{ formatDate(props.event.date) }}
        </div>
        <div class="mt-1 text-sm text-gray-600">
          <strong>Time:</strong> {{ formatTime(props.event.date) }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          icon="pi pi-pencil"
          class="p-button-text"
          label="Edit"
          @click="openEditEventModal"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-text p-button-danger"
          label="Delete"
          @click="deleteEvent(props.event.id)"
        />
      </div>
    </template>
  </Card>

  <AddEditEventModal
    v-model:visible="isEventModalVisible"
    :event="event"
    :isEdit="true"
    @save="handleSave"
  />
</template>
