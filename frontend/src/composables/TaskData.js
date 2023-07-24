import http from '@/http-common'
import { watchEffect, toValue, computed } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'
import { useAsyncState } from '@vueuse/core'
import { useBaseFetch } from '@/composables/BaseData'
import { useFetchPriorities } from '@/composables/PriorityData'

//Fetch tasks from api
/*
*
      let url = '/tasks'
      if (id && !bID && !wID) url = `/tasks/${id}`
      if (!id && bID && !wID) url = `/tasks?board_id=${bID}`
      if (!id && !bID && wID) url = `/tasks?workflow_id=${wID}`
      if (!id && bID && wID) url = `/tasks?board_id=${bID}&workflow_id=${wID}`
      if (id && bID && wID) url = `/tasks/${id}/?board_id=${bID}&workflow_id=${wID}`

*/
export async function useFetchTasks(taskId,boardId,workflowId,options={}) {
  const url = computed(()=> {
    let classUrl = '/classes/tasks'
    const _taskId = toValue(taskId)
    const _boardId = toValue(boardId)
    const _workflowId = toValue(workflowId)
    //console.log(_taskId)
    let search = '?include="board,workflow,priority"&where={'
    if (_taskId && !_boardId && !_workflowId) {
      search += encodeURI(`"objectId":"${_taskId}"`)
    }
    if (!_taskId && _boardId && !_workflowId) {
      search += encodeURI(`
        "workflow": {
          "__type": "Pointer",
          "className": "boards",
          "objectId": "${_boardId}"
        }
      `)
    }
    if (!_taskId && !_boardId && _workflowId) {
      search += encodeURI(`
        "workflow": {
          "__type": "Pointer",
          "className": "workflows",
          "objectId": "${_workflowId}"
        }
      `)
    }    
    if (!_taskId && _boardId && _workflowId) {
      search += encodeURI(`
        "board": {
            "__type": "Pointer",
            "className": "boards",
            "objectId": "${_boardId}"
        },
        "workflow": {
            "__type": "Pointer",
            "className": "workflows",
            "objectId": "${_workflowId}"
        }
      `)   
    }    
    search += '}'

    return classUrl+search
  })  

  return useBaseFetch(url, { refetch: true, showLoading: true, ...options })
}

//Add a new task using api
export async function useAddTask(title,boardId,workflowId) {
  const _title = toValue(title)
  const _boardId = toValue(boardId)
  const _workflowId = toValue(workflowId)
  const store = useUserStore()

  const { data:priority } = await useFetchPriorities(null,"Baixa")

  const _priorityId = priority.value.objectId
  const _userId = store.user.objectId

  return useBaseFetch('/classes/tasks').post(`
    {
      "title": "${_title}",
      "description": "",
      "priority": {
        "__type": "Pointer",
        "className": "priorities",
        "objectId": "${_priorityId}"        
      },
      "workflow": {
        "__type": "Pointer",
        "className": "workflows",
        "objectId": "${_workflowId}"        
      },
      "board": {
        "__type": "Pointer",
        "className": "boards",
        "objectId": "${_boardId}"        
      },
      "owner": {
        "__type": "Pointer",
        "className": "_Users",
        "objectId": "${_userId}"        
      },      
      "subtasks": [],
      "order": 0
    }
  `)
}


//Update task using api
export function useUpdateTask(options={}) {

  const { showLoading = true } = options
  const loaderStore = useLoaderStore()
  const notificationStore = useNotificationStore()

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
      onSuccess: () => { handleSuccess() },
      onError: () => { handleError() }
    }
  ) 
  
  const handleError = () => {
    notificationStore.error(`${error.value.code} - ${error.value.message}`)
    if(showLoading) loaderStore.setLoading(false) 
  }

  const handleSuccess = () => {
    notificationStore.success(`Tarefa atualizada com sucesso`)
    if(showLoading) loaderStore.setLoading(false) 
  } 

  const update = (task) => {
    loaderStore.setLoading(true)
    execute(0, { t: task})
  }

  return { task: state, error, isLoading, isReady, update }
}

//Remove task using api
export function useRemoveTask(options={}) {

  const { showLoading = true } = options
  const loaderStore = useLoaderStore()
  const notificationStore = useNotificationStore()

  //Remove task using api (useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      return http.delete(`/tasks/${id}`).then(response => response.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { handleSuccess() },
      onError: () => { handleError() }
    }
  ) 
  
  const handleError = () => {
    notificationStore.error(`${error.value.code} - ${error.value.message}`)
    if(showLoading) loaderStore.setLoading(false) 
  }

  const handleSuccess = () => {
    notificationStore.success(`Tarefa removida com sucesso`)
    if(showLoading) loaderStore.setLoading(false) 
  } 

  const remove = (taskId) => {
    loaderStore.setLoading(true)
    execute(0, { id: taskId })
  }

  return { task: state, error, isLoading, isReady, remove }
}