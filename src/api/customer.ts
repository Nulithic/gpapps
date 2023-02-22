import axios from "axios";
import { getUserToken, getSPSToken } from "@/auth/storage";

export const getMicroCenterOrders = (pathName: string) => {
  return axios.get("/api/get/customer/micro_center/orders", {
    params: {
      spsToken: getSPSToken().accessToken,
      pathName: pathName,
    },
    headers: { "x-access-token": getUserToken() },
  });
};
