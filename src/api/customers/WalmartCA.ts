import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getWalmartOrders = (option: string) => {
  return axios.get("/api/get/customer/walmart_ca/orders", {
    params: {
      option: option,
    },

    headers: { "x-access-token": getUserToken() },
  });
};

export const importWalmartOrdersMFT = (socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart_ca/import/mft",
    {
      socketID,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const importWalmartOrdersEDI = (dataEDI: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart_ca/import/edi",
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
    "/api/post/customer/walmart_ca/import/html",
    {
      dataHTML,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const importWalmartOrdersB2B = (dataB2B: any, socketID: string) => {
  return axios.post(
    "/api/post/customer/walmart_ca/import/b2b",
    { dataB2B, socketID },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const importWalmartTracker = (dataTracker: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/import/tracker",
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
    "/api/post/customer/walmart_ca/import/location",
    {
      locationData,
    },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const archiveWalmartOrder = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/archive",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const getWalmartPackingSlip = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/packing_slip",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartUnderlyingBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/underlying_bol",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartMasterBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/master_bol",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const checkWalmartCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartCaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const checkWalmartPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const downloadWalmartMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/multi/download",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/multi/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const getWalmartProducts = () => {
  return axios.get("/api/get/customer/walmart_ca/products", {
    headers: { "x-access-token": getUserToken() },
  });
};
export const addWalmartProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/products/add",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/products/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartASN = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/asn",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartInvoice = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/invoice",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartSync = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/sync",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
