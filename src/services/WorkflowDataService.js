import http from "@/http-common";

class WorkflowDataService {
  async getAll() {
    return await http.get("/workflows");
  }

  async get(id) {
    return await http.get(`/workflows/${id}`);
  }
}

export default new WorkflowDataService();