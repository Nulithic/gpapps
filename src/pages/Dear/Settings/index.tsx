import { updateDearProducts, updateDearLocations, updateDearInventory } from "@/services/dearService";
import ProgressButton from "@/components/ProgressButton";

const Settings = () => {
  const handleProducts = async (socketID: string) => {
    try {
      const res = await updateDearProducts(socketID);
      console.log(res.data);
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
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <ProgressButton
        btnName="Products"
        progressKey="getDearProducts"
        progressKey2="updateDearProducts"
        maxProgressKey="getDearProductsMax"
        maxProgressKey2="updateDearProductsMax"
        secondBar={true}
        method={handleProducts}
      />
      <ProgressButton
        btnName="Locations"
        progressKey="getDearLocations"
        progressKey2="updateDearLocations"
        maxProgressKey="getDearLocationsMax"
        maxProgressKey2="updateDearLocationsMax"
        secondBar={true}
        method={handleLocations}
      />
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
