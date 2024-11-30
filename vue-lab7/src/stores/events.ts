import { defineStore } from 'pinia'

export interface Event {
  id: number
  title: string
  description?: string
  date: string
}

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[]
  }),
  actions: {
    addEvent(event: Omit<Event, 'id'>) {
      const newEvent = { id: Date.now(), ...event }
      this.events.push(newEvent)
    },
    updateEvent(updatedEvent: Event) {
      const index = this.events.findIndex((e) => e.id === updatedEvent.id)
      if (index !== -1) {
        this.events[index] = updatedEvent
      }
    },
    deleteEvent(eventId: number) {
      this.events = this.events.filter((e) => e.id !== eventId)
    }
  },
  persist: true
})
