<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <div class="p-4 pt-16 h-screen flex items-center justify-center w-screen">
    <RouterView />
  </div>
</template>
