import http from "@/http-common";

class BoardDataService {
  getAll() {
    return http.get("/boards");
  }

  get(id) {
    return http.get(`/boards/${id}`);
  }
}

export default new BoardDataService();