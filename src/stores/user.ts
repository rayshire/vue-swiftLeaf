//管理用户数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi } from "@/apis/user";
import { useCarStore } from "./car";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const carStore = useCarStore();
    // 用户数据和action
    // 1. 利用方法接取定义管理用户数据
    const userInfo = ref({
      account: "",
      password: "",
      token: "",
      avatar: "",
    });
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginApi({ account, password });
      userInfo.value = JSON.parse(JSON.stringify(res)).result;
      //合并购物车
      const mergeList = carStore.cartList.map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        };
      });
      mergeCartAPI(mergeList);
      // 更新购物车列表
      carStore.updateNewList();
    };
    // 退出登录
    const logOut = () => {
      // 清空用户数据
      userInfo.value = {
        account: "",
        password: "",
        token: "",
        avatar: "",
      };
      // 清空购物车数据
      carStore.clearCart();
    };
    // 3. 以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      logOut,
    };
  },
  {
    persist: true, // 持久化存储, 会把数据存储到localStorage`
  }
);
