import { httpGet } from "@/utils/rest-client";

export const getTables = async (params = {}) => {
  return httpGet("/api/tables", {
    params: {
      page: 1,
      per_page: 10,
      ...params,
    },
  });
};