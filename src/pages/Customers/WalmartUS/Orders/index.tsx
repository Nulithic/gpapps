import { useState, useEffect } from "react";
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
import ActionBar from "./ActionBar";
import { getWalmartOrders } from "@/api/customers/WalmartUS";

import PackingSlip from "./Documents/PackingSlip";
import UnderlyingBOL from "./Documents/UnderlyingBOL";
import MasterBOL from "./Documents/MasterBOL";

import CaseLabel from "./Documents/CaseLabel";
import SinglePalletLabel from "./Documents/SinglePalletLabel";

import Spinner from "@/components/Spinner";
import MultiPalletLabel from "./Documents/MultiPalletLabel";
import ASN from "./ASN";
import Invoice from "./Invoice";
import Sync from "./Sync";

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

const WalmartUS = () => {
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

  const [tableOptions, setTableOptions] = useState<string>("All");

  const [packingSlipFrame, setPackingSlipFrame] = useState(false);
  const [underlyingBOLFrame, setUnderlyingBOLFrame] = useState(false);
  const [masterBOLFrame, setMasterBOLFrame] = useState(false);

  const [caseLabelFrame, setCaseLabelFrame] = useState(false);
  const [singlePalletLabelFrame, setSinglePalletLabelFrame] = useState(false);
  const [multiPalletLabelFrame, setMultiPalletLabelFrame] = useState(false);

  const [asnFrame, setASNFrame] = useState(false);
  const [invoiceFrame, setInvoiceFrame] = useState(false);
  const [syncFrame, setSyncFrame] = useState(false);

  const handleTableOptions = (value: string) => {
    localStorage.setItem("walmartUSTableOptions", value);
    setTableOptions(value);
  };

  const handlePackingSlipFrame = () => {
    setPackingSlipFrame((prev) => !prev);
  };
  const handleUnderlyingBOLFrame = () => {
    setUnderlyingBOLFrame((prev) => !prev);
  };
  const handleMasterBOLFrame = () => {
    setMasterBOLFrame((prev) => !prev);
  };

  const handleCaseLabelFrame = () => {
    setCaseLabelFrame((prev) => !prev);
  };
  const handleSinglePalletLabelFrame = () => {
    setSinglePalletLabelFrame((prev) => !prev);
  };
  const handleMultiPalletLabelFrame = () => {
    setMultiPalletLabelFrame((prev) => !prev);
  };

  const handleASNFrame = () => {
    setASNFrame((prev) => !prev);
  };
  const handleInvoiceFrame = () => {
    setInvoiceFrame((prev) => !prev);
  };
  const handleSyncFrame = () => {
    setSyncFrame((prev) => !prev);
  };

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
      if (!localStorage.getItem("walmartUSColumnFilters")) {
        localStorage.setItem("walmartUSColumnFilters", JSON.stringify(filterList));
        prepColumnFilter();
      } else {
        let getColumns = JSON.parse(localStorage.getItem("walmartUSColumnFilters")!!);
        for (let col of getColumns) {
          col.cell = (info: any) => (info.getValue() ? info.getValue().toString() : <></>);
        }
        getColumns.unshift(selectCol);
        setColumns(getColumns);
      }
    };
    prepColumnFilter();
  }, []);

  useEffect(() => {
    const prepTableOptions = () => {
      if (!localStorage.getItem("walmartUSTableOptions")) {
        localStorage.setItem("walmartUSTableOptions", "All Orders");
        prepTableOptions();
      } else {
        let option = localStorage.getItem("walmartUSTableOptions")!!;
        setTableOptions(option);
      }
    };
    prepTableOptions();
  }, []);

  useEffect(() => {
    (async () => {
      let option = localStorage.getItem("walmartUSTableOptions")!!;
      const res = await getWalmartOrders(option);
      setData(res.data);
      // console.log(res.data);
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.map((item) => item.original);

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col self-center w-full space-y-4 bg-base-300 rounded p-4">
          <ActionBar
            filterList={filterList}
            selection={selection}
            tableOptions={tableOptions}
            handleTableOptions={handleTableOptions}
            handlePackingSlipFrame={handlePackingSlipFrame}
            handleUnderlyingBOLFrame={handleUnderlyingBOLFrame}
            handleMasterBOLFrame={handleMasterBOLFrame}
            handleCaseLabelFrame={handleCaseLabelFrame}
            handleSinglePalletLabelFrame={handleSinglePalletLabelFrame}
            handleMultiPalletLabelFrame={handleMultiPalletLabelFrame}
            handleASNFrame={handleASNFrame}
            handleInvoiceFrame={handleInvoiceFrame}
            handleSyncFrame={handleSyncFrame}
          />
          <DataTable table={table} enableFilter height="h-[calc(100vh-216px)]" />
        </div>
      ) : (
        <div className="flex flex-col self-center">
          <Spinner size={50} />
        </div>
      )}

      {packingSlipFrame ? <PackingSlip selection={selection} frame={packingSlipFrame} handleFrame={handlePackingSlipFrame} /> : null}
      {underlyingBOLFrame ? <UnderlyingBOL selection={selection} frame={underlyingBOLFrame} handleFrame={handleUnderlyingBOLFrame} /> : null}
      {masterBOLFrame ? <MasterBOL selection={selection} frame={masterBOLFrame} handleFrame={handleMasterBOLFrame} /> : null}

      <CaseLabel selection={selection} frame={caseLabelFrame} handleFrame={handleCaseLabelFrame} />
      <SinglePalletLabel selection={selection} frame={singlePalletLabelFrame} handleFrame={handleSinglePalletLabelFrame} />
      <MultiPalletLabel selection={selection} frame={multiPalletLabelFrame} handleFrame={handleMultiPalletLabelFrame} />

      <ASN selection={selection} frame={asnFrame} handleFrame={handleASNFrame} />
      <Invoice selection={selection} frame={invoiceFrame} handleFrame={handleInvoiceFrame} />
      <Sync selection={selection} frame={syncFrame} handleFrame={handleSyncFrame} />
    </>
  );
};

export default WalmartUS;
