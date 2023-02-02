import { useState, useRef } from "react";

import ActionBar from "./ActionBar";
import AddLine from "./AddLine";
import TransferTable from "./TransferTable";
import { postWarehouseTransfer } from "@/services/warehouseService";
import socket, { socketListen } from "@/libs/socket";
import ProcessDialog from "./ProcessDialog";

interface TransferList {
  fromLocation: string;
  fromLocationData: {};
  toLocation: string;
  toLocationData: {};
  sku: string;
  transferQty: string;
  reference: string;
}

const Transfer = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
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
  const handleAddData = (addLineData: TransferList) => {
    setData((prev) => [...prev, addLineData]);
  };

  const handleTransfer = async () => {
    try {
      setLoading(true);
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
    setLoading(false);
  };

  console.log(options, data);

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar date={options.date} handleDate={handleDate} complete={options.complete} handleComplete={handleComplete} />
      <AddLine handleAddData={handleAddData} />
      <TransferTable data={data} />
      <ProcessDialog loading={loading} textRef={textRef} handleTransfer={handleTransfer} />
    </div>
  );
};

export default Transfer;
