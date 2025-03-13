import httpI from "@/utils/http";

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return httpI({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};
// 获取新的购物车列表
export const updateNewList = () => {
  return httpI({
    url: "/member/cart",
    method: "GET",
  });
};
