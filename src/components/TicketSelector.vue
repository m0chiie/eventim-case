<template>
  <v-card
    class="ticket-selector mx-auto my-12"
    rounded="lg"
  >
    <v-card-title>Tickets Buchen</v-card-title>
    <v-divider />
    <v-card-text>Freie Platzwahl</v-card-text>
    <v-card-text>
      <ul>
        <li
          v-for="ticket in localTickets"
          :key="ticket.id"
          class="ticket-selector-item mb-3 d-flex align-center justify-space-between"
        >
          <div>
            <div>{{ ticket.name }}</div>
            <div class="font-weight-bold">{{ formatPrice(ticket.price.value) }}</div>
          </div>
          <div v-if="!props.soldout" class="quantity-selector d-flex align-center">
            <v-btn
              class="ml-3"
              color="primary"
              :disabled="ticket.quantity === 0"
              icon="mdi-minus"
              round
              size="x-small"
              @click="decrease(ticket)"
            />
            <span class="ml-3">{{ ticket.quantity }}</span>
            <v-btn
              class="ml-3"
              color="primary"
              icon="mdi-plus"
              round
              size="x-small"
              @click="increase(ticket)"
            />
          </div>
          <div v-else>
            Ausverkauft
          </div>
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-btn
        append-icon="mdi-arrow-right"
        block
        color="primary"
        :disabled="props.soldout"
        :text="`${totalTickets} ${totalTickets === 1 ? 'Ticket' : 'Tickets'} ${ formatPrice(totalPrice) }`"
        variant="flat"
      />
    </v-card-actions>
    <v-card-text class="text-caption text-center">inkl. USt. und Versandkosten</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  const props = defineProps([
    'ticketOptions',
    'soldout',
  ])

  const localTickets = reactive<object[]>([])

  const totalTickets = computed(() =>
    localTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)
  )

  const totalPrice = computed(() =>
    localTickets.reduce((sum, ticket) => {
      return sum + ticket.quantity * ticket.price.value
    }, 0)
  )

  function increase (ticket: object) {
    ticket.quantity++
  }

  function decrease (ticket: object) {
    if (ticket.quantity > 0) ticket.quantity--
  }

  function formatPrice (price) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  watch(
    () => props.ticketOptions,
    newOptions => {
      localTickets.splice(0, localTickets.length, ...newOptions.map(ticket => ({
        ...ticket,
        quantity: 0,
      })))
    },
    { immediate: true }
  )
</script>
