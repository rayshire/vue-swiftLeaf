import httpI from "@/utils/http";
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return httpI({
    url: "/member/order/pre",
  });
};

// 创建订单
export const createOrderAPI = (data) => {
  return httpI({
    url: "/member/order",
    method: "POST",
    data,
  });
};
