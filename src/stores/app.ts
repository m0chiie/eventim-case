// Utilities
import { defineStore } from 'pinia'
import { getEvent, getEvents } from './api/endpoints';

interface Event {
  id: string
}

export const useAppStore = defineStore('app', () => {
  const events = ref<Event[] | null>(null)

  async function getEventList (): Promise<void> {
    const responseData = await getEvents();

    events.value = responseData.data;
  }

  async function getEventDetails (eventId: string): Promise<object> {
    const responseData = await getEvent(eventId);

    return responseData.data;
  }

  return {
    events,
    getEventList,
    getEventDetails,
  }
})
