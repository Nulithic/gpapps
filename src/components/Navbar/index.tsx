import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/auth/context";
import { userLogout } from "@/services/authService";

import Menubar from "./Menubar";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    await userLogout();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="grid overflow-hidden">
        <div className="navbar bg-base-300 drop-shadow-lg">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/home")}>
              GP Apps
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <Menubar auth={auth} />
              {auth.currentUser?.admin ? (
                <li className="group">
                  <a>
                    Admin
                    <ChevronUpIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                  </a>
                  <ul className="bg-base-300 p-2">
                    <li>
                      <a onClick={() => navigate("/admin/roles")}>Roles</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/admin/users")}>Users</a>
                    </li>
                  </ul>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="navbar-end">
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex h-[calc(100vh-64px)] justify-center items-start p-5 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
