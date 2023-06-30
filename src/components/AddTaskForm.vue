<template>
    <div class="flex flex-col space-y-2">
        <input maxlength="45" type="text" v-model="newTaskTitle" ref="newTaskTitleInput" @keyup.enter="addNewTask" @keyup.esc="emit('cancel')"
            class="rounded bg-white appearance-none p-3 text-sm border-2 focus:outline-none focus:bg-white focus:border-secondary"
            placeholder="Insira um título para tarefa...">
        <div class="flex pb-3 gap-1 text-sm">
            <button @click="addNewTask">
                <svg class="w-5 h-5 text-white rounded shadow bg-green-400 hover:bg-green-600 active:bg-green-800 active:border-2 border-gray-300"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
            <button @click="emit('cancel')">
                <svg class="w-5 h-5 text-white rounded shadow bg-red-400 hover:bg-red-600 active:bg-red-800 active:border-2 border-gray-300"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
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
            })
            .catch((e) => {
                console.log(e)
            })
        newTaskTitle.value = ''
    }
}
</script>