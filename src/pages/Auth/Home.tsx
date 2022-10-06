import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth/context";
import { userLogout } from "@/services/authService";
import useSocket from "@/libs/socket";

const Home = () => {
  console.count("render");
  const auth = useAuth();
  const navigate = useNavigate();
  // const socket = useSocket();
  // console.log(socket.id);

  const hello = async () => {
    console.log("hello", auth.currentUser);
  };

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button className="btn btn-primary" onClick={hello}>
        Hello
      </button>

      <button className="btn btn-error" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
