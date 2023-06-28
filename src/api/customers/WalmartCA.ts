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

export const postWalmartImportMFT = (socketID: string) => {
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
export const postWalmartImportEDI = (dataEDI: any, socketID: string) => {
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
export const postWalmartImportTracker = (dataTracker: any) => {
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

export const postWalmartArchiveOrder = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/archive",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const getWalmartCAPackingSlip = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/packing_slip",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartCAUnderlyingBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/underlying_bol",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartCAMasterBOL = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/master_bol",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const checkWalmartCACaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartCACaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartCACaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartCACaseLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/case_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const checkWalmartCAPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/check",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getWalmartCAPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getExistingWalmartCAPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/existing",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const getNewWalmartCAPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/new",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const downloadWalmartCAMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/multi/download",
    { data },
    {
      responseType: "blob",
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartCAMultiPalletLabel = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/order/pallet_label/multi/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const getWalmartCAProducts = () => {
  return axios.get("/api/get/customer/walmart_ca/products", {
    headers: { "x-access-token": getUserToken() },
  });
};
export const addWalmartCAProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/products/add",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const deleteWalmartCAProducts = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/products/delete",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const postWalmartCA856 = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/856",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
export const postWalmartCA810 = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/810",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};

export const syncWalmartCA = (data: any) => {
  return axios.post(
    "/api/post/customer/walmart_ca/sync",
    { data },
    {
      headers: { "x-access-token": getUserToken() },
    }
  );
};
