<template>
  <div>
    <div class="pb-8">
      <BoardSwitcher @change="changeBoard" />
    </div>
    <div class="flex flex-wrap justify-strech gap-3 pb-8">
      <!-- To pass the tailwind color classes via v-bind it's needed to put the classes on safelist in tailwind.config.js file -->
        <WorkflowCard
          v-for="workflow in workflows"
          :workflow="workflow"
          :board-id="board.id"
          :key="workflow.id"
        />
    </div>
  </div>
</template>

<script setup>
import { computed,ref } from 'vue'
import BoardSwitcher from '@/components/BoardSwitcher.vue'
import WorkflowCard from '@/components/WorkflowCard.vue'

import { useQuery } from '@vue/apollo-composable'

import gql from "graphql-tag";

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const boardId = ref(props.id ? props.id : "tcV9suZJuh")

const BOARD_QUERY = gql`
    query getBoard ($id: ID!) {
      board(id: $id) {
        id
        name
        workflows {
          ...on Workflow {
            id
            color
            name
            tasks {
              ...on Task {
                id
                title
                priority {
                  name
                  color
                }
                subtasks {
                  ...on SubTask {
                    id
                    title
                    order
                    done
                  }
                }
              }
            }
          }
        }
      }
    }
`

const { result } = useQuery(BOARD_QUERY, ()=>({id:boardId.value}))

const board = computed(()=>{
  return result.value?.board ?? null
})

const workflows = computed(()=>{
  return result.value?.board?.workflows ?? []
})

const changeBoard = (_boardId) => {
  boardId.value = _boardId
}

</script>
