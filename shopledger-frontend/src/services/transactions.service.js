import api from "./api";

const transactionsService = {
  list: () => api.request("/transactions"),
  getById: (id) => api.request("/transactions/" + id),
};

export default transactionsService;

