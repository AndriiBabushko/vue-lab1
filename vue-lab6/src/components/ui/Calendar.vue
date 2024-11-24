<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEventsStore } from '@/stores/events'
import CalendarItem from './CalendarItem.vue'

const eventsStore = useEventsStore()

const selectedDate = ref<Date | null>(null)

const clearFilter = () => {
  selectedDate.value = null
}

const filteredEvents = computed(() => {
  if (!selectedDate.value) {
    return eventsStore.events
  }

  const selectedDateString = selectedDate.value.toISOString().split('T')[0]

  return eventsStore.events.filter((event) => event.date === selectedDateString)
})

const exportToJson = () => {
  const blob = new Blob([JSON.stringify(filteredEvents.value, null, 2)], {
    type: 'application/json'
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'events.json'
  link.click()
}

const exportToCsv = () => {
  const eventsArray = filteredEvents.value
  const headers = ['ID', 'Title', 'Description', 'Date']
  const rows = eventsArray.map((event) => [
    event.id,
    event.title,
    event.description || '',
    event.date
  ])

  let csvContent = 'data:text/csv;charset=utf-8,'
  csvContent += headers.join(',') + '\n'

  rows.forEach((row) => {
    csvContent += row.join(',') + '\n'
  })

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.href = encodedUri
  link.download = 'events.csv'
  link.click()
}
</script>

<template>
  <div>
    <h2 class="text-2xl text-center my-4">Event Calendar</h2>
    <form class="flex flex-row justify-center gap-[12px]">
      <DatePicker :minDate="new Date()" v-model="selectedDate" class="w-[200px]" />
      <Button label="Clear" icon="pi pi-trash" class="p-button-success" @click="clearFilter" />
    </form>
    <div class="mt-[16px]">
      <h3 class="text-center mb-3">
        Events on {{ selectedDate ? selectedDate.toDateString() : 'All Dates' }}
      </h3>
      <div v-if="filteredEvents.length === 0" class="text-center">No events for this date.</div>
      <div v-else>
        <CalendarItem v-for="event in filteredEvents" :key="event.id" :event="event" />
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-4">
      <Button label="Export to JSON" icon="pi pi-download" @click="exportToJson" />
      <Button label="Export to CSV" icon="pi pi-download" @click="exportToCsv" />
    </div>
  </div>
</template>
