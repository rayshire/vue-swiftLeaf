//createRouter：创建路由实例
//createWebHistory：创建history路由模式
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Category from "@/views/Category/index.vue";
import Home from "@/views/Home/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Deatil from "@/views/Detail/index.vue";

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
          path: "category/:id",
          name: "Category",
          component: Category,
        },
        {
          path: "category/sub/:id",
          name: "SubCategory",
          component: SubCategory,
        },
        {
          path: "detail/:id",
          name: "Deatil",
          component: Deatil,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
  //导航到新页面时，滚动到顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
