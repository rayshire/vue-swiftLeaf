import httpI from "@/utils/http";

export const getOrderAPI = (id) => {
  return httpI({
    url: `/member/order/${id}`,
  });
};
