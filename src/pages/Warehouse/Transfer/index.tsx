import { useState, useEffect } from "react";

import DataTable from "@/components/DataTable";

import ActionBar from "./ActionBar";
import AddLine from "./AddLine";

interface TransferList {
  fromLocation: string;
  toLocation: string;
  product: string;
  qty: number;
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

  const [addLineData, setAddLineData] = useState({
    fromLocation: "",
    toLocation: "",
    SKU: "",
    transferQty: "",
    reference: "",
  });

  console.log(addLineData);

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar date={date} setDate={setDate} />
      <AddLine addLineData={addLineData} setAddLineData={setAddLineData} />
      <DataTable data={data} columns={columns} sortList={[]} height={"h-auto"} enableFilters={false} />
    </div>
  );
};

export default Transfer;
