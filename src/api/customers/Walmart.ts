import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getWalmartOrders = () => {
  return axios.get("/api/get/customer/walmart/orders", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const postWalmartImportEDI = (dataEDI: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart/import/edi",
    {
      dataEDI,
      socketID,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartImportHTML = (dataHTML: any) => {
  return axios.post(
    "/api/post/customer/walmart/import/html",
    {
      dataHTML,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartImportB2B = (dataB2B: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart/import/b2b",
    { dataB2B, socketID },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartImportTracker = (dataTracker: any) => {
  return axios.post(
    "/api/post/customer/walmart/import/tracker",
    {
      dataTracker,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartLocation = (locationData: any) => {
  return axios.post(
    "/api/post/customer/walmart/import/location",
    {
      locationData,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
