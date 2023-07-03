<template>
  <div class="flex flex-col w-full">
    <input
      type="text"
      placeholder="Insira um título para tarefa..."
      class="input input-secondary input-md"
      maxlength="45"
      v-model="newTaskTitle"
      ref="newTaskTitleInput"
      tabindex="0"
      @keyup.enter="addNewTask"
      @keyup.esc="emit('cancel')"
    />
    <div class="flex text-sm mt-2 gap-1">
      <button class="btn btn-success btn-xs" @click="addNewTask">
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
      <button class="btn btn-error btn-xs" @click="emit('cancel')">
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskDataService from '../services/TaskDataService'

const props = defineProps({
  workflowId: Number,
  boardId: Number
})

const emit = defineEmits(['add', 'cancel'])

const newTaskTitle = ref('')
const newTaskTitleInput = ref(null)

const addNewTask = () => {
  if (newTaskTitle.value.trim().length) {
    TaskDataService.add(newTaskTitle.value.trim(), props.boardId, props.workflowId)
      .then((response) => {
        emit('add')
        newTaskTitle.value = ''
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

</script>
