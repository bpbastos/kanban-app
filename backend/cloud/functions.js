import { fromGlobalId, toGlobalId } from 'graphql-relay';

Parse.Cloud.define('removeTask', async req => {
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

Parse.Cloud.define('addTask', async req => {
  const { user, params: { title, workflowId, boardId  } } = req;
  //Validations

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

  const newTask = new Parse.Object("Task");
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


