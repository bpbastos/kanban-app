<template>
  <article class="flex flex-col rounded-lg bg-white drop-shadow-xl p-2 space-y-2 cursor-pointer" @click="goToEditTask">
    <div class="flex justify-between">
      <span class="block w-24 rounded  p-1 text-center text-xs font-light text-white opacity-80" :class="priorityColor">
        {{ priorityLabel }}
      </span>
      <div class="text-red-400 hover:text-red-700 cursor-pointer text-xs w-2/2"
        :class="priority ? 'w-2/2' : 'content-end'" @click="deleteTask">
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z">
          </path>
        </svg>
      </div>
    </div>
    <span class="text-base font-normal text-gray-900">{{ title }}</span>
    <div class="flex flex-row space-x-1 justify-between items-center text-xs">
      <div class="flex items-center" v-show="totalSubTasks > 0">
        <div class="bg-blue-100 flex rounded-3xl px-1 sm:px-1.5 py-0.5 text-blue-900 mr-1">
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z">
            </path>
          </svg>
          <h4 class="tracking-wider">{{ totalSubTasksDone }}/{{ totalSubTasks }}</h4>
        </div>
        <progress class="shadow-2xl w-12 sm:w-20" :value="totalSubTasksDone" :max="totalSubTasks"></progress>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import TaskDataService from '../services/TaskDataService'

const emit = defineEmits(['delete'])
const priorityLabel = ref('')
const priorityColor = ref('')
const router = useRouter()

const setPriorityLabel = (p) => {
  if (p === "low") {
    priorityLabel.value = 'Prioridade Baixa'
    priorityColor.value = 'bg-blue-500'
  } else if (p === "normal") {
    priorityLabel.value = 'Prioridade Média'
    priorityColor.value = 'bg-green-500'
  } else if (p === "high") {
    priorityLabel.value = 'Prioridade Alta'
    priorityColor.value = 'bg-purple-500'
  }
}

const deleteTask = () => {
  TaskDataService.delete(props.id)
    .then((response) => {
      emit('delete', props.id)
    })
    .catch((e) => {
      console.log(e)
    })
}

const goToEditTask = () => {
  router.push({name:'EditTask', params: {id: props.id}})
}

const props = defineProps({
  id: Number,
  priority: String,
  title: String,
  totalSubTasksDone: Number,
  totalSubTasks: Number
})

setPriorityLabel(props.priority)

</script>
