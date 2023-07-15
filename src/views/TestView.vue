<template>
    User ID<input type="text" v-model="userId"> <strong v-if="user">{{ user.first_name }}</strong>
    Task ID<input type="text" v-model="taskId"> <strong v-if="task">{{ task.title  }}</strong>
    Priority ID<input type="text" v-model="priorityId"> <strong v-if="priority">{{ priority.name }}</strong>
    Board ID<input type="text" v-model="boardId"> <strong v-if="board">{{ board.name }}</strong>
    Workflow ID<input type="text" v-model="workflowId"> <strong v-if="workflow">{{ workflow.name }}</strong>
   
    <!--WorkflowCard
      :workflow-id="workflowId"
      :board-id="boardId"
    /-->  
    <BoardSwitcher />
</template>
<script setup>
import { ref } from 'vue';
import WorkflowCard from '@/components/WorkflowCard.vue';
import BoardSwitcher from '@/components/BoardSwitcher.vue';
import { useFetchPriorities } from '../composables/PriorityData';
import { useFetchBoards } from '../composables/BoardData';
import { useFetchTasks } from '../composables/TaskData';
import { useFetchWorkflows } from '@/composables/WorkflowData'
import { useFetchUsers } from '../composables/UserData';

const userId = ref('yoda')
const taskId = ref(1)
const priorityId = ref(1)
const boardId = ref(1)
const workflowId = ref(1)

const { users: user } =  useFetchUsers(userId)
const { tasks: task } =  useFetchTasks(taskId)
const { priorities: priority } =  useFetchPriorities(priorityId)
const { boards: board } =  useFetchBoards(boardId)
const { workflows: workflow } =  useFetchWorkflows(workflowId)

</script>