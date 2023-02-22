import { useState, useEffect, useMemo } from "react";
import { FileValidated } from "@dropzone-ui/react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import download from "downloadjs";
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
  Row,
} from "@tanstack/react-table";

import { getDearLocations } from "@/services/dearService";
import { getLogs } from "@/services/logService";
import ImportFile from "@/components/ImportFile";
import DataTable from "@/components/DataTable";

import { DearLocations } from "@/types/dbType";
import { getCompareTemplate, postCompare } from "@/services/warehouseService";

interface ImportData {
  SKU: string;
  Bin: string;
  Quantity: number;
}

interface CompareData extends ImportData {
  dearStock: number;
  status: string;
  cost?: number;
  adjustment?: string;
}

const Compare = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [processLoading, setProcessLoading] = useState(false);

  const [log, setLog] = useState("");

  const [importFile, setImportFile] = useState<FileValidated[]>([]);
  const [importData, setImportData] = useState<ImportData[]>([]);

  const [locationList, setLocationList] = useState<DearLocations[]>([]);
  const [location, setLocation] = useState<string>("Main Warehouse");

  const [data, setData] = useState<CompareData[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "status",
      desc: true,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const downloadTemplate = async () => {
    try {
      const res = await getCompareTemplate();
      download(new Blob([res.data]), "BulkShipTemplate.xlsx");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompare = async () => {
    try {
      setProcessLoading(true);
      const res = await postCompare(importData, location);
      if (res.status === 200) {
        setProcessLoading(false);
        setData(res.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Compare failed.");
      setProcessLoading(false);
    }
  };

  const handleAdjustment = async () => {
    const checkNotFound = data.some((item) => item.status === "Product Not Found");
    if (checkNotFound) return toast.error("Please fix the products that are not found before downloading the adjustment.");
    const filterStatus = data.filter((item) => item.status !== "Equal");
    const csvData = filterStatus.map((item: CompareData) => ({
      "Zero/NonZero": item.adjustment,
      Location: location,
      SKU: item.SKU,
      Name: "",
      Bin: item.Bin,
      BatchSerialNumber: "",
      ExpiryDate_YYYYMMDD: "",
      Quantity: item.Quantity,
      UnitCost: item.cost ?? "",
      Comments: "",
      ReceivedDate_YYYYMMDD: item.adjustment === "Zero" ? format(new Date(), "yyyyMMdd") : "",
    }));

    const XLSX = await import("xlsx");
    var ws = XLSX.utils.json_to_sheet(csvData, {
      header: [
        "Zero/NonZero",
        "Location",
        "SKU",
        "Name",
        "Bin",
        "BatchSerialNumber",
        "ExpiryDate_YYYYMMDD",
        "Quantity",
        "UnitCost",
        "Comments",
        "ReceivedDate_YYYYMMDD",
      ],
    });
    var csv = XLSX.utils.sheet_to_csv(ws);
    const date = format(new Date(), "MM.dd.yyyy");
    download(new Blob([csv]), `StockAdjustment - ${date}.csv`);
  };

  useEffect(() => {
    if (importFile.length > 0) {
      setImportData([]);
      const parseFile = () => {
        const importFileReader = new FileReader();
        importFileReader.onload = async (e) => {
          const XLSX = await import("xlsx");
          const wb = XLSX.read(e.target?.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          let data = XLSX.utils.sheet_to_json(ws, { defval: "" }) as ImportData[];
          data = data.map((item) => ({ ...item, SKU: item.SKU.toString() }));
          setImportData(data);
        };
        importFileReader.readAsBinaryString(importFile[0].file);
      };
      parseFile();
    }
  }, [importFile]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDearLocations();
        const list = res.data.filter((item: DearLocations) => item.bin === "");
        setLocationList(list);
        setPageLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
    (async () => {
      try {
        const res = await getLogs("updateDearInventory");
        setLog(res.data.lastUpdated);
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    })();
  }, []);

  const columns = useMemo<ColumnDef<unknown>[]>(
    () => [
      { accessorKey: "SKU", header: "SKU", enableColumnFilter: true },
      { accessorKey: "Bin", header: "Bin", enableColumnFilter: true },
      { accessorKey: "Quantity", header: "Quantity", enableColumnFilter: true },
      { accessorKey: "dearStock", header: "Dear OnHand", enableColumnFilter: true },
      { accessorKey: "status", header: "Status", enableColumnFilter: true },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
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

  const rowColors = (row: Row<CompareData>) => {
    switch ((row.original as CompareData).status) {
      case "Product Not Found":
        return "bg-error";
      case "No Stock in Location":
        return "bg-sky-400";
      case "Not Equal":
        return "bg-yellow-500";
      default:
        return "";
    }
  };

  return (
    <>
      {pageLoading ? (
        <div className="flex h-full items-center">
          <progress className="progress progress-secondary w-56"></progress>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center space-y-4">
          <div className=" flex flex-col w-1/2 items-center space-y-4">
            <p className="text-sm text-gray-400">Inventory Last Updated: {log}</p>

            <select className="select select-bordered select-mid w-full" value={location} onChange={(e) => setLocation(e.target.value)}>
              {locationList.map((item) => (
                <option key={item.locationID} value={item.location}>
                  {item.location}
                </option>
              ))}
            </select>
            <ImportFile label="Drop File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
            <div className="flex flex-row space-x-2">
              {processLoading ? (
                <div className="flex h-full items-center">
                  <progress className="progress progress-secondary w-56"></progress>
                </div>
              ) : (
                <>
                  <button className="btn btn-mid" onClick={downloadTemplate}>
                    Template
                  </button>
                  <button className="btn btn-primary btn-mid" onClick={handleCompare}>
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
          {data.length > 0 ? (
            <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
              <button className="btn btn-primary btn-mid" onClick={handleAdjustment}>
                Download Adjustment
              </button>
              <DataTable table={table} rowColors={rowColors} />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Compare;
