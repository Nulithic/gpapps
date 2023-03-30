import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const postHSNImport = (importData: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/hsn/import",
    {
      importData,
      socketID,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
