import axios from "axios";
import { getUserToken } from "@/auth/storage";

//Bulkship
export const getBulkShipTemplate = () => {
  return axios.get("/api/get/warehouse/bulk_ship/template", {
    responseType: "blob",
    headers: { "x-access-token": getUserToken() },
  });
};
export const postBulkShip = (importData: any, socketID: string) => {
  return axios.post(
    "/api/post/warehouse/bulk_ship",
    {
      importData,
      socketID,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

//Transfer
export const getTransferTemplate = () => {
  return axios.get("/api/get/warehouse/transfer/template", {
    responseType: "blob",
    headers: { "x-access-token": getUserToken() },
  });
};
export const postTransfer = (transferData: any, socketID: string) => {
  return axios.post(
    "/api/post/warehouse/transfer",
    {
      transferData,
      socketID,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

//Compare
export const getCompareTemplate = () => {
  return axios.get("/api/get/warehouse/compare/template", {
    responseType: "blob",
    headers: { "x-access-token": getUserToken() },
  });
};
export const postCompare = (importData: any, location: string) => {
  return axios.post(
    "/api/post/warehouse/compare",
    {
      importData,
      location,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
