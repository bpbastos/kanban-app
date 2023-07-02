<template>
  <div>
    <label class="label space-x-1">
      <span class="text-base label-text uppercase font-normal">sub tarefas:</span>
    </label>
    <div>
      <div class="flex justify-stretch items-center space-x-1 m-2" v-show="totalSubTasks > 0">
        <div
          class="badge font-semibold"
          :class="totalSubTasks == totalSubTasksDone ? 'badge-success' : 'badge-info'"
        >
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="19"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
            ></path>
          </svg>
          <p class="tracking-wider">{{ totalSubTasksDone }}/{{ totalSubTasks }}</p>
        </div>

        <progress
          class="progress shadow-2xl"
          :class="totalSubTasks == totalSubTasksDone ? 'progress-success' : 'progress-info'"
          :value="totalSubTasksDone"
          :max="totalSubTasks"
        ></progress>
      </div>
      <ul>
        <li
          v-for="(st, index) in subTasks"
          class="flex justify-between items-center mt-1 w-full p-2 hover:bg-base-200"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-md checkbox-success"
            v-model="st.done"
            @click="updateSubTask(st)"
          />
          <p class="w-full ml-2 font-semibold" :class="st.done ? 'line-through' : ''" @click="updateSubTask(st)">
            {{ st.text }}
          </p>
          <div class="text-lg text-error font-semibold" @click="removeSubTask(index)">
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

const props = defineProps({
  subTasks: Array
})

const newSubTask = ref('')
const totalSubTasks = ref(props.subTasks?.length)
const totalSubTasksDone = ref(
  props.subTasks?.filter((item) => {
    return item.done
  }).length
)

const addSubTask = (e) => {
  e.preventDefault()
  if (newSubTask.value.trim().length > 0) {
    const subTaskItem = {
      text: newSubTask.value.trim(),
      done: false
    }
    props.subTasks.push(subTaskItem)
    totalSubTasks.value = props.subTasks.length
    newSubTask.value = ''
  }
}

const removeSubTask = (i) => {
  props.subTasks.splice(i, 1)
  totalSubTasks.value = props.subTasks.length
}

const updateSubTask = (subtask) => {
  subtask.done = !subtask.done
  totalSubTasksDone.value = props.subTasks.filter((item) => {
    return item.done
  }).length
}

//console.log(props.subTasks)
</script>
