<template>
    <WorkflowCard
      v-if="workflows.id"
      :workflow="workflows"
      :board-id="boardId"
      :key="upd"
    />  
</template>
<script setup>
import { ref } from 'vue';
import { useFetchWorkflows } from '@/composables/WorkflowData'
import WorkflowCard from '@/components/WorkflowCard.vue';

const boardId = ref(1)
const upd = ref(0)
const { workflows } =  useFetchWorkflows()


const updateWorkflow = () => {
    upd.value++
    console.log(upd.value)
}

</script>