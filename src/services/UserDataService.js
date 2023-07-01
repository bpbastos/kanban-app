import http from "@/http-common";

class UserDataService {
  async getById(id) {
    return await http.get(`/user?id=${id}`);
  }

  async getByUsername(username) {
    return await http.get(`/user?username=${username}`);
  }

}

export default new UserDataService();