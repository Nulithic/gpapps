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

export const getWalmartUSPackingSlip = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/packing_slip",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartUSUnderlyingBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/underlying_bol",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartUSMasterBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/master_bol",
    { data },
    {
      responseType: "blob",
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

export const checkWalmartUSPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartUSPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartUSPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartUSPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const downloadWalmartUSMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label/multi/download",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartUSMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/order/pallet_label/multi/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const getWalmartUSProducts = () => {
  return axios.get("/api/get/customer/walmart_us/products", {
    headers: { "x-access-token": getUserToken() },
  });
};
export const addWalmartUSProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/products/add",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartUSProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/products/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartASN = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_us/asn",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
