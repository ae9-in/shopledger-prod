const state = {
  user: null,
  token: null,
};

export const useAuthStore = {
  getState() {
    return {
      ...state,
      setToken: (token) => {
        state.token = token;
      },
      logout: () => {
        state.user = null;
        state.token = null;
      },
    };
  },
};

export default useAuthStore;
