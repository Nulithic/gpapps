import { useState, useEffect, useRef, useMemo, HTMLProps } from "react";
import { toast } from "react-hot-toast";
import {
  ColumnDef,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  RowSelectionState,
  ExpandedState,
} from "@tanstack/react-table";

import IndeterminateCheckbox from "@/components/CheckBox";
import DataTable from "@/components/DataTable";

import SelectBar from "./SelectBar";
import AddLine from "./AddLine";
import { getWalmartUSCaseSizes, addWalmartUSCaseSizes, deleteWalmartUSCaseSizes } from "@/api/customers/WalmartUS";

interface CaseSizeData {
  [key: string]: any;
  walmartItem: string;
  itemID: string;
  vsn: string;
  sku: string;
  description: string;
  caseSize: number;
}

const CaseSizes = () => {
  const [data, setData] = useState<CaseSizeData[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const handleAddData = async (addLineData: CaseSizeData) => {
    try {
      const res = await addWalmartUSCaseSizes(addLineData);
      setData(res.data);
      toast.success("Update Success!");
    } catch (err) {
      toast.error("Update Failed!");
    }
  };

  const columns = useMemo<ColumnDef<unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            className="checkbox checkbox-primary rounded"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            className="checkbox checkbox-primary rounded"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      { accessorKey: "walmartItem", header: "Walmart Item", enableColumnFilter: true },
      { accessorKey: "itemID", header: "Item ID", enableColumnFilter: true },
      { accessorKey: "vsn", header: "VSN", enableColumnFilter: true },
      { accessorKey: "sku", header: "SKU", enableColumnFilter: true },
      { accessorKey: "description", header: "Description", enableColumnFilter: true },
      { accessorKey: "caseSize", header: "Case Size", enableColumnFilter: true },
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      expanded,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleDelete = async () => {
    try {
      const rows = table.getSelectedRowModel().rows.map((item) => item.original) as CaseSizeData[];
      const res = await deleteWalmartUSCaseSizes(rows);
      setData(res.data);
      toast.success("Delete Success!");
    } catch (err) {
      toast.error("Delete Failed!");
    }

    table.resetRowSelection();
  };

  useEffect(() => {
    (async () => {
      const res = await getWalmartUSCaseSizes();
      setData(res.data);
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <AddLine handleAddData={handleAddData} />
      <SelectBar selection={selection} handleDelete={handleDelete} />
      <DataTable table={table} enableFilter />
    </div>
  );
};

export default CaseSizes;
