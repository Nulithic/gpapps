import { useState, useEffect, useRef } from "react";

import ActionBar from "./ActionBar";
import AddLine from "./AddLine";
import TransferTable from "./TransferTable";
import { postWarehouseTransfer } from "@/services/warehouseService";
import socket, { socketListen } from "@/libs/socket";
import ProcessDialog from "./ProcessDialog";
import { toast } from "react-hot-toast";
import { getDearInventory, getDearLocations, getDearProducts } from "@/services/dearService";
import { DearInventory, DearLocations, DearProducts } from "@/types/dbType";

interface TransferList {
  [key: string]: any;
  fromLocation: string;
  fromLocationData: DearLocations;
  toLocation: string;
  toLocationData: DearLocations;
  sku: string;
  skuData: any;
  transferQty: string;
  reference: string;
}

const Transfer = () => {
  console.count("render");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [processLoading, setProcessLoading] = useState(false);
  const [inventory, setInventory] = useState<DearInventory[]>([]);
  const [locations, setLocations] = useState<DearLocations[]>([]);
  const [products, setProducts] = useState<DearProducts[]>([]);

  const [options, setOptions] = useState({
    complete: true,
    date: new Date(),
  });

  const [data, setData] = useState<TransferList[]>([]);

  const handleComplete = () => {
    setOptions({ ...options, complete: !options.complete });
  };
  const handleDate = (date: Date) => {
    setOptions({ ...options, date: date });
  };

  const checkForEmpty = (data: TransferList) => {
    const isEmpty = Object.keys(data).map((key) => {
      switch (key) {
        case "reference":
          return false;
        default:
          return data[key] === null || data[key] === "";
      }
    });

    const indexes = isEmpty.map((field, i) => (field === true ? i : -1)).filter((index) => index !== -1);

    if (!isEmpty.includes(true)) {
      return true;
    } else {
      indexes.forEach((index) => {
        switch (index) {
          case 0:
            toast.error("From Location is missing.");
            break;
          case 2:
            toast.error("To Location is missing.");
            break;
          case 4:
            toast.error("SKU is missing.");
            break;
          case 6:
            toast.error("Transfer Quantity is missing.");
            break;
        }
      });
      return false;
    }
  };
  const checkForStock = (data: TransferList) => {
    const filter = inventory.filter((item: DearInventory) => item.sku === data.sku && item.locationID === data.fromLocationData.locationID);
    if (filter.length === 0) return false;
    if (filter[0].available < parseInt(data.transferQty)) return false;
    return true;
  };

  const handleAddData = (addLineData: TransferList) => {
    checkForEmpty(addLineData);
    checkForStock(addLineData);
    if (!checkForStock(addLineData)) toast.error(`The transfer quantity is greater than or not available for the selected "From Location".`);
    if (checkForEmpty(addLineData) && checkForStock(addLineData)) setData((prev) => [...prev, addLineData]);
  };

  const handleTransfer = async () => {
    try {
      setProcessLoading(true);
      socketListen("postDearStockTransferAPI", textRef);

      const transferData = {
        completed: options.complete,
        completedDate: options.date,
        transferList: data,
        skipOrder: true,
      };

      const res = await postWarehouseTransfer(transferData, socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    socket.off("postDearStockTransferAPI");
    setProcessLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getDearInventory();
        setInventory(res.data);
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
    (async () => {
      try {
        const res = await getDearProducts();
        const list = res.data.map((item: DearProducts) => ({ ...item, value: item.sku, label: item.sku }));
        setProducts(list);
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
    (async () => {
      try {
        const res = await getDearLocations();
        const list = res.data.map((item: DearLocations) => ({ ...item, value: item.location, label: item.location }));
        setLocations(list);
        setPageLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
  }, []);

  return (
    <>
      {pageLoading ? (
        <div className="flex h-full items-center">
          <progress className="progress progress-secondary w-56"></progress>
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
          <ActionBar date={options.date} handleDate={handleDate} complete={options.complete} handleComplete={handleComplete} />
          <AddLine handleAddData={handleAddData} locations={locations} products={products} />
          <TransferTable data={data} />
          <ProcessDialog loading={processLoading} textRef={textRef} handleTransfer={handleTransfer} />
        </div>
      )}
    </>
  );
};

export default Transfer;
