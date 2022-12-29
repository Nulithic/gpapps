import { useState, useEffect } from "react";
// import useSocket from "@/libs/socket";

const Settings = () => {
  //   const socket = useSocket();
  //   console.log(socket.id);

  const handleLocations = () => {};
  const handleProducts = () => {};
  const handleInventory = () => {};

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <button className="btn btn-mid">Locations</button>
      <button className="btn btn-mid">Products</button>
      <button className="btn btn-mid">Inventory</button>
    </div>
  );
};

export default Settings;
