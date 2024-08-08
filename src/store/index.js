import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    user: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        commit("setProducts", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async login({ commit }, { username, password }) {
      console.log("Logging in with", username, password);
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          commit("setUser", data.user);
          return { success: true, user: data.user };
        } else {
          return { success: false, error: data.error || "Login failed" };
        }
      } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, error: error.message };
      }
    },
    logout({ commit }) {
      commit("clearUser");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getProducts: (state) => state.products,
  },
});
