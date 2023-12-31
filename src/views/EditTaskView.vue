<template>
   <div v-if="task" class="flex items-center justify-center w-12/12">
    <div class="card pt-[2px] bg-primary shadow-2xl w-full">
      <div class="card bg-base-200 p-4">
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
              <PriorityRadioGroup :selected-priority-id="task.priority_id" @change="changePriority"/>
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
                :class="currentWorkflowColor"
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
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useFetchTasks, useUpdateTask } from '@/composables/TaskData'
import SubTasks from '@/components/SubTasks.vue'
import PriorityRadioGroup from '@/components/PriorityRadioGroup.vue'

const router = useRouter()

const currentPriority = ref(0)

const currentWorkflowName = ref('')
const currentWorkflowColor = ref('')

const { tasks: task, isReady: isTaskFetchDone  }  = useFetchTasks(props.id)
const { task: updTask, isReady: isTaskUpdateDone, update }  = useUpdateTask()

const props = defineProps({
  id: String
})

const updateTask = () => {
  let tempTask = {
    id: task.value.id,
    title: task.value.title,
    description: task.value.description,
    subtasks: task.value.subtasks,
    priority_id: currentPriority.value
  }
  //async update
  update(tempTask)
  watch(updTask, () => {
    if (isTaskUpdateDone.value) {
      router.push({ name: 'Board', params: { id: updTask.value.board_id } }) 
    }
  })
}

const changePriority = (id) => {
  currentPriority.value = id
}

watchEffect(() => {
    if (isTaskFetchDone.value) {
      currentPriority.value = task.value.priority_id
      currentWorkflowName.value = task.value.workflow?.name
      currentWorkflowColor.value = `bg-${task.value.workflow?.color}-400`
    }
}) 

</script>
