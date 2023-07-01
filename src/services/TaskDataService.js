import http from "@/http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks")
  }

  getByBoardIdAndWorkflowId(boardId, workflowId) {
    return http.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
  }

  async getById(id) {
    return await http.get(`/tasks/${id}`)
  }

  add(title,boardId,workflowId) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;    
    return http.post("/tasks", {
      title: title,
      priority_id: 1,
      board_id: boardId,
      workflow_id: workflowId,
      date_added: currentDate
    })
  }

  delete(id) {
    return http.delete(`/tasks/${id}`)
  }

}

export default new TaskDataService();