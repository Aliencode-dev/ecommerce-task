<template>
  <div class="w-full h-full p-5">
    <h1 class="font-bold text-2xl text-gray-600 mb-5">Product List</h1>
    <div
      class="w-full h-auto flex flex-row portrait:flex-col justify-between items-center portrait:items-end"
    >
      <div class="w-auto order-2">
        <div class="w-full items-end flex flex-row gap-3 justify-end">
          <router-link
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
            to="/add"
            >Add Product</router-link
          ><a
            v-if="isAuthenticated"
            @click="logout"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded"
            to="/add"
            >Logout</a
          >
        </div>
      </div>

      <div class="portrait:mb-5 order-1 landscape:w-2/5">
        <div class="flex gap-3">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <select
            v-model="sortCriteria"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>

    <div
      v-if="filteredProducts.length"
      class="w-full h-full gap-2 flex flex-wrap float-right justify-start items-center my-[32px]"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="mt-11 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg lg:w-[calc((100%-24px)/4)] 2xl:w-[calc((100%-32px)/5)] md:w-[calc((100%-16px)/3)] sm:w-[calc((100%-8px)/2)] w-full aspect[3/4] cursor-pointer flex flex-col justify-start items-center"
      >
        <img
          class="h-48 w-full object-cover object-center"
          :src="product.imageURL"
          alt="Product Image"
        />
        <div
          class="max-h-[40%] p-2 flex-grow-0 overflow-y-hidden bottom-0 relative flex flex-col justify-start items-start w-full"
        >
          <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">
            {{ product.name }}
          </h2>
          <p
            class="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-1"
          >
            {{ product.description }}
          </p>
          <div class="flex items-center">
            <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
              ${{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products available</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ProductList",
  data() {
    return {
      searchQuery: "",
      sortCriteria: "name",
    };
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["isAuthenticated"]),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    filteredProducts() {
      let sortedProducts = [...this.products];

      if (this.searchQuery) {
        sortedProducts = sortedProducts.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            product.price.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      sortedProducts.sort((a, b) => {
        return a[this.sortCriteria].localeCompare(b[this.sortCriteria]);
      });

      return sortedProducts;
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "logout"]),
  },
  created() {
    this.fetchProducts();
  },
};
</script>
