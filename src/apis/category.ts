import httpI from "@/utils/http";

/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export function getTopCategoryAPI(id: string | string[]) {
  return httpI({
    url: "/category",
    params: {
      id,
    },
  });
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export function getCategoryFilterAPI(id: string | string[]) {
  return httpI({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
}

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpI({
    url: "/category/goods/temporary",
    method: "POST",
    data,
  });
};
