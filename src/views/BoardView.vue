<template>
  <div class="pb-8">
    <BoardSwitcher @change="updateBoard" />
  </div>
  <div class="flex flex-wrap justify-strech gap-3 pb-8">
    <!-- Para passar a cor via v-bind é necessário colocar as classes css na safelist no tailwind.config.js. -->
    <WorkflowCard
      v-for="workflow in workflows" 
      :board-id="boardId"
      :id="workflow.id"
      :name="workflow.name"
      :class="workflow.color"
    />       
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WorkflowDataService from '../services/WorkflowDataService'
import BoardSwitcher from '../components/BoardSwitcher.vue'
import WorkflowCard from '../components/WorkflowCard.vue'

const workflows = ref([])
const boardId = ref(0)

const updateWorkflows = async () => {
  WorkflowDataService.getAll()
    .then((response) => {
      workflows.value = response
    })
    .catch((e) => {
      console.log(e)
    })
}

const updateBoard = (board) => {
  boardId.value = board.id
  updateWorkflows()
}

onMounted(() => {
  updateWorkflows()
})
</script>
