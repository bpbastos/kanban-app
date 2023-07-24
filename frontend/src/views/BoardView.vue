<template>
  <div>
  <div class="pb-8">
    <BoardSwitcher :boards="boards" @change="changeBoard"/>
  </div>
  <div class="flex flex-wrap justify-strech gap-3 pb-8">
    <!-- To pass the tailwind color classes via v-bind it's needed to put the classes on safelist in tailwind.config.js file -->
    <Suspense>
      <WorkflowCard v-for="workflow in workflows" :workflow="workflow" :board-id="board.id" :key="workflow.id"/>
    </Suspense>
  </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import BoardSwitcher from '@/components/BoardSwitcher.vue'
import WorkflowCard from '@/components/WorkflowCard.vue'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const Parse = inject('Parse')

const board = ref(null)
const boards = ref([])
const workflows = computed(()=>{
  return board.value.workflows
})

const changeBoard = async (boardId) => {
  //await fetchBoards(boardId)
  /*board.value = boards.value.filter((b)=>{
    return b.id === boardId
  })*/
  //await fetchBoards()
  //board.value = newBoard
  //workflows.value = await newBoard.workflows
  /*workflows.value = []  
  board.value = newBoard  
  const _workflows = await newBoard.workflows
  if (Array.isArray(_workflows))
    workflows.value = _workflows
  board.value = newBoard
  const wfs = await newBoard.get("workflows")
  //workflows.value = []
  //console.log(wfs)
  if(wfs)
    wfs.map((w)=>{
      workflows.value.push(w)
    })*/
}

//Fetch all boards with workflows
const fetchBoards = async() => {
  const query = new Parse.Query('Board')
  query.include("workflows")
  boards.value = await query.find()
}

await fetchBoards()

if (Array.isArray(boards.value) && boards.value.length > 0) {
  console.log('aqui')
  board.value = boards.value[0]
  workflows.value = boards.value[0].workflows
}
</script>
