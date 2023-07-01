<template>
  <div class="rounded-lg pt-1 drop-shadow-xl" :class="`bg-${currentPriority.color}-400`" v-if="priorities?.length > 0">
    <section class="flex flex-col justify-center items-center p-3 rounded-b-lg bg-board drop-shadow-xl">
      <div class="w-full h-full bg-white rounded shadow p-4 text-sm font-medium">
        <div class="flex">
          <label for="title" class="block overflow-hidden px-3 py-2 w-3/4">
            <span class="text-gray-400 uppercase">Título:</span>
            <input type="title" id="title" v-model="task.title"
              class="border-b border-gray-300 outline-none my-3 w-full" />
          </label>
          <label for="title" class="flex flex-col overflow-hidden px-3 py-2">
            <span class="text-gray-400 uppercase">Prioridade:</span>
            <ColoredDropDown :items="priorities" :selected-id="task.priority_id" v-if="workflows?.length > 0"
              class="z-20"
              @change="changePriority" />
          </label>
        </div>
        <div class="flex">
          <SubTasks class="w-3/4"/>
          <label for="title" class="flex flex-col justify-end overflow-hidden ml-2 mb-2">
            <span class="text-gray-400 uppercase">Workflow:</span>
            <ColoredDropDown :items="workflows" :selected-id="task.workflow_id" v-if="workflows?.length > 0"
              class="z-10"
              @change="changeWorkflow" />
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubTasks from '@/components/SubTasks.vue'
import ColoredDropDown from '@/components/ColoredDropDown.vue'
import TaskDataService from '@/services/TaskDataService'
import WorkflowDataService from '@/services/WorkflowDataService'
import PriorityDataService from '@/services/PriorityDataService'

const task = ref([])
const workflows = ref([])
const priorities = ref([])
const currentWorkflow = ref('')
const currentPriority = ref('')

const props = defineProps({
  id: String
})

const changeWorkflow = (workflow) => {
  currentWorkflow.value = workflow
}

const changePriority = (priority) => {
  currentPriority.value = priority
}

TaskDataService.getById(props.id)
  .then((response) => {
    task.value = response.data
    PriorityDataService.getAll()
      .then((response) => {
        priorities.value = response.data
        currentPriority.value = priorities.value.find(function (item) {
          return task.value.priority_id == item.id
        })
      })
      .catch((e) => {
        console.log(e)
      })
    WorkflowDataService.getAll()
      .then((response) => {
        workflows.value = response.data
        currentWorkflow.value = workflows.value.find(function (item) {
          return task.value.workflow_id == item.id
        })
      })
      .catch((e) => {
        console.log(e)
      })
  })
  .catch((e) => {
    console.log(e)
  })
</script>
