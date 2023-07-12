<template>
    <label class="label space-x-1">
        <span class="text-base label-text uppercase font-normal">PRIORIDADE:</span>
    </label>
    <div v-for="priority in priorities" :key="priority.id" class="tooltip" :class="`tooltip-${priority.color}`"
        :data-tip="`${priority.name}`">
        <input v-if="priority.id == priorityId" @click="changePriority(priority.id)" type="radio" :value="priority.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.color}`" checked/>
        
        <input v-else-if="priority.id != priorityId" @click="changePriority(priority.id)" type="radio" :value="priority.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.color}`" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFetchPriorities } from '@/composables/PriorityData'

const { priorities, error, fetch } = useFetchPriorities(true)

const props = defineProps({
  priorityId: Number  
})

const emit = defineEmits(['change'])

const changePriority = (id) => {
    let priority = priorities.value?.filter((item) => {
        return item.id == id 
    })
    emit('change', priority[0].id)
}

onMounted(async() => {
    await fetch()    
})

</script>