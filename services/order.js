import { httpGet } from "@/utils/rest-client";

export const getOrders = async (params = {}) => {
  return httpGet("/api/orders", {
    params: {
      page: 1,
      per_page: 10,
      ...params,
    },
  });
};
