import { httpGet } from "@/utils/rest-client";

export const getDashboardData = async (params = {}) => {
  return httpGet("/api/dashboard/tables", {
    params: {
      ...params,
    },
  });
};