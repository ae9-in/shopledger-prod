import api from "./api";

const cashbookService = {
  list: () => api.request("/cashbook"),
  getById: (id) => api.request("/cashbook/" + id),
};

export default cashbookService;

