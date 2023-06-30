<template>
    <label class="block text-secondary text-sm font-bold mb-2" for=""> Sub Tarefas </label>
    <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
        type="text" placeholder="Adicione uma sub tarefa" v-model="newSubTask" @keyup.enter="addSubTask" />
    <ul>
        <li v-for="(st, index) in subTasks"
            class="flex items-center mt-3 w-full justify-between pr-6 p-3 border border-dotted shadow bg-gray-100">
            <div class="flex w-2/3">
                <div class="mr-1" v-if="!st.done" @click="st.done = true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                            fill="rgba(47,204,47,0.67)"></path>
                    </svg>
                </div>
                <div class="mr-1" v-if="st.done" @click="st.done = false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                            fill="rgba(34,189,16,0.92)"></path>
                    </svg>
                </div>
                <h4 class="ml-2" :class="st.done ? 'line-through' : ''" @click="st.done = !st.done">{{ st.text }}</h4>
            </div>
            <div class="text-red-400 hover:text-red-700 cursor-pointer" @click="removeSubTask(index)">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z">
                    </path>
                </svg>
            </div>
        </li>

    </ul>
</template>

<script setup>
import { ref } from 'vue'
const subTasks = ref([])
const newSubTask = ref('')

const addSubTask = () => {
    if (newSubTask.value.trim().length > 0) {
        const subTaskItem = {
            text: newSubTask.value.trim(),
            done: false
        }
        subTasks.value.push(subTaskItem)
        newSubTask.value = ''
    }
}

const removeSubTask = (i) => {
    subTasks.value.splice(i, 1)
}
</script>
