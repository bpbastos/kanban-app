<template>
  <div class="h-full w-[265px] rounded-lg pt-1 drop-shadow-xl">
    <section class="flex flex-col rounded-b-lg bg-board drop-shadow-xl">
      <p class="text-secondary text-lg font-medium m-3">{{ name }}</p>
      <div class="max-h-[568px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-slate-300 ml-2 mr-2 space-y-2">
        <TaskCard v-for="task in tasks" :id="task.id" :priority="task.priority" :title="task.title"
          :total-sub-tasks-done="task.subtasks?.filter((item) => { return item.done })?.length"
          :total-sub-tasks="task.subtasks?.length" @delete="updateTasks(boardId, id)" />
        <AddTaskForm v-show="isAddNewTaskButtonClicked" :workflow-id="id" :board-id="boardId"
          @cancel="isAddNewTaskButtonClicked = false"
          @add="updateTasks(boardId, id); isAddNewTaskButtonClicked = false" />
      </div>
      <a href="#" @click="showAddNewTaskForm"  v-show="!isAddNewTaskButtonClicked"
        class="flex flex-row m-3 items-center  text-secondary text-base font-semibold rounded hover:bg-gray-300">
        <i class="fa-solid fa-plus"></i>
        <p class="ml-2">Adicionar uma tarefa</p>
      </a>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TaskCard from '@/components/TaskCard.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import TaskDataService from '@/services/TaskDataService'

const tasks = ref([])
const isAddNewTaskButtonClicked = ref(false)

const props = defineProps({
  name: String,
  id: Number,
  boardId: Number
})

const updateTasks = async (boardId, workflowId) => {
  TaskDataService.getByBoardIdAndWorkflowId(boardId, workflowId)
    .then((response) => {
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

watch(() => props.boardId, () => {
  updateTasks(props.boardId, props.id)
})

</script>
