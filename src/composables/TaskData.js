import http from '@/http-common'
import { watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch tasks from api
export function useFetchTasks(taskId=0,boardId=0,workflowId=0,options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

  //Get task from api (using useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      const bID = args?.bID || 0
      const wID = args?.wID || 0

      let url = '/tasks'
      if (id && !bID && !wID) url = `/tasks/${id}`
      if (!id && bID && !wID) url = `/tasks?board_id=${bID}`
      if (!id && !bID && wID) url = `/tasks?workflow_id=${wID}`
      if (!id && bID && wID) url = `/tasks?board_id=${bID}&workflow_id=${wID}`
      if (id && bID && wID) url = `/tasks/${id}/?board_id=${bID}&workflow_id=${wID}`

      //console.log(url)
      //console.log(args)
      return http.get(url).then(response => response.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const fetch = (_taskId, _boardId, _workflowId) => {
    execute(0, { id: toValue(_taskId), bID: toValue(_boardId), wID: toValue(_workflowId) })
  }

  watchEffect(() => {
    store.setLoading(true)
    fetch(taskId, boardId, workflowId)
  })

  return { tasks: state, error, isLoading, isReady, fetch }
}

//Add a new task using api
export function useAddTask(options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

  //Add task using api (useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    async(args) => {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const currentDate = `${day}-${month}-${year}`
      const priorityId = 1
      const workflow = await http.get(`/workflows/${args.wID}`).then(r => r.data)
      const priority = await http.get(`/priorities/${priorityId}`).then(r => r.data)
      const board = await http.get(`/boards/${args.bID}`).then(r => r.data)
      return http.post('/tasks', {
        title: args.t,
        description: '',
        priority: priority,
        workflow: workflow,
        board: board,
        subtasks: [],
        board_id: args.bID,
        order: 0,
        workflow_id: args.wID,
        priority_id: priorityId,
        date_added: currentDate
      }).then(r => r.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const add = (title, boardId, workflowId) => {
    store.setLoading(true)
    execute(0, { t: title, bID: boardId, wID: workflowId})
  }

  return { task: state, error, isLoading, isReady, add }
}


//Update task using api
export function useUpdateTask(options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

  //Add task using api (useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    async(args) => {
      const priority = await http.get(`/priorities/${args.t.priority_id}`).then(r => r.data)
      return http.patch(`/tasks/${args.t.id}`, {
        id: args.t.id,
        title: args.t.title,
        description: args.t.description,
        subtasks: args.t.subtasks,
        priority_id: args.t.priority_id,
        priority: priority
      }).then(r => r.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const update = (task) => {
    store.setLoading(true)
    execute(0, { t: task})
  }

  return { task: state, error, isLoading, isReady, update }
}

//Remove task using api
export function useRemoveTask(options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

  //Remove task using api (useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      return http.delete(`/tasks/${id}`).then(response => response.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const remove = (taskId) => {
    store.setLoading(true)
    execute(0, { id: taskId })
  }

  return { task: state, error, isLoading, isReady, remove }
}