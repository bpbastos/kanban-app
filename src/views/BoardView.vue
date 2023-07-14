<template>
  <div class="pb-8">
    <BoardSwitcher @change="updateBoard" />
  </div>
  <div class="flex flex-wrap justify-strech gap-3 pb-8">
    <!-- Para passar a cor via v-bind é necessário colocar as classes css na safelist no tailwind.config.js. -->
    <WorkflowCard
      v-for="workflow in workflows" 
      :workflow="workflow"
      :board-id="boardId"
    />       
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetchWorkflows } from '@/composables/WorkflowData'
import BoardSwitcher from '@/components/BoardSwitcher.vue'
import WorkflowCard from '@/components/WorkflowCard.vue'

const boardId = ref(0) 
const { workflows, fetch } = useFetchWorkflows()

const props = defineProps({
  taskid: String,
})

const updateBoard = (board) => {
  boardId.value = board.id
  fetch()
}
</script>
