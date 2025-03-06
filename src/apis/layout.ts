import httpI from "@/utils/http";
export function getCategoryApi() {
  return httpI({
    url: "/home/category/head",
    method: "get",
  });
}
getCategoryApi();
