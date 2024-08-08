<template>
  <div
    class="w-full flex flex-col h-screen justify-center items-center p-5 sm:p-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Sign in to your account
        </h1>
        <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              placeholder="Username"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="Password"
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
              Logging in...
            </span>
            <span v-else>Login</span>
          </button>
          <p :class="messageClass">{{ message }}</p>
          <div class="w-full h-auto flex flex-col items-center justify-center">
            <router-link
              class="text-gray-600 font-normal underline py-2 px-4 rounded"
              to="/"
              >Go Home</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      message: "",
      messageClass: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      this.loading = true;
      this.message = "";
      try {
        const response = await this.login({
          username: this.username,
          password: this.password,
        });

        if (response.success) {
          this.message = "Login successful!";
          this.messageClass = "text-green-500";
          const redirectPath = this.$route.query.redirect || "/";
          this.$router.push(redirectPath);
        } else {
          this.message = response.error || "Invalid username or password";
          this.messageClass = "text-red-500";
        }
      } catch (error) {
        this.message = error.message || "An error occurred during login";
        this.messageClass = "text-red-500";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
