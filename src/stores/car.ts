import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, getCartlistAPI, deleteCartAPI } from "@/apis/cart";

export const useCarStore = defineStore(
  "car",
  () => {
    // 0. 获取用户信息
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 获取购物车列表
    const updateNewList = async () => {
      // 通过接口获取新的购物车列表
      //array.from()方法用于将类数组对象和可遍历的对象转换为真正的数组(浅拷贝)
      const res = await getCartlistAPI();
      cartList.value = Array.from(JSON.parse(JSON.stringify(res)).result);
    };
    // 1. 定义state - cartList
    const cartList = ref([]);
    // 2. 定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value.length > 1) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count });
        updateNewList();
        //用登陆购物车数据覆盖本地购物车数据
      } else {
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          // 找到了
          item.count++;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
      // console.log("添加", goods);
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    };
    // 删除购物车
    const delCart = async (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      // const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      // cartList.value.splice(idx, 1);
      if (isLogin.value.length > 1) {
        // 调用接口实现接口购物车中的删除功能
        await deleteCartAPI([skuId]);
        updateNewList();
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        cartList.value = cartList.value.filter((item) => skuId !== item.skuId);
      }
    };
    //清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    //定义getters
    // 购物车商品总数
    const total = computed(() => {
      return cartList.value.reduce((prev, item) => {
        return prev + item.count;
      }, 0);
    });
    // 购物车商品总价
    const totalPrice = computed(() => {
      return cartList.value.reduce((prev, item) => {
        return prev + item.count * item.price;
      }, 0);
    });
    // 单选
    const singleCheck = (skuId: string) => {
      const item = cartList.value.find((item) => skuId === item.skuId);
      item.selected = !item.selected;
    };
    //全选
    const allCheck = (selected: boolean) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    const selectedCount = computed(() => {
      return cartList.value.reduce((prev, item) => {
        return prev + (item.selected ? item.count : 0);
      }, 0);
    });
    // 已选商品总价
    const selectedPrice = computed(() => {
      return cartList.value.reduce((prev, item) => {
        return prev + (item.selected ? item.count * item.price : 0);
      }, 0);
    });
    return {
      total,
      totalPrice,
      cartList,
      isAll,
      selectedCount,
      selectedPrice,
      updateNewList,
      clearCart,
      delCart,
      addCart,
      singleCheck,
      allCheck,
    };
  },
  {
    persist: true, // 持久化
  }
);
