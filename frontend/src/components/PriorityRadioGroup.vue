<template>
    <label class="label space-x-1">
        <span class="text-base label-text uppercase font-normal">PRIORIDADE:</span>
    </label>
    <div v-for="priority in priorities" :key="priority.node.id" class="tooltip" :class="`tooltip-${priority.node.color}`"
        :data-tip="`${priority.node.name}`">
        <input v-if="priority.node.id == selectedPriorityId" @click="changePriority(priority.node.id)" type="radio" :value="priority.node.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.node.color}`" checked/>
        
        <input v-else-if="priority.node.id != selectedPriorityId" @click="changePriority(priority.node.id)" type="radio" :value="priority.node.id" name="priority" id="priority" class="radio radio-sm m-1"
            :class="`radio-${priority.node.color}`" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import gql from "graphql-tag";

const props = defineProps({
  selectedPriorityId: String  
})

const emit = defineEmits(['change'])

const PRIORITIRES_QUERY = gql`
query getPriority {
  priorities {
    edges {
      node {
        ...on Priority {
          id
          name
          color
        }
      }
    }
  }
}
`

const { result } = useQuery(PRIORITIRES_QUERY)

const priorities = computed(()=>result.value?.priorities?.edges)

const changePriority = (id) => {
    emit('change', id)
}

/*
const { priorities } = useFetchPriorities()

const props = defineProps({
  selectedPriorityId: Number  
})


const BOARD_QUERY = gql`
`

const emit = defineEmits(['change'])

const changePriority = (id) => {
    let priority = priorities.value?.filter((item) => {
        return item.id == id 
    })
    emit('change', priority[0].id)
}*/

</script>