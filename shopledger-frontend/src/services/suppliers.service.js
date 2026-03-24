import api from "./api";

const suppliersService = {
  list: () => api.request("/suppliers"),
  getById: (id) => api.request("/suppliers/" + id),
};

export default suppliersService;

