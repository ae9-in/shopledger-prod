import api from "./api";

const adminService = {
  list: () => api.request("/admin"),
  getById: (id) => api.request("/admin/" + id),
};

export default adminService;

