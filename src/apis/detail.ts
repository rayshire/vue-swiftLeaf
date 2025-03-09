import httpI from "@/utils/http";

export function getDetail(id: string | string[]) {
  return httpI({
    url: "/goods",
    params: {
      id,
    },
  });
}
