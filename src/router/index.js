import { createRouter, createWebHistory } from "vue-router";
import productForm from "@/components/productForm.vue";
import productList from "@/components/productList.vue";
import Login from "@/components/loginForm.vue";
import store from "@/store";

//Setup Vue to use Vue-Router
const routes = [
  { path: "/", component: productList },
  { path: "/add", component: productForm, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
