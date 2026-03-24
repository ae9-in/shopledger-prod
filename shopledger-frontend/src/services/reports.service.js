import api from "./api";

const reportsService = {
  list: () => api.request("/reports"),
  getById: (id) => api.request("/reports/" + id),
};

export default reportsService;

