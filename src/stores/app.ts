// Utilities
import { defineStore } from 'pinia'
import { getEvents } from './api/endpoints';

interface Event {
  id: string
}

export const useAppStore = defineStore('app', () => {
  const events = ref<Event[] | null>(null)

  async function getEventList (): Promise<void> {
    const responseData = await getEvents();

    events.value = responseData.data;
  }

  return {
    events,
    getEventList,
  }
})
