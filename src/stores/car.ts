import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCarStore = defineStore(
  "car",
  () => {
    // 1. 定义state - cartList
    const cartList = ref([]);
    // 2. 定义action - addCart
    const addCart = (goods) => {
      console.log("添加", goods);
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        // 找到了
        item.count++;
      } else {
        // 没找到
        cartList.value.push(goods);
      }
    };
    // 删除购物车
    const delCart = async (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      // const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      // cartList.value.splice(idx, 1);
      cartList.value = cartList.value.filter((item) => skuId !== item.skuId);
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
    const singleCheck = (skuId: string) => {
      const item = cartList.value.find((item) => skuId === item.skuId);
      item.selected = !item.selected;
    };
    //
    const allCheck = (selected: boolean) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    return {
      total,
      totalPrice,
      delCart,
      cartList,
      addCart,
      singleCheck,
      allCheck,
      isAll,
    };
  },
  {
    persist: true, // 持久化
  }
);
