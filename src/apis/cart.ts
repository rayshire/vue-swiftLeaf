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
export const getCartlistAPI = () => {
  return httpI({
    url: "/member/cart",
    method: "GET",
  });
};

// 删除购物车
export const deleteCartAPI = (ids: string[]) => {
  return httpI({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};
//合并购物车
export const mergeCartAPI = (data) => {
  return httpI({
    url: "/member/cart/merge",
    method: "POST",
    data: data,
  });
};
