<template>
  <v-container v-if="event" class="py-6" max-width="1200">
    <template v-if="loading">
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </template>
    <div v-else>
      <v-img
        class="rounded mb-6"
        cover
        height="300"
        rounded="lg"
        :src="`https://www.eventim-light.com/de/api/image/${event.image.id}/facebook_event_cover/webp`"
      />

      <v-row>
        <v-col cols="12" md="8">
          <h1 class="text-h4 font-weight-bold mb-4">{{ event.title }}</h1>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-1 mb-2 d-flex">
                <v-icon class="mr-1" color="error" icon="mdi-calendar" />
                <div>
                  <div>{{ formatDate(event.start) }}</div>
                  <div>Beginn: {{ formatTime(event.start) }} Uhr</div>
                  <div>Einlass: {{ formatTime(event.doorsOpen) }} Uhr</div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="d-flex align-start mb-2 d-flex">
                <v-icon class="mr-2" color="error" icon="mdi-map-marker" />
                <div>
                  <div>{{ event.venue.name }}</div>
                  <div>{{ event.venue.street }}</div>
                  <div>{{ event.venue.zipCode }}, {{ event.venue.city }}</div>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-divider />

          <div class="text-body-1 my-4" v-html="event.description" />
        </v-col>

        <v-col cols="12" md="4">
          <TicketSelector :soldout="event.soldout" :ticket-options="event.areas[0].prices" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const route = useRoute()
  const eventId = (route.params as { eventId: string }).eventId
  const event = ref<object | null>(null)
  const loading = ref<boolean>(true)

  onMounted(async () => {
    event.value = await store.getEventDetails(eventId);
    loading.value = false
  })

  function formatDate (dateVal) {
    const date = new Date(dateVal);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const customDate = `${day}.${month}.${year}`;
    return customDate
  }

  function formatTime (timeVal) {
    const date = new Date(timeVal);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const customTime = `${hours}:${minutes}`;
    return customTime
  }
</script>
