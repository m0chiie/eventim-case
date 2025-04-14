<template>
  <v-card
    class="mx-auto my-6"
    link
    rounded="lg"
    :to="`/${props.event.id}`"
  >
    <v-img
      cover
      height="250"
      :src="`https://www.eventim-light.com/de/api/image/${props.event.image.id}/shop_cover_v3/webp`"
    />

    <v-card-item>
      <v-card-title>{{ props.event.title }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ props.event.category }}</span>

        <v-icon
          color="error"
          :icon="getIconByCategoryId(props.event.categoryId)"
          size="small"
        />
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div>{{ props.event.subtitle }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1" />

    <v-card-text>
      <v-row>
        <v-col>
          <div class="text-subtitle-1">
            {{ props.event.venue.name }}, {{ props.event.venue.city }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>Datum: {{ formattedDate }}</div>
        </v-col>
        <v-col>
          <div>Uhrzeit: {{ formattedStartTime }} Uhr</div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        append-icon="mdi-arrow-right"
        block
        color="primary"
        :text="soldOut ? 'Ausverkauft' : `ab ${formatPrice(props.event.minPrice.value)}`"
        variant="flat"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  const props = defineProps([
    'event',
  ])

  const soldOut = computed(() => {
    return props.event?.soldout
  })

  const formattedDate = computed(() => {
    const date = new Date(props.event?.start);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const customDate = `${day}.${month}.${year}`;
    return customDate
  })

  const formattedStartTime = computed(() => {
    const date = new Date(props.event?.start);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const customTime = `${hours}:${minutes}`;
    return customTime
  })

  function formatPrice (price) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  function getIconByCategoryId (categoryId: string) {
    switch (categoryId) {
      case '320':
        return 'mdi-microphone-variant';
      case '100':
        return 'mdi-guitar-acoustic';
      case '240':
        return 'mdi-drama-masks';
      default:
        return '';
    }
  }
</script>
