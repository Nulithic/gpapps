import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/auth/context";
import { userLogout } from "@/services/authService";

import Menubar from "./Menubar";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleNavigate = () => {
    navigate(0);
  };

  const handleLogout = async () => {
    await userLogout();
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="grid overflow-hidden">
        <div className="navbar bg-base-300 drop-shadow-lg z-50">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl">GP Apps</a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <Menubar auth={auth} />
              {auth.currentUser?.admin ? (
                <li className="group/admin">
                  <a>
                    Admin
                    <ChevronUpIcon className="h-4 w-4 group-hover/admin:rotate-180 transition-transform" />
                  </a>
                  <ul className="menu-compact bg-base-300 p-2 space-y-2">
                    <li>
                      <NavLink to="/admin/roles" style={({ isActive }) => (isActive ? {} : undefined)}>
                        Roles
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/users" style={({ isActive }) => (isActive ? {} : undefined)}>
                        Users
                      </NavLink>
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
