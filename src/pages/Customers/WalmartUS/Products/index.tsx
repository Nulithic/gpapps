import { useState, useEffect, useMemo } from "react";
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
  filterFns,
} from "@tanstack/react-table";

import IndeterminateCheckbox from "@/components/CheckBox";
import DataTable from "@/components/DataTable";

import SelectBar from "./SelectBar";
import AddLine from "./AddLine";
import { getWalmartUSProducts, addWalmartUSProducts, deleteWalmartUSProducts } from "@/api/customers/WalmartUS";

interface ProductData {
  [key: string]: any;
  walmartItem: string;
  type: string;
  package: string;
  department: string;
  itemID: string;
  vsn: string;
  sku: string;
  description: string;
  productGTIN: string;
  whiteBoxGTIN: string;
  brownBoxGTIN: string;
  caseSize: number;
}

const Products = () => {
  const [data, setData] = useState<ProductData[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const handleAddData = async (addLineData: ProductData) => {
    try {
      const res = await addWalmartUSProducts(addLineData);
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
      { accessorKey: "type", header: "Type", enableColumnFilter: true },
      { accessorKey: "package", header: "Package", enableColumnFilter: true },
      { accessorKey: "department", header: "Department", enableColumnFilter: true },
      { accessorKey: "itemID", header: "Item ID", enableColumnFilter: true },
      { accessorKey: "vsn", header: "VSN", enableColumnFilter: true },
      { accessorKey: "sku", header: "SKU", enableColumnFilter: true },
      { accessorKey: "description", header: "Description", enableColumnFilter: true },
      { accessorKey: "productGTIN", header: "Product GTIN", enableColumnFilter: true },
      { accessorKey: "whiteBoxGTIN", header: "White Box GTIN", enableColumnFilter: true },
      { accessorKey: "brownBoxGTIN", header: "Brown Box GTIN", enableColumnFilter: true },
      { accessorKey: "caseSize", header: "Case Size", enableColumnFilter: true, filterFn: filterFns.equalsString },
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
      const rows = table.getSelectedRowModel().rows.map((item) => item.original) as ProductData[];
      const res = await deleteWalmartUSProducts(rows);
      setData(res.data);
      toast.success("Delete Success!");
    } catch (err) {
      toast.error("Delete Failed!");
    }

    table.resetRowSelection();
  };

  useEffect(() => {
    (async () => {
      const res = await getWalmartUSProducts();
      setData(res.data);
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <AddLine handleAddData={handleAddData} />
      <SelectBar selection={selection} handleDelete={handleDelete} />
      <DataTable table={table} enableFilter height="h-[calc(100vh-216px)]" />
    </div>
  );
};

export default Products;
