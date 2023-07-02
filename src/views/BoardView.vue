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
      :border-color="`bg-${workflow.color}-400`"
    />       
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import WorkflowDataService from '../services/WorkflowDataService'
import BoardSwitcher from '../components/BoardSwitcher.vue'
import WorkflowCard from '../components/WorkflowCard.vue'

const workflows = ref([])
const boardId = ref(0)

const updateWorkflows = async () => {
  WorkflowDataService.getAll()
    .then((response) => {
      workflows.value = response.data
    })
    .catch((e) => {
      console.log(e)
    })
}

const updateBoard = (board) => {
  boardId.value = board.id
  const store = useLoaderStore()
  store.setLoading(true)
  updateWorkflows()
  store.setLoading(false)
}

onMounted(() => {
  updateWorkflows()
})
</script>
