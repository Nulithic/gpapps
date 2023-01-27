import DataTable from "@/components/DataTable";

const columns = [
  { accessorKey: "fromLocation", header: "From Location", enableColumnFilter: true },
  { accessorKey: "toLocation", header: "To Location", enableColumnFilter: true },
  { accessorKey: "sku", header: "SKU", enableColumnFilter: true },
  { accessorKey: "transferQty", header: "Transfer Quantity", enableColumnFilter: true },
  { accessorKey: "reference", header: "Reference", enableColumnFilter: true },
];

const TransferTable = ({ data }: any) => {
  return <DataTable data={data} columns={columns} sortList={[]} height={"h-[calc(100vh-292px)]"} enableFilters={false} />;
};

export default TransferTable;
