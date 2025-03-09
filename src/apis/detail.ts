import httpI from "@/utils/http";

export function getDetail(id: string | string[]) {
  return httpI({
    url: "/goods",
    params: {
      id,
    },
  });
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpI({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
