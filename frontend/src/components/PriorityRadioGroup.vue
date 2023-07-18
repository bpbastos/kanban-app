<template>
    <label class="label space-x-1">
        <span class="text-base label-text uppercase font-normal">PRIORIDADE:</span>
    </label>
    <div v-for="priority in priorities" :key="priority.id" class="tooltip" :class="`tooltip-${priority.color}`"
        :data-tip="`${priority.name}`">
        <input v-if="priority.id == selectedPriorityId" @click="changePriority(priority.id)" type="radio" :value="priority.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.color}`" checked/>
        
        <input v-else-if="priority.id != selectedPriorityId" @click="changePriority(priority.id)" type="radio" :value="priority.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.color}`" />
    </div>
</template>

<script setup>
import { useFetchPriorities } from '@/composables/PriorityData'

const { priorities } = useFetchPriorities()

const props = defineProps({
  selectedPriorityId: Number  
})

const emit = defineEmits(['change'])

const changePriority = (id) => {
    let priority = priorities.value?.filter((item) => {
        return item.id == id 
    })
    emit('change', priority[0].id)
}

</script>