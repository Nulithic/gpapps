import { updateDearProducts, updateDearLocations, updateDearInventory } from "@/api/dear";
import { getLogs } from "@/api/log";
import ProgressButton from "@/components/ProgressButton";
import { useEffect, useState } from "react";

const Settings = () => {
  const [lastUpdatedProducts, setLastUpdatedProducts] = useState("");
  const [lastUpdatedLocations, setLastUpdatedLocations] = useState("");
  const [lastUpdatedInventory, setLastUpdatedInventory] = useState("");

  const handleProducts = async (socketID: string) => {
    try {
      const res = await updateDearProducts(socketID);
      console.log(res.data);
      let resProducts = await getLogs("updateDearProducts");
      setLastUpdatedProducts(resProducts.data.lastUpdated);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const handleLocations = async (socketID: string) => {
    try {
      const res = await updateDearLocations(socketID);
      console.log(res.data);
      let resLocations = await getLogs("updateDearLocations");
      setLastUpdatedLocations(resLocations.data.lastUpdated);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const handleInventory = async (socketID: string) => {
    try {
      const res = await updateDearInventory(socketID);
      console.log(res.data);
      let resInventory = await getLogs("updateDearInventory");
      setLastUpdatedInventory(resInventory.data.lastUpdated);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      let resProducts = await getLogs("updateDearProducts");
      setLastUpdatedProducts(resProducts.data.lastUpdated);
      let resLocations = await getLogs("updateDearLocations");
      setLastUpdatedLocations(resLocations.data.lastUpdated);
      let resInventory = await getLogs("updateDearInventory");
      setLastUpdatedInventory(resInventory.data.lastUpdated);
    })();
  }, []);

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <p className="text-sm text-gray-400">Products Last Updated: {lastUpdatedProducts}</p>
      <ProgressButton
        btnName="Products"
        progressKey="getDearProducts"
        progressKey2="updateDearProducts"
        maxProgressKey="getDearProductsMax"
        maxProgressKey2="updateDearProductsMax"
        secondBar={true}
        method={handleProducts}
      />
      <div className="flex flex-col w-1/2">
        <div className="flex divider divider-vertical"></div>
      </div>
      <p className="text-sm text-gray-400">Locations Last Updated: {lastUpdatedLocations}</p>
      <ProgressButton
        btnName="Locations"
        progressKey="getDearLocations"
        progressKey2="updateDearLocations"
        maxProgressKey="getDearLocationsMax"
        maxProgressKey2="updateDearLocationsMax"
        secondBar={true}
        method={handleLocations}
      />
      <div className="flex flex-col w-1/2">
        <div className="flex divider divider-vertical"></div>
      </div>
      <p className="text-sm text-gray-400">Inventory Last Updated: {lastUpdatedInventory}</p>
      <ProgressButton
        btnName="Inventory"
        progressKey="getDearInventory"
        progressKey2="updateDearInventory"
        maxProgressKey="getDearInventoryMax"
        maxProgressKey2="updateDearInventoryMax"
        secondBar={true}
        method={handleInventory}
      />
    </div>
  );
};

export default Settings;
