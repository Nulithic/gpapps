import { Navigate, useRoutes } from "react-router-dom";

import Navbar from "@/components/Navbar";

import Login from "./Auth/Login";
import Home from "./Auth/Home";
import Redirect from "./Auth/Redirect";
import Roles from "./Admin/Roles";
import Users from "./Admin/Users";
import Error from "./Auth/Error";

import Transfer from "./Warehouse/Transfer";
import Compare from "./Warehouse/Compare";
import BulkShip from "./Warehouse/BulkShip";
import InventoryCount from "./Warehouse/InventoryCount";

import Settings from "./Dear/Settings";

import MicroCenterOrders from "./Customers/MicroCenter/Orders";
import WalmartUSOrders from "./Customers/WalmartUS/Orders";
import WalmartUSImport from "./Customers/WalmartUS/Import";
import Products from "./Customers/WalmartUS/Products";

import WalmartCAOrders from "./Customers/WalmartCA/Orders";

import HSNImport from "./Customers/HSN/Import";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
      children: [{ path: "/", element: <Navigate to="/home" /> }],
    },
    {
      path: "/redirect",
      element: <Redirect />,
    },
    {
      path: "/home",
      element: <Home />,
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
        { path: "compare", element: <Compare /> },
        { path: "bulk_ship", element: <BulkShip /> },
        { path: "inventory_count", element: <InventoryCount /> },
      ],
    },
    {
      path: "/customer",
      element: <Navbar />,
      children: [
        { path: "micro_center", children: [{ path: "orders", element: <MicroCenterOrders /> }] },
        {
          path: "walmart_us",
          children: [
            { path: "orders", element: <WalmartUSOrders /> },
            { path: "import", element: <WalmartUSImport /> },
            { path: "products", element: <Products /> },
          ],
        },
        {
          path: "walmart_ca",
          children: [
            { path: "orders", element: <WalmartCAOrders /> },
            // { path: "import", element: <WalmartUSImport /> },
            // { path: "products", element: <Products /> },
          ],
        },
        { path: "hsn", children: [{ path: "import", element: <HSNImport /> }] },
      ],
    },
    {
      path: "/dear",
      element: <Navbar />,
      children: [{ path: "dear_settings", element: <Settings /> }],
    },
    {
      path: "/error",
      element: <Navbar />,
      children: [{ index: true, element: <Error /> }],
    },
  ]);
};

export default Router;
