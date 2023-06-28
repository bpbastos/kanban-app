import http from "@/http-common";

class UserDataService {
  getById(id) {
    return http.get(`/user?id=${id}`);
  }

  getByUsername(username) {
    return http.get(`/user?username=${username}`);
  }

}

export default new UserDataService();