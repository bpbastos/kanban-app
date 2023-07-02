<template>
  <div class="card card-compact glass w-full shadow-2xl bg-base-100 text-xs p-2 cursor-pointer">
    <div class="card-actions justify-between">
      <div class="badge font-semibold p-3 justify-start" :class="`badge-${priorityColor}`">
        {{ priorityLabel }}
      </div>
      <button
        class="btn btn-xs btn-square btn-error cursor-not-allowed"
        @click="showModal = !showModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div @click="goToEditTask">
      <p class="card-actions text-base text-base-content m-2">{{ title }}</p>
      <div class="card-actions justify-between items-center" v-show="totalSubTasks > 0">
        <div class="badge font-semibold" :class="totalSubTasks==totalSubTasksDone?'badge-success':'badge-info'">
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
          class="progress shadow-2xl w-4/6" :class="totalSubTasks==totalSubTasksDone?'progress-success':'progress-info'"
          :value="totalSubTasksDone"
          :max="totalSubTasks"
        ></progress>
      </div>
    </div>
  </div>
  <DeleteConfirmationModal
    @delete="deleteTask"
    :show-modal="showModal"
    btn-cancel-label="Cancelar"
    btn-delete-label="Deletar"
    title="Deletar?"
    message="Deseja realmente deletar a tarefa?"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'
import TaskDataService from '../services/TaskDataService'

const emit = defineEmits(['delete'])
const router = useRouter()
const showModal = ref(false)

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
  router.push({ name: 'EditTask', params: { id: props.id } })
}

const props = defineProps({
  id: Number,
  title: String,
  priorityLabel: String,
  priorityColor: String,
  totalSubTasksDone: Number,
  totalSubTasks: Number
})
</script>
