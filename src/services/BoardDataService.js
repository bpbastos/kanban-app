import http from "@/http-common";

class BoardDataService {
  async getAll() {
    return await http.get("/boards");
  }

  async get(id) {
    return await http.get(`/boards/${id}`);
  }
}

export default new BoardDataService();