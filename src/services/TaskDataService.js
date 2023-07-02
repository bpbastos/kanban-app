import http from "@/http-common";

class TaskDataService {
  async getAll() {
    return await http.get("/tasks")
  }

  async getByBoardIdAndWorkflowId(boardId, workflowId) {
    return await http.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
  }

  async getById(id) {
    return await http.get(`/tasks/${id}`)
  }

  async update(task) {
    return http.put(`/tasks/${task.id}`,{
      
    })
  }

  async add(title,boardId,workflowId) {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDate = `${day}-${month}-${year}` 
    const priorityId = 1
    let response = null
    response = await http.get(`/workflows/${workflowId}`)
    const workflow = await response.data
    response = await http.get(`/priorities/${priorityId}`)    
    const priority = await response.data
    response = await http.get(`/boards/${boardId}`)
    const board = await response.data

    return await http.post("/tasks", {
      "title": title,
      "description": "",
      "priority": priority,
      "workflow": workflow,
      "board": board,
      "subtasks": [],
      "board_id": boardId,
      "order": 0,
      "workflow_id": workflowId,
      "priority_id": priorityId,
      "date_added": currentDate
    })
  }

  async delete(id) {
    return await http.delete(`/tasks/${id}`)
  }

}

export default new TaskDataService();