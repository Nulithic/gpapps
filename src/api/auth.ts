import axios from "axios";
import { getUserToken } from "@/auth/storage";

export const getUser = () => {
  return axios.get("/api/get/user", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const userLogin = (username: string, password: string) => {
  return axios.post(
    "/api/post/user/login",
    {
      username,
      password,
    },
    { validateStatus: () => true }
  );
};

export const userLogout = () => {
  return axios.post("/api/post/user/logout", {}, { headers: { "x-access-token": getUserToken() } });
};

export const setStateCookie = () => {
  return axios.get("/api/get/set_state_cookie", {
    headers: { "x-access-token": getUserToken() },
    withCredentials: true,
  });
};
