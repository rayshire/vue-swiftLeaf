import httpI from "@/utils/http";

/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export function getTopCategoryAPI(id) {
  return httpI({
    url: "/category",
    params: {
      id,
    },
  });
}
