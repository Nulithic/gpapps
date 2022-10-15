import axios from "axios";
import { getUserToken } from "@/auth/token";
import { Role } from "@/types/AuthType";

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

export const addRole = (role: string, name: string, parent: string | null) => {
  return axios.post("/api/admin/post/role/add", { role, parent, name }, { headers: { "x-access-token": getUserToken() } });
};

export const updateUserRole = (username: string, role: string) => {
  return axios.post(
    "/api/admin/post/user/role/update",
    {
      username,
      role,
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
