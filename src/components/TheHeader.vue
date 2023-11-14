<script setup lang="ts">
import MyButton from '@components/UI/MyButton.vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { game, leaderBoard } from '@router/routes'

const router = useRouter()
const currentRoute = useRoute()
const routes = [game, leaderBoard]

const goToRoute = (route: RouteRecordRaw) => {
  router.push(route)
}
</script>

<template>
  <div class="w-screen fixed top-0 left-0 p-2 shadow-md bg-white">
    <div class="container flex justify-center gap-x-6 mx-auto">
      <MyButton
        v-for="route in routes"
        :key="route.path"
        @click="goToRoute(route)"
        :color="route.name === currentRoute.name ? 'green-300' : 'white'"
      >
        {{ route.meta?.title }}
      </MyButton>
    </div>
  </div>
</template>
