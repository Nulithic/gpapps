import { useNavigate, Outlet } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { userLogout } from "@/services/authService";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-base-300 drop-shadow-lg">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">GP Apps</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  p-0">
            <li className="group">
              <a>
                Customer
                <ChevronUpIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </a>
              <ul className="bg-base-300 p-2">
                <ul className="menu p-0">
                  <li className="group-2">
                    <a>
                      Walmart
                      <ChevronUpIcon className="h-4 w-4 [.group-2:hover_&]:rotate-90 transition-transform" />
                    </a>
                    <ul className="bg-base-300 p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                </ul>

                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>

            <li className="group">
              <a>
                Warehouse
                <ChevronUpIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </a>
              <ul className="bg-base-300 p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>

            <li className="group">
              <a>
                Dear
                <ChevronUpIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </a>
              <ul className="bg-base-300 p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>

            <li className="group">
              <a>
                Admin
                <ChevronUpIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </a>
              <ul className="bg-base-300 p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
