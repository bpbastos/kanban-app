import axios from "../axios-common";

class BoardDataService {
  getAll() {
    return axios.get("/boards");
  }

  get(id) {
    return axios.get(`/boards/${id}`);
  }
}

export default new BoardDataService();