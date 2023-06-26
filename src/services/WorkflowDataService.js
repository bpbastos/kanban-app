import http from "../axios-common";

class WorkflowDataService {
  getAll() {
    return http.get("/workflows");
  }

  get(id) {
    return http.get(`/workflows/${id}`);
  }
}

export default new WorkflowDataService();