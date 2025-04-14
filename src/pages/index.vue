<template>
  <v-container
    :class="loading && 'd-flex align-center justify-center'"
    height="100%"
    max-width="1200"
  >
    <template v-if="loading">
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </template>
    <div v-else>
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mt-4">Kommende Events</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="event in store.events"
          :key="event.id"
          cols="12"
          lg="4"
          sm="6"
        >
          <EventTile :event="event" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const loading = ref<boolean>(true)

  onMounted(async () => {
    if (!store.events) {
      await store.getEventList();
    }
    loading.value = false
  })
</script>
