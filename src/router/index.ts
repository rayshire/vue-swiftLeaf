//createRouter：创建路由实例
//createWebHistory：创建history路由模式
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Category from "@/views/Category/index.vue";
import Home from "@/views/Home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "", // 默认子路由
          name: "Home",
          component: Home,
        },
        {
          path: "/category",
          name: "Category",
          component: Category,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
