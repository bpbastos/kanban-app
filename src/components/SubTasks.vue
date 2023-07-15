<template>
  <div>
    <label class="label space-x-1">
      <span class="text-base label-text uppercase font-normal">sub tarefas:</span>
    </label>
    <div>
      <TaskProgressBar :total-tasks="totalSubTasks" :total-tasks-done="totalSubTasksDone" />
      <ul>
        <li
          v-for="(st, index) in subTasks"
          class="flex justify-between items-center mt-1 w-full p-2 hover:bg-base-200"
          @click.stop="updateSubTask(st)"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-md checkbox-success"
            v-model="st.done"
            @click.stop="updateSubTask(st)"
          />
          <p class="w-full ml-2 font-semibold" :class="st.done ? 'line-through' : ''" >
            {{ st.text }}
          </p>
          <div class="text-lg text-error font-semibold hover:bg-error hover:text-base-100" @click="removeSubTask(index)">
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <input
      type="title"
      id="title"
      v-model="newSubTask"
      @keydown.enter.exact.prevent="addSubTask"
      placeholder="Adicionar uma sub tarefa..."
      class="input input-bordered input-primary w-full mt-2 font-semibold"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskProgressBar from '@/components/TaskProgressBar.vue';

const props = defineProps({
  subTasks: Array
})

const newSubTask = ref('')
const totalSubTasks = ref(0)
const totalSubTasksDone = ref(0)

const updateTotals = () => {
  totalSubTasks.value = props.subTasks?.length
  totalSubTasksDone.value = props.subTasks.filter((item) => {
    return item.done
  })?.length 
}

const addSubTask = () => {
  if (newSubTask.value.trim().length > 0) {
    const subTaskItem = {
      text: newSubTask.value.trim(),
      done: false
    }
    props.subTasks.push(subTaskItem)
    newSubTask.value = ''
    updateTotals()
  }
}

const removeSubTask = (i) => {
  props.subTasks.splice(i, 1)
  updateTotals()
}

const updateSubTask = (subtask) => {
  subtask.done = !subtask.done
  updateTotals()
}

updateTotals()
</script>
