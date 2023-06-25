import axios from "../axios-common";

class TaskDataService {
  getAll() {
    return axios.get("/tasks");
  }

  getByBoardIdAndWorkflowId(boardId, workflowId) {
    return axios.get(`/tasks?board_id=${boardId}&workflow_id=${workflowId}`)
  }

  get(id) {
    return axios.get(`/tasks/${id}`);
  }
}

export default new TaskDataService();