import api from "./api";

const authService = {
  list: () => api.request("/auth"),
  getById: (id) => api.request("/auth/" + id),
};

export default authService;

