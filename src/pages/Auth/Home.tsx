import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  console.count("render");

  const hello = async () => {
    // console.log("hello", auth.currentUser);
    // const roles = auth.currentUser?.roles.filter((item) => item.status === true);
    // console.log(roles);
    // console.log(socket.id);
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
