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
import { useFetchWorkflows } from '@/composables/WorkflowData'
import BoardSwitcher from '../components/BoardSwitcher.vue'
import WorkflowCard from '../components/WorkflowCard.vue'

//const workflows = ref([])
const { workflows, error, fetch } = useFetchWorkflows(true)
const boardId = ref(0)

const props = defineProps({
  taskid: String,
})

const updateWorkflows = async () => {
  await fetch()
}

const updateBoard = (board) => {
  boardId.value = board.id
  updateWorkflows()
}

onMounted(() => {
  updateWorkflows()
})

</script>
