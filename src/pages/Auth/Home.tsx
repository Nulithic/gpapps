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

  // console.log("hello", auth.currentUser);

  const hello = async () => {
    console.log("hello", auth.currentUser);
    const roles = auth.currentUser?.roles.filter((item) => item.status === true);
    console.log(roles);
  };

  return (
    <div className="items-center">
      <button className="btn btn-primary" onClick={hello}>
        Hello
      </button>
    </div>
  );
};

export default Home;
