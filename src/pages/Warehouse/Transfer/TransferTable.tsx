import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";

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

const TransferTable = () => {
  const [data, setData] = useState<TransferList[]>([]);

  return (
    <>
      <DataTable data={data} columns={columns} sortList={[]} height={"h-auto"} />
    </>
  );
};

export default TransferTable;
