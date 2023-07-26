import { fromGlobalId, toGlobalId } from 'graphql-relay';

Parse.Cloud.define('removeTask', async req => {
  const { user, params: { taskId } } = req;
  const { id:taskObjectId } = fromGlobalId(taskId); 

  try {
    const queryTask = new Parse.Query('Task');
    queryTask.include("workflow")
    const task = await queryTask.get(taskObjectId); 

    const workflow = task.get("workflow");
    await workflow.remove("tasks", task.id)

    const removedTask = await task.destroy()

    return { ...removedTask.toJSON(), id: taskId };

  } catch (error) {
    req.log.error(`removeTask: ${error.message}`)
    throw new Parse.Error(Parse.Error.OTHER_CAUSE, "Não foi possível remover a tarefa.");
  }
},
{
  fields: ["taskId"],
  requireUser: true
})

Parse.Cloud.define('addTask', async req => {
  const { user, params: { title, workflowId, boardId  } } = req;
  let board,workflow,priority;

  //Validations
  if (title.trim().length < 5 || title.trim().length > 25)  {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "Tamanho do título invalido - < 5 ou > 25.");
  }  

  try {
    // Decode the incoming Relay Node Id to a
    // Parse objectId for Cloud Code use.    
    const { id: boardObjectId } = fromGlobalId(boardId); 
    const queryBoard = new Parse.Query('Board');
    board = await queryBoard.get(boardObjectId);  
  } catch (error) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Board ID informado não encontrado.");
  }

  try {
    // Decode the incoming Relay Node Id to a
    // Parse objectId for Cloud Code use.
    const { id: workflowObjectId } = fromGlobalId(workflowId);
    const queryWorkflow = new Parse.Query('Workflow');
    workflow = await queryWorkflow.get(workflowObjectId);  
  } catch (error) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Workflows ID informado não encontrado.");
  }

  try {
    const queryPriority = new Parse.Query('Priority');    
    queryPriority.equalTo("name", "Baixa");    
    priority = await queryPriority.first();
  } catch (error) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Prioridade 'Baixa' não encontrada.");
  }
 
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
    }
  },  
}
);


