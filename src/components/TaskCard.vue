<template>
  <div class="card card-compact glass w-full shadow-2xl bg-base-100 text-xs p-2 cursor-pointer" @click="goToEditTask">
    <div class="card-actions justify-between">
      <div class="badge font-semibold p-3 justify-start" :class="priorityColor">
        {{ priorityLabel }}
      </div>
      <button
        class="btn btn-xs btn-square btn-error cursor-not-allowed"
        @click.stop="showModal = !showModal"
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
    <div>
      <p class="card-actions text-base text-base-content m-2">{{ task.title }}</p>
      <TaskProgressBar :total-tasks="totalSubTasks" :total-tasks-done="totalSubTasksDone" />
    </div>
  </div>
  <DeleteConfirmationModal
    @delete-clicked="deleteTask"
    :show-modal="showModal"
    btn-cancel-label="Cancelar"
    btn-delete-label="Deletar"
    title="Deletar?"
    message="Deseja realmente deletar a tarefa?"
  />
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRemoveTask } from '@/composables/TaskData'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue'
import TaskProgressBar from '@/components/TaskProgressBar.vue';

const router = useRouter()
const showModal = ref(false)
const { isReady, remove } = useRemoveTask()

const priorityLabel = computed(()=> props.task.priority?.name)
const priorityColor = computed(()=> "badge-"+props.task.priority?.color)
const totalSubTasks = computed(()=> props.task.subtasks?.length)
const totalSubTasksDone = computed(()=> {
  return props.task.subtasks?.filter((item) => {
            return item.done
  })?.length
})

const emit = defineEmits(['deleted'])

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const deleteTask = () => {
  remove(props.task.id)
  //Wait for api delete return
  watchEffect(() => {
    if (isReady.value) {
      emit('deleted', props.task.id)
    }
  })  
}

const goToEditTask = () => {
  router.push({ name: 'EditTask', params: { id: props.task.id } })
}
</script>
