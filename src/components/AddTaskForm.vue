<template>
  <div class="flex flex-col w-full">
    <input
      type="text"
      placeholder="Insira um título para tarefa..."
      class="input input-primary input-md"
      maxlength="45"
      v-model="newTaskTitle"
      tabindex="0"      
      ref="newTaskTitleInput"
      @keyup.enter="addNewTask"
      @keyup.esc="emit('cancel')"
    />
    <div class="flex text-sm mt-2 gap-1">
      <button class="btn btn-xs btn-success" @click="addNewTask">
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
      <button class="btn btn-xs btn-error " @click="emit('cancel')">
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
import { ref, onUpdated, nextTick, isRef } from 'vue'
import { useAddTask } from '@/composables/TaskData'

const props = defineProps({
  workflowId: Number,
  boardId: Number
})

const emit = defineEmits(['add', 'cancel'])
const { task, error, add }  = useAddTask(true)
const newTaskTitle = ref('')
const newTaskTitleInput = ref(null)

const addNewTask = async() => {
  if (newTaskTitle.value.trim().length) {
    await add(newTaskTitle.value.trim(), props.boardId, props.workflowId)
    if (isRef(task)) {
      emit('add')
    }    
  }
}

//Focus no input assim que o elemento é exibido no DOM
onUpdated(() => {
  nextTick(() => {
    newTaskTitleInput.value.focus()
  });
})

</script>
