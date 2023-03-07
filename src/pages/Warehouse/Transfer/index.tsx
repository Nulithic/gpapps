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

import { getDearInventory, getDearLocations, getDearProducts, updateDearInventory } from "@/api/dear";
import { getLogs } from "@/api/log";
import { postTransfer } from "@/api/warehouse";
import socket, { socketListen } from "@/libs/socket";
import { DearInventory, DearLocations, DearProducts } from "@/types/dbType";
import IndeterminateCheckbox from "@/components/CheckBox";
import DataTable from "@/components/DataTable";

import ActionBar from "./ActionBar";
import SelectBar from "./SelectBar";
import AddLine from "./AddLine";
import ProcessDialog from "./ProcessDialog";
import ImportDialog from "./ImportDialog";
import Results from "@/components/Results";

interface TransferData {
  [key: string]: any;
  fromLocation: string;
  fromLocationData: DearLocations;
  toLocation: string;
  toLocationData: DearLocations;
  sku: string;
  skuData: any;
  transferQty: string;
  reference: string;
}

const Transfer = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(100);

  const [pageLoading, setPageLoading] = useState(true);
  const [processLoading, setProcessLoading] = useState(false);

  const [inventory, setInventory] = useState<DearInventory[]>([]);
  const [locations, setLocations] = useState<DearLocations[]>([]);
  const [products, setProducts] = useState<DearProducts[]>([]);

  const [data, setData] = useState<TransferData[]>([]);
  const [options, setOptions] = useState({
    complete: true,
    date: new Date(),
  });

  const [log, setLog] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const handleComplete = () => {
    setOptions({ ...options, complete: !options.complete });
  };
  const handleDate = (date: Date) => {
    setOptions({ ...options, date: date });
  };

  const checkForEmpty = (data: TransferData) => {
    const isEmpty = Object.keys(data).map((key) => {
      switch (key) {
        case "reference":
          return false;
        default:
          return data[key] === null || data[key] === "";
      }
    });

    const indexes = isEmpty.map((field, i) => (field === true ? i : -1)).filter((index) => index !== -1);

    if (!isEmpty.includes(true)) {
      return true;
    } else {
      indexes.forEach((index) => {
        switch (index) {
          case 0:
            toast.error("From Location is missing.");
            break;
          case 2:
            toast.error("To Location is missing.");
            break;
          case 4:
            toast.error("SKU is missing.");
            break;
          case 6:
            toast.error("Transfer Quantity is missing.");
            break;
        }
      });
      return false;
    }
  };
  const checkForStock = (data: TransferData) => {
    const filter = inventory.filter((item: DearInventory) => item.sku === data.sku && item.locationID === data.fromLocationData.locationID);
    if (filter.length === 0) return false;
    if (filter[0].available < parseInt(data.transferQty)) return false;
    return true;
  };
  const handleAddData = (addLineData: TransferData) => {
    checkForEmpty(addLineData);
    checkForStock(addLineData);
    if (!checkForStock(addLineData)) toast.error(`The transfer quantity is greater than or not available for the selected "From Location".`);
    if (checkForEmpty(addLineData) && checkForStock(addLineData)) setData((prev) => [...prev, addLineData]);
  };

  const handleImport = (data: TransferData[]) => {
    setData(data);
  };

  const checkTable = () => {
    if (data.length === 0) {
      toast.error("Please enter at least one transfer.");
    } else {
      const check = document.getElementById("processDialog");
      if (check) (check as HTMLInputElement).checked = true;
    }
  };
  const handleTransfer = async () => {
    try {
      setProcessLoading(true);
      socketListen("postDearStockTransferAPI", textRef);

      const transferData = {
        completed: options.complete,
        completedDate: options.date,
        transferList: data,
        skipOrder: true,
      };

      const res = await postTransfer(transferData, socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    socket.off("postDearStockTransferAPI");
    setProcessLoading(false);
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
      { accessorKey: "fromLocation", header: "From Location", enableColumnFilter: true },
      { accessorKey: "toLocation", header: "To Location", enableColumnFilter: true },
      { accessorKey: "sku", header: "SKU", enableColumnFilter: true },
      { accessorKey: "transferQty", header: "Transfer Quantity", enableColumnFilter: true },
      { accessorKey: "reference", header: "Reference", enableColumnFilter: true },
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

  const handleDelete = () => {
    const rows = table.getSelectedRowModel().rows.map((item) => item.index);
    const filtered = data.filter((_, index) => !rows.includes(index));
    setData(filtered);
    table.resetRowSelection();
  };

  useEffect(() => {
    (async () => {
      try {
        socket.on("updateDearInventoryMax", (args) => {
          setMaxProgress(args);
        });
        socket.on("updateDearInventory", (args) => {
          setProgress(args);
        });

        const resProducts = await getDearProducts();
        const productList = resProducts.data.map((item: DearProducts) => ({ ...item, value: item.sku, label: item.sku }));
        setProducts(productList);

        const resLocations = await getDearLocations();
        const LocationList = resLocations.data.map((item: DearLocations) => ({ ...item, value: item.location, label: item.location }));
        setLocations(LocationList);

        if (resProducts.status === 200 && resLocations.status === 200) {
          const resUpdate = await updateDearInventory(socket.id);
          if (resUpdate.status === 200) {
            const resInventory = await getDearInventory();
            setInventory(resInventory.data);

            const resLog = await getLogs("updateDearInventory");

            setLog(resLog.data.lastUpdated);
            setPageLoading(false);
          }
        }
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.length;

  return (
    <>
      {pageLoading ? (
        <div className="flex flex-col h-full justify-center space-y-2">
          <a>Updating Inventory...</a>
          <progress className="progress progress-secondary w-56" max={maxProgress} value={progress}></progress>
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
          <ActionBar
            date={options.date}
            handleDate={handleDate}
            log={log}
            complete={options.complete}
            handleComplete={handleComplete}
            checkTable={checkTable}
          />
          <AddLine handleAddData={handleAddData} locations={locations} products={products} />
          <SelectBar selection={selection} handleDelete={handleDelete} />
          <DataTable table={table} enableFilter />

          <ImportDialog inventory={inventory} locations={locations} products={products} handleImport={handleImport} />
          <ProcessDialog loading={processLoading} textRef={textRef} handleTransfer={handleTransfer} />
        </div>
      )}
    </>
  );
};

export default Transfer;
