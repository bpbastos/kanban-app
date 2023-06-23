import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '../views/BoardView.vue'
import CalendarView from '../views/CalendarView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import AddBoardView from '../views/AddBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board',
      name: 'board',
      component: BoardView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/user/profile',
      name: 'user_profile',
      component: UserProfileView
    },
    {
      path: '/addtask',
      name: 'add_task',
      component: AddTaskView
    },
    {
      path: '/addboard',
      name: 'add_board',
      component: AddBoardView
    },                
  ],
})

export default router
