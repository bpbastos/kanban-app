<template>
    <!--form class="form-control">
    <label class="label">
        <span class="label-text-alt">Username</span>
    </label>
    <input type="text" v-model="username" class="input input-primary">            
    <label class="label">
        <span class="label-text-alt">ClassName ID</span>
    </label>
    <input type="text" v-model="className" class="input input-primary">         
    <label class="label">
        <span class="label-text-alt">Where Clasule</span>
    </label>    
    <textarea v-model="whereClauseInput" class="input input-primary"></textarea>
    <div class="divider"></div>
    <button class="btn btn-primary uppercase" @click.prevent="find">Find</button> 
    </form>
    <div class="divider">Results</div>
    <ul>
        <li v-for="row in data"> {{ row }} </li>
    </ul>
    <div class="divider">Results</div>
    <ul>
        <li v-for="row in boards"> {{ row.name }} </li>
    </ul>
    <TaskCard v-for="task in tasks" :task="task" workflow-id="Y1pXuZAqE2" board-id="000EsHsBNG"/-->
    <form class="form-control">
    <label class="label">
        <span class="label-text-alt">Nome</span>
    </label>
    <input type="text" v-model="board.name" class="input input-primary">            
    <label class="label">
        <span class="label-text-alt">Order</span>
    </label>
    <input type="text" v-model="board.order" class="input input-primary">   
    <div class="divider"></div>      
    <button class="btn btn-primary uppercase" @click.prevent="board.save()">Save</button> 
    </form> 
    <div class="divider">Results</div>
    <ul>
        <li v-for="workflow in workflows"> {{ workflow }} </li>
    </ul>       
</template>
<script setup>
import { ref,computed, inject } from 'vue';
import { useParseFind } from '@/composables/useParse'

const Parse = inject('Parse')
const board = ref(null)

const workflows = ref([])

//const b1 = new Parse.Object('Board')
//b1.set("objectId","tcV9suZJuh")
const bq1 = new Parse.Query('Board','tcV9suZJuh');
bq1.include("workflows")
const b1 = await bq1.first()
const ws = b1.get("workflows")

ws.forEach((w)=> {
    //console.log(w.get("tasks"))
    let tasks = w.get("tasks")
    if(Array.isArray(tasks)) {
        tasks.forEach(async(t)=>{
             await t.fetch({"include":"priority,subtasks"})
             //console.log(t.title)
             
        })
    }
    console.log(tasks[0])


})

/*const boardQuery = new Parse.Query(b1);
boardQuery.include("workflows")

const result = await boardQuery.find()
console.log(result)
/*const w1 = new Parse.Object("Workflow");
w1.set("name","Backlog")
w1.set("color","purple")

const w2 = new Parse.Object("Workflow");
w2.set("name","Em andamento")
w2.set("color","blue")

const w3 = new Parse.Object("Workflow");
w3.set("name","Em análise")
w3.set("color","yellow")

const w4 = new Parse.Object("Workflow");
w4.set("name","Concluído")
w4.set("color","green")

const workflows = [w1,w2,w3,w4]

const b = await boardQuery.get("QyFOZSMLA7")

b.set("workflows", workflows)

//b.save()*/

const className = ref('_User')
const whereClauseInput = ref('{"where":{"username":"yoda"}}')
const whereClause = computed(() => {
    return whereClauseInput.value.trim() ? JSON.parse(whereClauseInput.value) : JSON.parse('{}')        
})
const username = ref('')
const { data, refresh } = await useParseFind(className, whereClause)

const find = async() => {
    if (className.value.trim()) {
        data.value = []
        await refresh()
    }
}


</script>