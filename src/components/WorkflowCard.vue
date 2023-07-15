<template>
  <div class="card w-[265px] max-h-screen h-full pt-[3px]" :class="`bg-${workflow.color}-400`">
    <div class="card bg-base-200 overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary">
      <p class="card-title text-base-content text-lg font-medium m-3">{{ workflow.name }}</p>
      <div class="card-actions justify-center ml-2 mr-2">
        <TaskCard v-for="task in tasks" :task="task" @deleted="updateTasks" :key="task.id"/>
        <AddTaskForm v-show="isAddNewTaskButtonClicked" :workflow-id="workflow.id" :board-id="boardId" @added="updateTasks" @canceled="isAddNewTaskButtonClicked = false" />
      </div>
      <div class="card-actions m-3">
        <a href="#" v-show="!isAddNewTaskButtonClicked" @click="isAddNewTaskButtonClicked = true"
          class="flex flex-row w-full items-center text-base-content font-semibold rounded hover:bg-base-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p class="ml-2">Adicionar uma tarefa</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watchEffect } from 'vue'
import TaskCard from '@/components/TaskCard.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import { useFetchWorkflows } from '@/composables/WorkflowData'
import { useFetchTasks } from '@/composables/TaskData'

const props = defineProps({
  workflowId: {
    type: Number,
    required: true
  },  
  boardId: {
    type: Number,
    required: true
  },
  workflow: Object
})

const isAddNewTaskButtonClicked = ref(false)

//Converts props to ref to keep reactivity
const { boardId, workflowId } = toRefs(props)

//Fetch tasks from api and keeps updated 
const { tasks, isReady: isTasksFetchDone, fetch } = useFetchTasks(0, boardId, workflowId)


if (props.workflow !== null) {
  //Fetch workflow from api and keeps updated 
  const { workflows: workflow } = useFetchWorkflows(workflowId)
} else {
  const { workflow } = toRefs(props)
}

const updateTasks = () => {
  fetch(0, boardId.value, workflowId.value)
  watchEffect(() => {
    if (isTasksFetchDone.value) {
      isAddNewTaskButtonClicked.value = false
    }
  })
}

</script>
