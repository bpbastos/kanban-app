import http from "@/axios-common";

class BoardDataService {
  getAll() {
    return http.get("/boards");
  }

  get(id) {
    return http.get(`/boards/${id}`);
  }
}

export default new BoardDataService();