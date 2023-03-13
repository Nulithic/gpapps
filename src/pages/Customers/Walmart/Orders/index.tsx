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

import socket, { socketListen } from "@/libs/socket";
import IndeterminateCheckbox from "@/components/CheckBox";
import DataTable from "@/components/DataTable";
import ActionBar from "./ActionBar";
import { getWalmartOrders } from "@/api/customers/Walmart";

const filterList = [
  {
    accessorKey: "purchaseOrderDate",
    header: "PO Date",
    enableColumnFilter: true,
  },
  {
    accessorKey: "purchaseOrderNumber",
    header: "PO Number",
    enableColumnFilter: true,
  },
  {
    accessorKey: "distributionCenterNumber",
    header: "DC Number",
    enableColumnFilter: true,
  },
  {
    accessorKey: "purchaseOrderType",
    header: "PO Type Code",
    enableColumnFilter: true,
  },
  {
    accessorKey: "purchaseOrderEventCode",
    header: "PO Event Code",
    enableColumnFilter: true,
  },
  {
    accessorKey: "actualWeight",
    header: "Actual Weight",
    enableColumnFilter: true,
  },
  {
    accessorKey: "billOfLading",
    header: "BOL",
    enableColumnFilter: true,
  },
  {
    accessorKey: "carrierSCAC",
    header: "SCAC",
    enableColumnFilter: true,
  },
  {
    accessorKey: "carrierReference",
    header: "Carrier Reference",
    enableColumnFilter: true,
  },
  {
    accessorKey: "class",
    header: "Class",
    enableColumnFilter: true,
  },
  {
    accessorKey: "nmfc",
    header: "NMFC",
    enableColumnFilter: true,
  },
  {
    accessorKey: "floorOrPallet",
    header: "Floor or Pallet",
    enableColumnFilter: true,
  },
  {
    accessorKey: "height",
    header: "Height",
    enableColumnFilter: true,
  },
  {
    accessorKey: "width",
    header: "Width",
    enableColumnFilter: true,
  },
  {
    accessorKey: "length",
    header: "Length",
    enableColumnFilter: true,
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    enableColumnFilter: true,
  },
  {
    accessorKey: "loadDestination",
    header: "Load Destination",
    enableColumnFilter: true,
  },
  {
    accessorKey: "mustArriveByDate",
    header: "MABD",
    enableColumnFilter: true,
  },
  {
    accessorKey: "numberOfCartons",
    header: "Carton Count",
    enableColumnFilter: true,
  },
  {
    accessorKey: "saleOrderNumber",
    header: "SO Number",
    enableColumnFilter: true,
  },
  {
    accessorKey: "shipDateScheduled",
    header: "Ship Date Scheduled",
    enableColumnFilter: true,
  },
  {
    accessorKey: "shipNoLater",
    header: "Ship No Later",
    enableColumnFilter: true,
  },
  {
    accessorKey: "shipNotBefore",
    header: "Ship Not Before",
    enableColumnFilter: true,
  },
  {
    accessorKey: "doNotDeliverAfter",
    header: "Do Not Deliver After",
    enableColumnFilter: true,
  },
  {
    accessorKey: "fobMethodOfPayment",
    header: "Method of Payment",
    enableColumnFilter: true,
  },
  {
    accessorKey: "fobPaymentLocation",
    header: "Payment Location",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingParty",
    header: "Buying Party",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyGLN",
    header: "GLN",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyStreet",
    header: "Street",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyCity",
    header: "City",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyStateOrProvince",
    header: "State/Province",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyPostalCode",
    header: "Postal Code",
    enableColumnFilter: true,
  },
  {
    accessorKey: "buyingPartyCountry",
    header: "Country",
    enableColumnFilter: true,
  },
  {
    accessorKey: "departmentNumber",
    header: "Department Number",
    enableColumnFilter: true,
  },
  {
    accessorKey: "grossValue",
    header: "Gross Value",
    enableColumnFilter: true,
  },
];

const selectCol: ColumnDef<any> = {
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
};

const Walmart = () => {
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);

  const [data, setData] = useState<any[]>([]);

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      expanded,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    const prepColumnFilter = () => {
      if (!localStorage.getItem("walmartColumnFilters")) {
        localStorage.setItem("walmartColumnFilters", JSON.stringify(filterList));
        prepColumnFilter();
      } else {
        let getColumns = JSON.parse(localStorage.getItem("walmartColumnFilters")!!);

        for (let col of getColumns) {
          col.cell = (info: any) => (info.getValue() ? info.getValue() : <></>);
        }

        getColumns.unshift(selectCol);

        setColumns(getColumns);
      }
    };
    prepColumnFilter();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getWalmartOrders();
      setData(res.data);
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.map((item) => item.original);

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar filterList={filterList} selection={selection} />
      <DataTable table={table} enableFilter height="h-[calc(100vh-216px)]" />
    </div>
  );
};

export default Walmart;
