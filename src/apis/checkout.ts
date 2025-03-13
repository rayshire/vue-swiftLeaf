import httpI from "@/utils/http";
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return httpI({
    url: "/member/order/pre",
  });
};
