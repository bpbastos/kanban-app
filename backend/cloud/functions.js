import { fromGlobalId, toGlobalId } from 'graphql-relay';

Parse.Cloud.define('removeTask', async (req) => {
  const { user, params: { taskId } } = req;
  const { id:taskObjectId } = fromGlobalId(taskId); 
  const queryTask = new Parse.Query('Task');
  queryTask.include("workflow")
  const task = await queryTask.get(taskObjectId); 

  const workflow = task.get("workflow");
  await workflow.remove("tasks", task.id)

  const removedTask = await task.destroy()

  return { ...removedTask.toJSON(), id: taskId };
},
{
  requireUser: true,
  fields: ["taskId"]
})

Parse.Cloud.define('addTask', async (req) => {
  const { user, params: { title, workflowId, boardId  } } = req;
  // Decode the incoming Relay Node Id to a
  // Parse objectId for Cloud Code use.    
  const { id: boardObjectId } = fromGlobalId(boardId); 
  const { id: workflowObjectId } = fromGlobalId(workflowId);

  const queryBoard = new Parse.Query('Board');
  const board = await queryBoard.get(boardObjectId);  

  const queryWorkflow = new Parse.Query('Workflow');
  const workflow = await queryWorkflow.get(workflowObjectId);  

  const queryPriority = new Parse.Query('Priority');    
  queryPriority.equalTo("name", "Baixa");    
  const priority = await queryPriority.first();

  const Task = Parse.Object.extend("Task");
  const newTask = new Task();
  newTask.set("board", board);
  newTask.set("workflow", workflow);
  newTask.set("priority", priority);
  newTask.set("owner", user);
  newTask.set("title", title);
  const savedTask = await newTask.save();
  workflow.add("tasks", savedTask);
  await workflow.save();

  // Encode the Parse objectId to a Relay Node Id
  // for Parse GraphQL use.
  const taskId = toGlobalId('Task', savedTask.id);

  // Convert to a JSON object to handle adding the
  // Relay Node Id property.
  return { ...savedTask.toJSON(), id: taskId };
},
{
  requireUser: true,
  fields : {
    title : {
      required: true,
      type: String,
      options: val => {
        return val.trim().length >= 5 && val.trim().length <= 25;
      },
      error: 'Tamanho do título invalido - < 5 ou > 25.'
    },
    workflowId: {
      required: true,
      type: String,
    },
    boardId: {
      required: true,
      type: String,
    }
  },  
}
);

Parse.Cloud.afterDelete("SubTask", async (req) => {
  try {
    const query = new Parse.Query("Task");
    const task = await query.get(req.object.get("task").id)
    const subTask = req.object;

    task.remove("subtasks", subTask)
    task.decrement("totalSubTasks") 
    task.decrement("totalSubTasksDone") 
    await task.save();

  } catch (error) {
    throw new Error(error.message)    
  }
});

Parse.Cloud.define('addSubTask', async (req) => {
  const { user, params: { title, taskId } } = req;

  const { id:taskObjectId } = fromGlobalId(taskId);   

  const queryTask = new Parse.Query("Task");
  const task = await queryTask.get(taskObjectId)  

  const SubTask = Parse.Object.extend("SubTask");
  const newSubTask = new SubTask()
  newSubTask.set("title", title);
  newSubTask.set("order", 1);  
  newSubTask.set("done", false); 
  newSubTask.set("task", task);   

  const savedSubTask = await newSubTask.save();
  if (savedSubTask) {
    task.increment("totalSubTasks");
    task.add("subtasks", savedSubTask);
    await task.save(); 
  }

  return { ...savedSubTask.toJSON(), id: savedSubTask.id };
},
{
  requireUser: true,
  fields : {
    title: {
      required: true,
      type: String,
    },
    taskId: {
      required: true,
      type: String,
    }    
  },  
}
);

Parse.Cloud.define('markSubTaskDone', async (req) => {
  const { user, params: { subTaskId } } = req;

  const { id:subTaskObjectId } = fromGlobalId(subTaskId); 
  
  const querySubTask = new Parse.Query('SubTask');
  querySubTask.include("task")
  const subTask = await querySubTask.get(subTaskObjectId); 
  const task = subTask.get('task'); 

  subTask.set("done", !subTask.get("done"));

  if (subTask.get("done")) {
    task.increment("totalSubTasksDone")
  } else {
    task.decrement("totalSubTasksDone")
  }

  await task.save()
  const savedSubTask = await subTask.save();

  return { ...savedSubTask.toJSON(), id: savedSubTask.id };
},
{
  requireUser: true,
  fields : {
    subTaskId: {
      required: true,
      type: String,
    }
  },  
}
);


