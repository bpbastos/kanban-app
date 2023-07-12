import { ref } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import http from '@/http-common'

//Get tasks 
export function useFetchTasks(showLoading=false) {
  const tasks = ref([])
  const error = ref(null)
  const store = useLoaderStore()

  //Get tasks from api
  const fetch = async(id, boardId, workflowId) => {
    //All tasks
    let url = '/tasks'
    //Get all tasks filtered by boardId and workflowId
    if (boardId && workflowId) {
      url = `/tasks?board_id=${boardId}&workflow_id=${workflowId}`
      //Get one task by id
    } else if (id) {
      url = `/tasks/${id}`
    }
    try {
      if (showLoading) store.setLoading(true)
      const response = await http.get(url)
      tasks.value = response.data
      if (showLoading) store.setLoading(false)
    } catch (error) {
      error.value = error
    }
  }

  return { tasks, error, fetch }
}


//Get one task
export function useFetchTask(showLoading=false) {
  const task = ref([])
  const error = ref(null)
  const store = useLoaderStore()

  //Get tasks from api
  const fetch = async(id) => {
    try {
      if (showLoading) store.setLoading(true)
      const response = await http.get(`/tasks/${id}`)
      task.value = response.data
      if (showLoading) store.setLoading(false)
    } catch (error) {
      error.value = error
    }
  }

  return { task, error, fetch }
}

//Add a new tasks
export function useAddTask(showLoading=false) {
  const task = ref([])
  const error = ref(null)  
  const store = useLoaderStore()

  const add = async(title, boardId, workflowId) => {
    try {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const currentDate = `${day}-${month}-${year}`
      const priorityId = 1
      let response = null
      if (showLoading) store.setLoading(true)
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
      if (showLoading) store.setLoading(false)      
    } catch (e) {
      error.value = e
    }
  }

  return { task, error, add }  
}

//Update task
export function useUpdateTask(showLoading=false) {
  const task = ref([])
  const error = ref(null)  
  const store = useLoaderStore()

  const update = async(t) => {
    try {
      let response = null
      if (showLoading) store.setLoading(true)
      response = await http.get(`/priorities/${t.priority_id}`)
      const priority = response.data
      response = await http.patch(`/tasks/${t.id}`, {
        id: t.id,
        title: t.title,
        description: t.description,
        subtasks: t.subtasks,
        priority_id: t.priority_id,
        priority: priority
      })
      task.value = response.data
      if (showLoading) store.setLoading(false)
    } catch (e) {
      error.value = e
    }
  } 

  return { task, error, update }  
}

//Remove task
export function useRemoveTask(showLoading=false) {
  const task = ref([])
  const error = ref(null)  
  const store = useLoaderStore()
  
  const remove = async(id) => {
    try {
      if (showLoading) store.setLoading(true)
      const response = await http.delete(`/tasks/${id}`)
      task.value = response.data
      if (showLoading) store.setLoading(false)
    } catch (e) {
      error.value = e
    }
    //return task.value.id
  }
  return { task, error, remove }  
}