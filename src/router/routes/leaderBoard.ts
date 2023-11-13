import type { RouteRecordRaw } from 'vue-router'
import LeaderBoardPage from '@pages/LeaderBoardPage.vue'

export default {
  path: '/leader-board',
  name: 'Таблица лидеров',
  component: LeaderBoardPage
} as RouteRecordRaw
