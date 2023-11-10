import { createRouter, createWebHistory } from 'vue-router'
import { main, game, leaderBoard } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...main,
      redirect: game,

      children: [game, leaderBoard]
    }
  ]
})

export default router
