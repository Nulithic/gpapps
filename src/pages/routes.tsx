import { Navigate, useRoutes } from "react-router-dom";

import Navbar from "@/components/Navbar";

import Login from "@/pages/Auth/Login";
import Home from "@/pages/Auth/Home";
import Roles from "@/pages/Admin/Roles";
import Users from "@/pages/Admin/Users";
// import Error from "pages/Error";

import Transfer from "@/pages/Warehouse/Transfer";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
      children: [{ path: "/", element: <Navigate to="/home" /> }],
    },
    {
      path: "/home",
      element: <Navbar />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/admin",
      element: <Navbar />,
      children: [
        { path: "users", element: <Users /> },
        { path: "roles", element: <Roles /> },
      ],
    },
    {
      path: "/warehouse",
      element: <Navbar />,
      children: [
        { path: "transfer", element: <Transfer /> },
        // { path: "roles", element: <Roles /> },
      ],
    },
  ]);
};

export default Router;
