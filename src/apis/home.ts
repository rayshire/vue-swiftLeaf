import httpI from "@/utils/http";

// 导出一个函数，用于获取轮播图数据
export function getBannerAPI() {
  // 使用httpI方法，发送get请求，获取轮播图数据
  return httpI({
    url: "home/banner",
    method: "get",
  });
}
