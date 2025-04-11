<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4">Kommende Events</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="event in store.events"
        :key="event.id"
        cols="12"
        lg="4"
        sm="6"
        xl="3"
      >
        <EventTile :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  onMounted(() => {
    if (!store.events) {
      store.getEventList();
    }
  })
</script>
