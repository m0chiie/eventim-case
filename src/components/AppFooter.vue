<template>
  <v-footer class="d-flex align-center justify-center flex-wrap flex-grow-0 py-3" color="surface-light">
    <v-btn
      v-for="link in links"
      :key="link.title"
      rounded
      :text="link.title"
      variant="text"
    />
    <div class="d-flex justify-center align-center flex-1-0-100 mt-3">
      <span class="mr-2">Powered by —</span>
      <v-img
        max-width="82px"
        src="https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/public/logos/black/eventim.svg"
      />
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  const links = [
    {
      title: 'Hilfe und Kontakt',
    },
    {
      title: 'Tickets verloren',
    },
    {
      title: 'Zahlungsmöglichkeiten',
    },
    {
      title: 'Widerruf',
    },
    {
      title: 'AGB',
    },
    {
      title: 'Datenschutz',
    },
    {
      title: 'Impressum',
    },
  ]
</script>
