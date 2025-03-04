import httpI from "../utils/http";

export function getCategoryAPI() {
  return httpI({
    url: "home/category/head",
  });
}
