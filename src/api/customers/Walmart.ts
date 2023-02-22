import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getWalmartOrders = (pathName: string) => {
  return axios.get("/api/get/customer/walmart/orders", {
    headers: { "x-access-token": getUserToken() },
  });
};
