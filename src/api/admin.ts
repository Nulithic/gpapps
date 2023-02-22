import axios from "axios";
import { getUserToken } from "@/auth/storage";
import { Role } from "@/types/authType";

export const getUsers = () => {
  return axios.get("/api/admin/get/users", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const getRoles = () => {
  return axios.get("/api/admin/get/roles", {
    headers: { "x-access-token": getUserToken() },
  });
};

export const addUser = (username: string, password: string) => {
  return axios.post(
    "/api/admin/post/user/add",
    {
      username,
      password,
    },
    { headers: { "x-access-token": getUserToken() } }
  );
};

export const addRole = (roleName: string, role?: Role) => {
  return axios.post("/api/admin/post/role/add", { roleName, role }, { headers: { "x-access-token": getUserToken() } });
};

export const updateUserRole = (username: string, role_id: string) => {
  return axios.post(
    "/api/admin/post/user/role/update",
    {
      username,
      role_id,
    },
    { headers: { "x-access-token": getUserToken() } }
  );
};

export const deleteUser = (username: string) => {
  return axios.post(
    "/api/admin/post/user/delete",
    {
      username,
    },
    { headers: { "x-access-token": getUserToken() } }
  );
};

export const deleteRole = (role: Role) => {
  return axios.post(
    "/api/admin/post/role/delete",
    {
      role,
    },
    { headers: { "x-access-token": getUserToken() } }
  );
};
