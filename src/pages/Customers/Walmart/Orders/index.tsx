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
    const filterList = [
      {
        accessorKey: "purchase_order_date",
        header: "PO Date",
        enableColumnFilter: true,
      },
      {
        accessorKey: "purchase_order_number",
        header: "PO Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "sale_order_number",
        header: "Sale Order Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "buying_party_purchaser",
        header: "Buying Party Purchaser",
        enableColumnFilter: false,
      },
      {
        accessorKey: "global_location_number",
        header: "GL Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "po_destination_dc_number",
        header: "DC Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_no_later",
        header: "Ship No Later",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_not_before",
        header: "Ship Not Before",
        enableColumnFilter: false,
      },
      {
        accessorKey: "do_not_deliver_after",
        header: "Do Not Deliver After",
        enableColumnFilter: false,
      },
      {
        accessorKey: "transaction_set_purpose",
        header: "Transaction Set Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "number_of_line_items",
        header: "Line Items",
        enableColumnFilter: false,
      },
      {
        accessorKey: "purchase_order_type",
        header: "PO Type Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "currency",
        header: "Currency Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "department_number",
        header: "Department Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "merchandise_type_code",
        header: "Merchandise Type Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "promotion_deal_number",
        header: "Promotion Deal Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "internal_vendor_number",
        header: "Internal Vendor Number",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_to_street",
        header: "Address Infomation",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_to_city",
        header: "City",
        enableColumnFilter: false,
      },
      {
        accessorKey: "state_or_province",
        header: "State",
        enableColumnFilter: false,
      },
      {
        accessorKey: "postal_code",
        header: "Postal Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_to_country",
        header: "Country Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "supplier_manufacturer",
        header: "Supplier Manufacturer",
        enableColumnFilter: false,
      },
      {
        accessorKey: "shipment_method_of_payment",
        header: "Shipment Method of Payment",
        enableColumnFilter: false,
      },
      {
        accessorKey: "location_qualifier",
        header: "Location Qualifier",
        enableColumnFilter: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableColumnFilter: false,
      },
      {
        accessorKey: "terms_type_code",
        header: "Terms Type Code",
        enableColumnFilter: false,
      },
      {
        accessorKey: "terms_basis",
        header: "Terms Basis",
        enableColumnFilter: false,
      },
      {
        accessorKey: "terms_discount_percent",
        header: "Terms Discount Percent",
        enableColumnFilter: false,
      },
      {
        accessorKey: "terms_discount_days_due",
        header: "Terms Discount Days Due",
        enableColumnFilter: false,
      },
      {
        accessorKey: "terms_net_days",
        header: "Terms Net Days",
        enableColumnFilter: false,
      },
      {
        accessorKey: "extended_reference_information",
        header: "Extended Reference",
        enableColumnFilter: false,
      },
      {
        accessorKey: "gross_value",
        header: "Gross Value",
        enableColumnFilter: false,
      },
      {
        accessorKey: "mabd",
        header: "MABD",
        enableColumnFilter: false,
      },
      {
        accessorKey: "bol_with_check_digit",
        header: "BOL With Check Digit",
        enableColumnFilter: false,
      },
      {
        accessorKey: "carrier_reference",
        header: "Carrier reference",
        enableColumnFilter: false,
      },
      {
        accessorKey: "carrier_SCAC",
        header: "Carrier SCAC",
        enableColumnFilter: false,
      },
      {
        accessorKey: "ship_date_scheduled",
        header: "Ship Date Scheduled",
        enableColumnFilter: false,
      },
      {
        accessorKey: "load_destination",
        header: "Load Destination",
        enableColumnFilter: false,
      },
      {
        accessorKey: "invoice_date",
        header: "Invoice Date",
        enableColumnFilter: false,
      },
      {
        accessorKey: "number_of_case",
        header: "Number of Cases",
        enableColumnFilter: false,
      },
      {
        accessorKey: "actual_weight",
        header: "Actual Weight",
        enableColumnFilter: false,
      },
      {
        accessorKey: "h",
        header: "Height",
        enableColumnFilter: false,
      },
      {
        accessorKey: "w",
        header: "Weight",
        enableColumnFilter: false,
      },
      {
        accessorKey: "l",
        header: "Length",
        enableColumnFilter: false,
      },
      {
        accessorKey: "class",
        header: "Class",
        enableColumnFilter: false,
      },
      {
        accessorKey: "nmfc",
        header: "NMFC",
        enableColumnFilter: false,
      },
      {
        accessorKey: "floor_or_pallet",
        header: "Floor or Pallet",
        enableColumnFilter: false,
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

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar />
      <DataTable table={table} enableFilter />
    </div>
  );
};

export default Walmart;
