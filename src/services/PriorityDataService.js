import http from "@/http-common";

class PriorityDataService {
  async getAll() {
    return await http.get("/priorities");
  }

  async getById(id) {
    return await http.get(`/priorities/${id}`);
  }
}

export default new PriorityDataService();