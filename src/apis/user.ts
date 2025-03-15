import httpI from "@/utils/http";

export async function loginApi({ account, password }) {
  return await httpI({
    url: "/login",
    method: "post",
    data: {
      account: account,
      password: password,
    },
  });
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpI({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
