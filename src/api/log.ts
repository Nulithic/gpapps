import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getLogs = (logID: string) => {
  return axios.get("/api/get/logs", {
    params: {
      logID: logID,
    },
    headers: { "x-access-token": getUserToken() },
  });
};
