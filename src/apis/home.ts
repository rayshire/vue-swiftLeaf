import httpI from "@/utils/http";

// 导出一个函数，用于获取轮播图数据
export function getBannerAPI() {
  // 使用httpI方法，发送get请求，获取轮播图数据
  return httpI({
    url: "home/banner",
    method: "get",
  });
}
export function getNewAPI() {
  // 获取新鲜好物数据
  return httpI({
    url: "/home/new",
    method: "get",
  });
}
export function getHotAPI() {
  // 获取人气推荐数据
  return httpI({
    url: "/home/hot",
    method: "get",
  });
}

export const getGoodsAPI = () => {
  // 获取所有商品模块数据
  return httpI({
    url: "/home/goods",
    method: "get",
  });
};
