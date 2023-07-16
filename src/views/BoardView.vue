<template>
  <div class="pb-8">
    <BoardSwitcher @loaded="goToFirstBoard" />
  </div>
  <div class="flex flex-wrap justify-strech gap-3 pb-8">
    <!-- To pass the tailwind color classes via v-bind it's needed to put the classes on safelist in tailwind.config.js file -->
    <WorkflowCard
      v-for="workflow in workflows" 
      :workflow-id="workflow.id"
      :board-id="boardId"
      :workflow="workflow"
    />       
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFetchWorkflows } from '@/composables/WorkflowData'
import BoardSwitcher from '@/components/BoardSwitcher.vue'
import WorkflowCard from '@/components/WorkflowCard.vue'

const router = useRouter()
const route = useRoute()

const { id: boardId } = toRefs(props)
const { workflows } = useFetchWorkflows()

const props = defineProps({
  id: Number,
})

const goToFirstBoard = (board) => {
  //Only if boardId is missing
  if (!route.params.id)
    router.push({ name: 'Board', params: { id: board.id } })   
}
</script>
