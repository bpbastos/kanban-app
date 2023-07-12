import { ref } from 'vue'
import http from '@/http-common'

const tasks = ref([])
const task = ref(null)
const error = ref(null)

export async function useTasks(boardId = 0, workflowId = 0) {
  try {
    const response = await http.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
    tasks.value = response.data
   } catch (e) {
    error.value = e
   }
}

export default function useTaskData(id = 0, boardId = 0, workflowId = 0) {
  const tasks = ref([])
  const task = ref(null)
  const error = ref(null)

  async function fetch() {
    try {
      //Get all tasks
      if (!id && !boardId && !workflowId) {
        const response = await http.get('/tasks')
        tasks.value = response.data
        //Get all tasks filtered by boardId and workflowId
      } else if (boardId && workflowId) {
        const response = await http.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
        tasks.value = response.data
        //Get one task by id
      } else if (id) {
        const response = await http.get(`/tasks/${id}`)
        task.value = response.data
      }
    } catch (e) {
      error.value = e
    }
  }

  async function update(t) {
    try {
      let response = null
      response = await http.get(`/priorities/${t.priority_id}`)
      priority = response.data
      response = await http.patch(`/tasks/${t.id}`, {
        id: t.id,
        title: t.title,
        description: t.description,
        subtasks: t.subtasks,
        priority_id: t.priority_id,
        priority: priority
      })
      task.value = response.data
    } catch (e) {
      error.value = e
    }
  }

  async function add(title, boardId, workflowId) {
    try {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const currentDate = `${day}-${month}-${year}`
      const priorityId = 1
      let response = null
      response = await http.get(`/workflows/${workflowId}`)
      const workflow = response.data
      response = await http.get(`/priorities/${priorityId}`)
      const priority = response.data
      response = await http.get(`/boards/${boardId}`)
      const board = response.data

      response = await http.post('/tasks', {
        title: title,
        description: '',
        priority: priority,
        workflow: workflow,
        board: board,
        subtasks: [],
        board_id: boardId,
        order: 0,
        workflow_id: workflowId,
        priority_id: priorityId,
        date_added: currentDate
      })
      task.value = response.data
    } catch (e) {
      error.value = e
    }
  }

  async function remove(id) {
    try {
      const response = await http.delete(`/tasks/${id}`)
      task.value = response.data
    } catch (e) {
      error.value = e
    }
    return await http.delete(`/tasks/${id}`)
  }

  return { task, tasks, error, fetch, add, update, remove }
}
