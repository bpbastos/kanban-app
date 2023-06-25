import axios from "../axios-common";

class WorkflowDataService {
  getAll() {
    return axios.get("/workflows");
  }

  get(id) {
    return axios.get(`/workflows/${id}`);
  }
}

export default new WorkflowDataService();