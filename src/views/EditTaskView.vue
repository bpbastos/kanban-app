<template>
   <div v-if="task" class="flex items-center justify-center w-12/12">
    <div class="card pt-[2px] bg-primary shadow-2xl w-full">
      <div class="card bg-base-300 p-4">
        <form action="form-control p-3">
          <div class="flex space-x-2 items-center">
            <div class="w-10/12">
              <label class="label">
                <span class="text-base label-text uppercase font-normal">TÍTULO</span>
              </label>
              <input
                v-model="task.title"
                type="text"
                placeholder="Título"
                class="w-full input input-bordered input-primary font-semibold"
              />
            </div>
            <div class="w-24">
              <label class="label space-x-1">
                <span class="text-base label-text uppercase font-normal">PRIORIDADE:</span>
              </label>
              <div
                v-for="priority in priorities"
                :key="priority.id"
                class="tooltip"
                :class="`tooltip-${priority.color}`"
                :data-tip="`${priority.name}`"
              >
                <input
                  type="radio"
                  :value="priority.id"
                  v-model="currentPriority"
                  class="radio radio-sm m-1"
                  :class="`radio-${priority.color}`"
                />
              </div>
            </div>
          </div>
          <div class="flex space-x-2 items-start">
            <div class="w-10/12">
              <SubTasks v-if="task.subtasks" :sub-tasks="task.subtasks" />
            </div>
            <div class="w-36">
              <label class="label space-x-1">
                <span class="text-base label-text uppercase font-normal">STATUS:</span>
              </label>
              <div
                class="badge w-full uppercase font-semibold p-3"
                v-if="currentWorkflowName"
                :class="`bg-${currentWorkflowColor}-400`"
              >
                {{ currentWorkflowName }}
              </div>
            </div>
          </div>
          <div class="flex space-x-2 items-start">
            <div class="w-10/12">
              <label class="label space-x-1">
                <span class="text-base label-text uppercase font-normal">DESCRIÇÃO:</span>
              </label>
              <textarea
                v-model="task.description"
                type="text"
                placeholder="Descrição"
                class="textarea textarea-primary textarea-md text-base w-full mt-2 font-semibold"
              >
              </textarea>
            </div>
          </div>
          <div class="flex flex-col justify-end space-x-2 mt-2">
            <div>
              <div class="divider"></div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button
                class="btn btn-neutral"
                @keydown.enter.exact.prevent=""
                @click.prevent="router.push({ name: 'Board' })"
              >
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                @keydown.enter.exact.prevent=""
                @click.prevent="updateTask"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, isRef } from 'vue'
import { useRouter } from 'vue-router'
import SubTasks from '@/components/SubTasks.vue'
import TaskDataService from '@/services/TaskDataService'
import { useFetchTask, useUpdateTask } from '@/composables/TaskData'
import PriorityDataService from '@/services/PriorityDataService'

const router = useRouter()

const { task, errorFetch, fetch }  = useFetchTask(true)
const { taskUpd, errorUpd, update }  = useUpdateTask(true)
const priorities = ref(null)
const currentPriority = ref('')
const currentWorkflowName = ref('')
const currentWorkflowColor = ref('')

const props = defineProps({
  id: String
})

const updateTask = async() => {
  let tempTask = {
    id: task.value.id,
    title: task.value.title,
    description: task.value.description,
    subtasks: task.value.subtasks,
    priority_id: currentPriority.value
  }

  await update(tempTask)
  if (!errorUpd) {
    router.push({ name: 'Board', params: { taskid: tempTask.id } })
  }
}

PriorityDataService.getAll()
  .then((response) => {
    priorities.value = response.data
  })
  .catch((e) => {
    console.log(e)
  })

const fetchTask = async() => {
  await fetch(props.id)
  if (!errorFetch) {
    currentPriority.value = task.value.priority.id
    currentWorkflowName.value = task.value.workflow.name
    currentWorkflowColor.value = task.value.workflow.color
  }  
}

fetchTask()

</script>
