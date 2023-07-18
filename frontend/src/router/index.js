import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView.vue'
import CalendarView from '@/views/CalendarView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import EditTaskView from '@/views/EditTaskView.vue'
import AddBoardView from '@/views/AddBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/board',
    },    
    {
      path: '/board/:id?',
      name: 'Board',
      component: BoardView,
      props(route) {
        return {
          id: route.params.id ? parseInt(route.params.id) : 0
        }
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarView
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfileView
    },
    {
      path: '/task/edit/:id',
      name: 'EditTask',
      props: true,
      component: EditTaskView
    },
    {
      path: '/board/create',
      name: 'AddBoard',
      component: AddBoardView
    },   
  ],
})

export default router
