import { useState, useEffect } from "react";

import DataTable from "@/components/DataTable";

import ActionBar from "./ActionBar";
import AddLine from "./AddLine";
import TransferTable from "./TransferTable";

interface TransferList {
  fromLocation: string;
  fromLocationData: {};
  toLocation: string;
  toLocationData: {};
  sku: string;
  transferQty: string;
  reference: string;
}

const columns = [
  { accessorKey: "fromLocation", header: "From Location", enableColumnFilter: true },
  { accessorKey: "toLocation", header: "To Location", enableColumnFilter: true },
  { accessorKey: "sku", header: "SKU", enableColumnFilter: true },
  { accessorKey: "transferQty", header: "Transfer Quantity", enableColumnFilter: true },
  { accessorKey: "reference", header: "Reference", enableColumnFilter: true },
];

const Transfer = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<TransferList[]>([]);

  const handleAddData = (addLineData: TransferList) => {
    setData((prev) => [...prev, addLineData]);
  };

  console.log(data);

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar date={date} setDate={setDate} />
      <AddLine handleAddData={handleAddData} />
      <TransferTable data={data} />
    </div>
  );
};

export default Transfer;
