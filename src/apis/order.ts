/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/
import httpI from "@/utils/http";
export const getUserOrder = (params) => {
  return httpI({
    url: "/member/order",
    method: "GET",
    params,
  });
};
