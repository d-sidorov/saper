<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <div class="p-4 pt-16 min-h-screen flex items-center justify-center">
    <RouterView />
  </div>
</template>
