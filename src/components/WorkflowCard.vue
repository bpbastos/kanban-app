<template>
  <div class="h-full w-[265px] rounded-lg pt-1 drop-shadow-xl">
    <section class="flex flex-col rounded-b-lg bg-board drop-shadow-xl">
      <p class="text-secondary text-lg font-medium p-4">{{ name }}</p>
      <div class="max-h-[568px] overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-slate-300 m-2 ml-2 mr-2 space-y-2">
        <TaskCard v-for="task in tasks"
        :priority="task.priority"
        :title="task.title"
        :attachments=task.attachmentsAmount
        :comments=task.commentsAmount
      />
      </div>
      <RouterLink :to="`/addtask?board_id=${boardId}&workflow_id=${id}`" class="flex flex-row p-4 items-center justify-center text-secondary text-base font-medium">
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
