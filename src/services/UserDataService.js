import http from "@/http-common";

class UserDataService {
  get(id) {
    return http.get(`/user?id=${id}`);
  }
}

export default new UserDataService();