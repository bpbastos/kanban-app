<template>
  <div class="h-full w-64 rounded-lg pt-1 drop-shadow-xl opacity-80">
    <section class="flex flex-col space-y-4 px-3 pb-3 rounded-b-lg bg-board drop-shadow-xl">
      <p class="text-secondary text-lg font-medium pt-4">{{ name }}</p>
      <TaskCard v-for="task in tasks"
        :priority="task.priority"
        :title="task.title"
        :attachments=task.attachmentsAmount
        :comments=task.commentsAmount
      />
      <RouterLink to="/addtask" class="flex flex-row space-x-2 items-center justify-center text-secondary text-base font-medium">
        <i class="fa-solid fa-plus"></i>
        <p class="">Adicionar tarefa</p>
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import TaskCard from './TaskCard.vue'
import TaskDataService from '../services/TaskDataService'

const tasks = ref([])

const props = defineProps({
  name: String,
  color: String,
  id: Number,
  boardId: Number
})

const updateTasks = async(boardId,workflowId) => {
  TaskDataService.getByBoardIdAndWorkflowId(boardId,workflowId)
    .then((response) => {
      tasks.value = response.data
    })
    .catch((e) => {
      console.log(e)
    })  
}

//created hook
updateTasks(props.boardId,props.id)

watch(() => props.boardId, () => {
  updateTasks(props.boardId,props.id)
})

</script>
