import { useState, useEffect } from "react";

import { updateDearProducts, updateDearLocations, updateDearInventory } from "@/services/dearService";
import ProgressButton from "@/components/ProgressButton";

const Settings = () => {
  console.count("render");

  const handleProducts = async (socketID: string) => {
    try {
      const res = await updateDearProducts(socketID);
      return res.data;
    } catch (err) {
      return false;
    }
  };

  const handleLocations = () => {};
  const handleInventory = () => {};

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <ProgressButton
        btnName="Products"
        maxProgressKey="updateDearProductsMax"
        progressKey="updateDearProducts"
        maxProgressKey2="asdfMax"
        progressKey2="asdf"
        secondBar={true}
        method={handleProducts}
      />
      <ProgressButton
        btnName="Locations"
        maxProgressKey="updateDearLocationsMax"
        progressKey="updateDearLocations"
        secondBar={false}
        method={handleLocations}
      />
      <ProgressButton
        btnName="Inventory"
        maxProgressKey="updateDearInventoryMax"
        progressKey="updateDearInventory"
        secondBar={false}
        method={handleInventory}
      />
    </div>
  );
};

export default Settings;
