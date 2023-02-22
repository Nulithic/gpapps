import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getDearLocations = () => {
  return axios.get("/api/get/dear/locations", {
    headers: { "x-access-token": getUserToken() },
  });
};
export const getDearInventory = () => {
  return axios.get("/api/get/dear/inventory", {
    headers: { "x-access-token": getUserToken() },
  });
};
export const getDearProducts = () => {
  return axios.get("/api/get/dear/products", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const updateDearProducts = (socketID: string) => {
  return axios.get("/api/get/dear/update_products", {
    params: {
      socketID: socketID,
    },
    headers: { "x-access-token": getUserToken() },
  });
};
export const updateDearLocations = (socketID: string) => {
  return axios.get("/api/get/dear/update_locations", {
    params: {
      socketID: socketID,
    },
    headers: { "x-access-token": getUserToken() },
  });
};
export const updateDearInventory = (socketID: string) => {
  return axios.get("/api/get/dear/update_inventory", {
    params: {
      socketID: socketID,
    },
    headers: { "x-access-token": getUserToken() },
  });
};
