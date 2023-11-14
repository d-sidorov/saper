import type { RouteRecordRaw } from 'vue-router'
import LeaderBoardPage from '@pages/LeaderBoardPage.vue'

export default {
  path: '/leader-board',
  name: 'leader-board',
  meta: {
    title: 'Таблица лидеров'
  },
  component: LeaderBoardPage
} as RouteRecordRaw
