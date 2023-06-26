import http from "@/axios-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }

  getByBoardIdAndWorkflowId(boardId, workflowId) {
    return http.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }
}

export default new TaskDataService();