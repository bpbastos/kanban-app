<template>
  <div class="card w-[265px] max-h-screen h-full pt-[3px]" :class="borderColor">
    <div class="card bg-base-300 overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-primary">
      <p class="card-title text-base-content text-lg font-medium m-3">{{ name }}</p>
      <div class="card-actions justify-center ml-2 mr-2">
        <TaskCard v-for="task in tasks" :id="task.id" :priority-label="task.priority.name"
          :priority-color="task.priority.color" :title="task.title" :total-sub-tasks-done="task.subtasks?.filter((item) => {
            return item.done
          })?.length
            " :total-sub-tasks="task.subtasks?.length" @delete="updateTasks(boardId, id)" />

        <AddTaskForm v-show="isAddNewTaskButtonClicked" :workflow-id="id" :board-id="boardId"
          @cancel="isAddNewTaskButtonClicked = false" @add="updateTasks(boardId, id); isAddNewTaskButtonClicked = false" />

      </div>
      <div class="card-actions m-3">
        <a href="#" @click="showAddNewTaskForm" v-show="!isAddNewTaskButtonClicked"
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
import { ref, watch } from 'vue'
import TaskCard from '@/components/TaskCard.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import TaskDataService from '@/services/TaskDataService'

const tasks = ref([])
const isAddNewTaskButtonClicked = ref(false)

const props = defineProps({
  name: String,
  id: Number,
  borderColor: String,
  boardId: Number
})

const updateTasks = async (boardId, workflowId) => {
  TaskDataService.getByBoardIdAndWorkflowId(boardId, workflowId)
    .then((response) => {
      isAddNewTaskButtonClicked.false
      tasks.value = response.data
    })
    .catch((e) => {
      console.log(e)
    })
}

const showAddNewTaskForm = () => {
  isAddNewTaskButtonClicked.value = true
}

//created hook
updateTasks(props.boardId, props.id)

watch(
  () => props.boardId,
  () => {
    updateTasks(props.boardId, props.id)
  }
)
</script>
