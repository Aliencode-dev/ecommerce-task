<template>
  <div class="w-full flex flex-col h-screen justify-center items-center">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Add New products
        </h1>
        <div
          class="w-full items-end flex flex-row gap-3 justify-end"
          v-if="isAuthenticated"
        >
          <router-link
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/"
            >Home</router-link
          ><a
            v-if="isAuthenticated"
            @click="logoutuser"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded"
            to="/add"
            >Logout</a
          >
        </div>
        <form @submit.prevent="addProduct" class="space-y-4 md:space-y-6">
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="name"
              placeholder="Product Name"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Product Descripton</label
            >
            <textarea
              v-model="description"
              name="description"
              placeholder="Description"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label
              for="imageurl"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Image Url</label
            >
            <input
              type="url"
              v-model="imageURL"
              placeholder="Image URL"
              required
              id="imageurl"
              name="imageurl"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              v-model="price"
              placeholder="Product Cost"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-500 hover:bg-blue-700 text-white rounded w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <span v-if="loading">
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Adding...
            </span>
            <span v-else>Add Product</span>
          </button>
          <p :class="messageClass">{{ message }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      imageURL: "",
      message: "",
      messageClass: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  isAuthenticated() {
    return this.$store.getters.isAuthenticated;
  },
  methods: {
    ...mapActions(["fetchProducts", "logout"]),
    async addProduct() {
      this.loading = true;
      this.message = "";
      if (!this.isAuthenticated) {
        this.message = "You must be logged in to add a product";
        return;
      }
      try {
        await axios.post(
          "http://localhost:3000/products",
          {
            name: this.name,
            description: this.description,
            price: this.price,
            imageURL: this.imageURL,
          },
          { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
        );
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    logoutuser() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>
