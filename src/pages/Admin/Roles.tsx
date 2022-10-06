import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth/context";
import { userLogout } from "@/services/authService";
import useSocket from "@/libs/socket";

const Roles = () => {
  console.count("render");
  const auth = useAuth();
  const navigate = useNavigate();
  // const socket = useSocket();
  // console.log(socket.id);

  const hello = async () => {
    console.log("hello", auth.currentUser);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={hello}>
        Hello
      </button>
    </>
  );
};

export default Roles;
