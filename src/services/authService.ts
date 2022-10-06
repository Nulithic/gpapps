import axios from "axios";
import { getUserToken } from "@/auth/token";

const getUser = () => {
  return axios.get("/api/get/user", {
    headers: { "x-access-token": getUserToken() },
  });
};

const userLogin = (username: string, password: string) => {
  return axios.post(
    "/api/post/user/login",
    {
      username,
      password,
    },
    { validateStatus: () => true }
  );
};

const userLogout = () => {
  return axios.post("/api/post/user/logout", {}, { headers: { "x-access-token": getUserToken() } });
};

export { getUser, userLogin, userLogout };
