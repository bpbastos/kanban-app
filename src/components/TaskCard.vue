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
      <TaskProgressBar :total-tasks="totalSubTasks" :total-tasks-done="totalSubTasksDone" />
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
import TaskProgressBar from './TaskProgressBar.vue';

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
