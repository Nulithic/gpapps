import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import { ChevronUpIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

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

  const path = window.location.pathname;
  const roles = auth.state.currentUser.roles;
  const filter = roles.find((item) => item.path === path);

  return (
    <div className="flex flex-col h-screen">
      <div className="grid overflow-hidden">
        <div className="navbar bg-neutral z-50 px-5">
          <div className="navbar-start">
            <Link className="btn btn-ghost normal-case text-xl" reloadDocument to="/home">
              {path === "/home" ? "GP Apps" : filter?.name}
            </Link>
          </div>

          <div className="navbar-center lg:flex">
            <Menubar auth={auth.state!!} />
          </div>

          <div className="navbar-end">
            <button className="btn btn-sm btn-error" onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover/admin:rotate-180 transition-transform" />
            </button>
          </div>
        </div>
        <div className="flex h-[calc(100vh-64px)] justify-center items-start p-2 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
