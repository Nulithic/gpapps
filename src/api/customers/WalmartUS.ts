import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getWalmartOrders = (option: string) => {
  return axios.get("/api/get/customer/walmart_us/orders", {
    params: {
      option: option,
    },

    headers: { "x-access-token": getUserToken() },
  });
};

export const getWalmartUSCaseSizes = () => {
  return axios.get("/api/get/customer/walmart_us/case_sizes", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const postWalmartImportEDI = (dataEDI: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart_us/import/edi",
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
    "/api/post/customer/walmart_us/import/html",
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
    "/api/post/customer/walmart_us/import/b2b",
    { dataB2B, socketID },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartImportTracker = (dataTracker: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/import/tracker",
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
    "/api/post/customer/walmart_us/import/location",
    {
      locationData,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartArchiveOrder = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/archive",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const checkWalmartUSCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/case_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartUSCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/case_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartUSCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/case_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartUSCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/case_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartUSPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const addWalmartUSCaseSizes = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/case_sizes/add",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartUSCaseSizes = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/case_sizes/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
