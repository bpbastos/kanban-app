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
      path: '/',
      name: 'board',
      component: BoardView,
      children: [
        // this will render the UserList for these 3 URLs
        // - /users
        // - /users/list
        // - /people
        { path: '/', component: BoardView, alias: ['/board'] },
      ],
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfileView
    },
    {
      path: '/task/create/:boardId/:workflowId',
      name: 'AddTask',
      props: true,
      component: AddTaskView
    },
    {
      path: '/board/create',
      name: 'AddBoard',
      component: AddBoardView
    },                
  ],
})

export default router
