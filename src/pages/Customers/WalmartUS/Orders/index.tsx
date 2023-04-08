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
import { PDFViewer } from "@react-pdf/renderer";

import socket, { socketListen } from "@/libs/socket";
import IndeterminateCheckbox from "@/components/CheckBox";
import DataTable from "@/components/DataTable";
import ActionBar from "./ActionBar";
import { getWalmartOrders } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";

import PackingList from "./PDF/PackingList";
import UnderlyingBOL from "./PDF/UnderlyingBOL";
import MasterBOL from "./PDF/MasterBOL";

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

interface PDFModalProps {
  pdf: string;
  selection: WalmartOrder[];
  frame: boolean;
  handleFrame: () => void;
}

const PDFModal = ({ pdf, selection, frame, handleFrame }: PDFModalProps) => {
  return (
    <>
      <PDFViewer height="1000px" width="100%">
        <MasterBOL selection={selection} />
      </PDFViewer>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative h-[calc(100vh-216px)] max-w-full p-12">
          <label htmlFor="pdfModal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleFrame}>
            ✕
          </label>
          {frame && pdf === "packingList" ? (
            <PDFViewer height="100%" width="100%">
              <PackingList selection={selection} />
            </PDFViewer>
          ) : null}
          {frame && pdf === "underlyingBOL" ? (
            <PDFViewer height="100%" width="100%">
              <UnderlyingBOL selection={selection} />
            </PDFViewer>
          ) : null}
          {frame && pdf === "masterBOL" ? (
            <PDFViewer height="100%" width="100%">
              <PackingList selection={selection} />
            </PDFViewer>
          ) : null}
        </div>
      </div>
    </>
  );
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

  const [packingListFrame, setPackingListFrame] = useState(false);
  const [underlyingBOLFrame, setUnderlyingBOLFrame] = useState(false);
  const [masterBOLFrame, setMasterBOLFrame] = useState(false);

  const handleTableOptions = (value: string) => {
    localStorage.setItem("walmartTableOptions", value);
    setTableOptions(value);
  };
  const handlePackingListFrame = () => {
    setPackingListFrame((prev) => !prev);
  };
  const handleUnderlyingBOLFrame = () => {
    setUnderlyingBOLFrame((prev) => !prev);
  };
  const handleMasterBOLFrame = () => {
    setMasterBOLFrame((prev) => !prev);
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
      if (!localStorage.getItem("walmartTableOptions")) {
        localStorage.setItem("walmartTableOptions", "All Orders");
        prepTableOptions();
      } else {
        let option = localStorage.getItem("walmartTableOptions")!!;
        setTableOptions(option);
      }
    };
    prepTableOptions();
  }, []);

  useEffect(() => {
    (async () => {
      let option = localStorage.getItem("walmartTableOptions")!!;
      const res = await getWalmartOrders(option);
      setData(res.data);
      // console.log(res.data);
    })();
  }, []);

  const selection = table.getSelectedRowModel().rows.map((item) => item.original);

  const tempSelection = [
    {
      purchaseOrderNumber: "2627886313",
      actualWeight: "148",
      archived: "No",
      baselineItemDataPO1Loop: [
        {
          baselineItemDataPO1: {
            assignedIdentification01: "001",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 29.8,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990286",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307819",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008618",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307819",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 715.2,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "002",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 20.5,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990288",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307833",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008620",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307833",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 492,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "003",
            quantity02: 48,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 12.85,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990291",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307789",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008614",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307789",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 616.8,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "004",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 24.75,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990292",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307840",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008622",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307840",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 594,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "005",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 22.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680005",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309370",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014178",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309370",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 801,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "006",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 9.95,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680007",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309349",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014175",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309349",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 358.2,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "007",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 9.99,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680008",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309257",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014176",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309257",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 359.64,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "009",
            quantity02: 12,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 27.2,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680011",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309288",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014173",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309288",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 326.4,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "010",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 13.65,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "581044821",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307772",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008613",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307772",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 491.4,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "012",
            quantity02: 72,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 14.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "598277460",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131414869",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100078201",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "NA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131414869",
            productServiceIdQualifier12: "BO",
            productServiceId13: "BLACK",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 1026,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "013",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 14.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "598277461",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131414876",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100078206",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "NA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131414876",
            productServiceIdQualifier12: "BO",
            productServiceId13: "NA",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 342,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "001",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 29.8,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990286",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307819",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008618",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307819",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 715.2,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "002",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 20.5,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990288",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307833",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008620",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307833",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 492,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "003",
            quantity02: 48,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 12.85,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990291",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307789",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008614",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307789",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 616.8,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "004",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 24.75,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990292",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307840",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008622",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307840",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 594,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "005",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 22.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680005",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309370",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014178",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309370",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 801,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "006",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 9.95,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680007",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309349",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014175",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309349",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 358.2,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "007",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 9.99,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680008",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309257",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014176",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309257",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 359.64,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "009",
            quantity02: 12,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 27.2,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680011",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309288",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014173",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309288",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 326.4,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "010",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 13.65,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "581044821",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307772",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008613",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307772",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 491.4,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "012",
            quantity02: 72,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 14.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "598277460",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131414869",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100078201",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "NA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131414869",
            productServiceIdQualifier12: "BO",
            productServiceId13: "BLACK",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 1026,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "013",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 14.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "598277461",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131414876",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100078206",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "NA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131414876",
            productServiceIdQualifier12: "BO",
            productServiceId13: "NA",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 342,
              },
            },
          ],
        },
      ],
      beginningSegmentForPurchaseOrderBEG: {
        transactionSetPurposeCode01: "00",
        purchaseOrderTypeCode02: "SA",
        purchaseOrderNumber03: "2627886313",
        date05: "2023-02-20",
      },
      billOfLading: "08199520201322835",
      buyingParty: "REGIONAL DISTRIBUTION CENTER 3124",
      buyingPartyCity: "HOPKINSVILLE",
      buyingPartyCountry: "US",
      buyingPartyGLN: "0078742041445",
      buyingPartyPostalCode: "42240",
      buyingPartyStateOrProvince: "KY",
      buyingPartyStreet: "694 CRENSHAW BLVD",
      carrierDetailsRoutingSequenceTransitTimeTD5: [
        {
          routingSequenceCode01: "O",
          routing05: "CALL4792734300#",
        },
      ],
      carrierName: "WAL-MART TRANSPORTATION LLC",
      carrierReference: "66503618",
      carrierSCAC: "WALM",
      carrierClass: "175",
      currencyCUR: {
        entityIdentifierCode01: "BY",
        currencyCode02: "USD",
      },
      dateTimeReferenceDTM: [
        {
          dateTimeQualifier01: "038",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "037",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "063",
          date02: "2023-03-07",
        },
      ],
      departmentNumber: "00072",
      distributionCenterNumber: "6066",
      doNotDeliverAfter: "03/07/2023",
      extendedReferenceInformationN9Loop: [
        {
          extendedReferenceInformationN9: {
            referenceIdentificationQualifier01: "L1",
            referenceIdentification02: "SPECIAL INSTRUCTIONS",
          },
          textMTX: [
            {
              textualData02: "NO PRETICKET",
            },
          ],
        },
      ],
      floorOrPallet: "P",
      fobMethodOfPayment: "CC",
      fobPaymentLocation: "OR",
      fobRelatedInstructionsFOB: [
        {
          shipmentMethodOfPayment01: "CC",
          locationQualifier02: "OR",
          description03: "VARIOUS                     ZZ",
        },
      ],
      grossValue: "6122.64",
      height: "40",
      internalVendorNumber: "546382721",
      invoiceDate: "02/23/2023",
      length: "21",
      loadDestination: "6909",
      mustArriveByDate: "03/07/2023",
      nmfc: "101740-1",
      numberOfCartons: "31",
      partyIdentificationN1Loop: [
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "BY",
            name02: "WAL-MART DC 6066A-ASM DIS",
            identificationCodeQualifier03: "UL",
            identificationCode04: "0078742041445",
          },
          partyLocationN3: [
            {
              addressInformation01: "694 CRENSHAW BLVD",
            },
          ],
          geographicLocationN4: [
            {
              cityName01: "HOPKINSVILLE",
              stateOrProvinceCode02: "KY",
              postalCode03: "42240",
              countryCode04: "US",
            },
          ],
        },
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "SU",
            name02: "GREEN PROJECT, INC.",
          },
          partyLocationN3: [],
          geographicLocationN4: [],
        },
      ],
      purchaseOrderDate: "02/20/2023",
      purchaseOrderEventCode: "POS REPLEN",
      purchaseOrderType: "0033",
      referenceInformationREF: [
        {
          referenceIdentificationQualifier01: "DP",
          referenceIdentification02: "00072",
        },
        {
          referenceIdentificationQualifier01: "MR",
          referenceIdentification02: "0033",
        },
        {
          referenceIdentificationQualifier01: "PD",
          referenceIdentification02: "POS REPLEN",
        },
        {
          referenceIdentificationQualifier01: "IA",
          referenceIdentification02: "546382721",
        },
      ],
      saleOrderNumber: "132283",
      servicePromotionAllowanceOrChargeInformationSACLoop: [
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "I410",
            amount05: 127.96,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 2.09,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "F910",
            amount05: 61.23,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 1,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
      ],
      shipDateScheduled: "02/23/2023",
      shipNoLater: "02/23/2023",
      shipNotBefore: "02/23/2023",
      termsOfSaleDeferredTermsOfSaleITD: [
        {
          termsTypeCode01: "08",
          termsBasisDateCode02: "15",
          termsDiscountPercent03: 1,
          termsDiscountDaysDue05: 50,
          termsNetDays07: 90,
        },
      ],
      transactionSetHeaderST: {
        transactionSetIdentifierCode01: "850",
        transactionSetControlNumber02: 109369,
      },
      transactionSetTrailerSE: {
        numberOfIncludedSegments01: 57,
        transactionSetControlNumber02: 109369,
      },
      transactionTotalsCTTLoop: [
        {
          transactionTotalsCTT: {
            numberOfLineItems01: 11,
          },
          monetaryAmountInformationAMT: {
            amountQualifierCode01: "GV",
            monetaryAmount02: 6122.64,
          },
        },
      ],
      width: "48",
    },
    {
      purchaseOrderNumber: "2528115588",
      actualWeight: "51",
      archived: "No",
      baselineItemDataPO1Loop: [
        {
          baselineItemDataPO1: {
            assignedIdentification01: "001",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 36.5,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990287",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307864",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008624",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307864",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 876,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "002",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 18.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990290",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307796",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008616",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307796",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 438,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "003",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 13.5,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578578595",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307826",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008619",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307826",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 324,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "004",
            quantity02: 12,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 18.5,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680004",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309318",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014170",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309318",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 222,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "005",
            quantity02: 36,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 9.95,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "578680007",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131309349",
            productServiceIdQualifier10: "VN",
            productServiceId11: "INHPGP100014175",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131309349",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 358.2,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "007",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 13.65,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "581044821",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307772",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008613",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307772",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 327.6,
              },
            },
          ],
        },
        {
          baselineItemDataPO1: {
            assignedIdentification01: "009",
            quantity02: 24,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 14.25,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "598277461",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131414876",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100078206",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "NA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131414876",
            productServiceIdQualifier12: "BO",
            productServiceId13: "NA",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 342,
              },
            },
          ],
        },
      ],
      beginningSegmentForPurchaseOrderBEG: {
        transactionSetPurposeCode01: "00",
        purchaseOrderTypeCode02: "SA",
        purchaseOrderNumber03: "2528115588",
        date05: "2023-02-20",
      },
      billOfLading: "08199520201322828",
      buyingParty: "WAL-MART DC 7038A-ASM DIS",
      buyingPartyCity: "FT PIERCE",
      buyingPartyCountry: "US",
      buyingPartyGLN: "0078742048079",
      buyingPartyPostalCode: "34981",
      buyingPartyStateOrProvince: "FL",
      buyingPartyStreet: "4009 SOUTH JENKINS RD",
      carrierDetailsRoutingSequenceTransitTimeTD5: [
        {
          routingSequenceCode01: "O",
          routing05: "CALL4792734300#",
        },
      ],
      carrierName: "JB HUNT",
      carrierReference: "25603520",
      carrierSCAC: "HJBT",
      carrierClass: "175",
      currencyCUR: {
        entityIdentifierCode01: "BY",
        currencyCode02: "USD",
      },
      dateTimeReferenceDTM: [
        {
          dateTimeQualifier01: "038",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "037",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "063",
          date02: "2023-03-16",
        },
      ],
      departmentNumber: "00072",
      distributionCenterNumber: "7038",
      doNotDeliverAfter: "03/16/2023",
      extendedReferenceInformationN9Loop: [
        {
          extendedReferenceInformationN9: {
            referenceIdentificationQualifier01: "L1",
            referenceIdentification02: "SPECIAL INSTRUCTIONS",
          },
          textMTX: [
            {
              textualData02: "NO PRETICKET",
            },
          ],
        },
      ],
      floorOrPallet: "F",
      fobMethodOfPayment: "CC",
      fobPaymentLocation: "OR",
      fobRelatedInstructionsFOB: [
        {
          shipmentMethodOfPayment01: "CC",
          locationQualifier02: "OR",
          description03: "VARIOUS                     ZZ",
        },
      ],
      grossValue: "2887.8",
      height: "24",
      internalVendorNumber: "546382721",
      invoiceDate: "02/27/2023",
      length: "23",
      loadDestination: "6909",
      mustArriveByDate: "03/16/2023",
      nmfc: "101740-1",
      numberOfCartons: "14",
      partyIdentificationN1Loop: [
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "BY",
            name02: "WAL-MART DC 7038A-ASM DIS",
            identificationCodeQualifier03: "UL",
            identificationCode04: "0078742048079",
          },
          partyLocationN3: [
            {
              addressInformation01: "4009 SOUTH JENKINS RD",
            },
          ],
          geographicLocationN4: [
            {
              cityName01: "FT PIERCE",
              stateOrProvinceCode02: "FL",
              postalCode03: "34981",
              countryCode04: "US",
            },
          ],
        },
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "SU",
            name02: "GREEN PROJECT, INC.",
          },
          partyLocationN3: [],
          geographicLocationN4: [],
        },
      ],
      purchaseOrderDate: "02/20/2023",
      purchaseOrderEventCode: "POS REPLEN",
      purchaseOrderType: "0033",
      referenceInformationREF: [
        {
          referenceIdentificationQualifier01: "DP",
          referenceIdentification02: "00072",
        },
        {
          referenceIdentificationQualifier01: "MR",
          referenceIdentification02: "0033",
        },
        {
          referenceIdentificationQualifier01: "PD",
          referenceIdentification02: "POS REPLEN",
        },
        {
          referenceIdentificationQualifier01: "IA",
          referenceIdentification02: "546382721",
        },
      ],
      saleOrderNumber: "132282",
      servicePromotionAllowanceOrChargeInformationSACLoop: [
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "I410",
            amount05: 60.36,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 2.09,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "F910",
            amount05: 28.88,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 1,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
      ],
      shipDateScheduled: "02/27/2023",
      shipNoLater: "02/23/2023",
      shipNotBefore: "02/23/2023",
      termsOfSaleDeferredTermsOfSaleITD: [
        {
          termsTypeCode01: "08",
          termsBasisDateCode02: "15",
          termsDiscountPercent03: 1,
          termsDiscountDaysDue05: 50,
          termsNetDays07: 90,
        },
      ],
      transactionSetHeaderST: {
        transactionSetIdentifierCode01: "850",
        transactionSetControlNumber02: 109368,
      },
      transactionSetTrailerSE: {
        numberOfIncludedSegments01: 45,
        transactionSetControlNumber02: 109368,
      },
      transactionTotalsCTTLoop: [
        {
          transactionTotalsCTT: {
            numberOfLineItems01: 7,
          },
          monetaryAmountInformationAMT: {
            amountQualifierCode01: "GV",
            monetaryAmount02: 2887.8,
          },
        },
      ],
      width: "23",
    },
    {
      purchaseOrderNumber: "2522478446",
      actualWeight: "53",
      archived: "No",
      baselineItemDataPO1Loop: [
        {
          baselineItemDataPO1: {
            assignedIdentification01: "001",
            quantity02: 144,
            unitOrBasisForMeasurementCode03: "EA",
            unitPrice04: 29.11,
            basisOfUnitPriceCode05: "LE",
            productServiceIdQualifier06: "IN",
            productServiceId07: "575990285",
            productServiceIdQualifier08: "UP",
            productServiceId09: "681131307857",
            productServiceIdQualifier10: "VN",
            productServiceId11: "100008623",
            productServiceIdQualifier14: "IZ",
            productServiceId15: "1.0EA",
            productServiceIdQualifier22: "UK",
            productServiceId23: "00681131307857",
          },
          itemPhysicalDetailsPO4: [
            {
              pack01: 6,
              innerPack14: 2,
            },
          ],
          monetaryAmountInformationAMTLoop: [
            {
              monetaryAmountInformationAMT: {
                amountQualifierCode01: "1",
                monetaryAmount02: 4191.84,
              },
            },
          ],
        },
      ],
      beginningSegmentForPurchaseOrderBEG: {
        transactionSetPurposeCode01: "00",
        purchaseOrderTypeCode02: "SA",
        purchaseOrderNumber03: "2522478446",
        date05: "2023-02-20",
      },
      billOfLading: "08199520201322361",
      buyingParty: "WAL-MART DC 6070R-REGULAR",
      buyingPartyCity: "SHELBY",
      buyingPartyCountry: "US",
      buyingPartyGLN: "0078742039947",
      buyingPartyPostalCode: "28150",
      buyingPartyStateOrProvince: "NC",
      buyingPartyStreet: "230 WAL-MART DRIVE",
      carrierDetailsRoutingSequenceTransitTimeTD5: [
        {
          routingSequenceCode01: "O",
          routing05: "CALL4792734300#",
        },
      ],
      carrierName: "WAL-MART TRANSPORTATION LLC",
      carrierReference: "66503618",
      carrierSCAC: "WALM",
      carrierClass: "100",
      currencyCUR: {
        entityIdentifierCode01: "BY",
        currencyCode02: "USD",
      },
      dateTimeReferenceDTM: [
        {
          dateTimeQualifier01: "038",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "037",
          date02: "2023-02-23",
        },
        {
          dateTimeQualifier01: "063",
          date02: "2023-03-09",
        },
      ],
      departmentNumber: "00072",
      distributionCenterNumber: "6070",
      doNotDeliverAfter: "03/09/2023",
      extendedReferenceInformationN9Loop: [
        {
          extendedReferenceInformationN9: {
            referenceIdentificationQualifier01: "L1",
            referenceIdentification02: "SPECIAL INSTRUCTIONS",
          },
          textMTX: [
            {
              textualData02: "NO PRETICKET",
            },
          ],
        },
      ],
      floorOrPallet: "F",
      fobMethodOfPayment: "CC",
      fobPaymentLocation: "OR",
      fobRelatedInstructionsFOB: [
        {
          shipmentMethodOfPayment01: "CC",
          locationQualifier02: "OR",
          description03: "VARIOUS                     ZZ",
        },
      ],
      grossValue: "4191.84",
      height: "24",
      internalVendorNumber: "546382721",
      invoiceDate: "02/23/2023",
      length: "16",
      loadDestination: "6909",
      mustArriveByDate: "03/09/2023",
      nmfc: "101740-2",
      numberOfCartons: "12",
      partyIdentificationN1Loop: [
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "BY",
            name02: "WAL-MART DC 6070R-REGULAR",
            identificationCodeQualifier03: "UL",
            identificationCode04: "0078742039947",
          },
          partyLocationN3: [
            {
              addressInformation01: "230 WAL-MART DRIVE",
            },
          ],
          geographicLocationN4: [
            {
              cityName01: "SHELBY",
              stateOrProvinceCode02: "NC",
              postalCode03: "28150",
              countryCode04: "US",
            },
          ],
        },
        {
          partyIdentificationN1: {
            entityIdentifierCode01: "SU",
            name02: "GREEN PROJECT, INC.",
          },
          partyLocationN3: [],
          geographicLocationN4: [],
        },
      ],
      purchaseOrderDate: "02/20/2023",
      purchaseOrderEventCode: "POS REPLEN",
      purchaseOrderType: "0020",
      referenceInformationREF: [
        {
          referenceIdentificationQualifier01: "DP",
          referenceIdentification02: "00072",
        },
        {
          referenceIdentificationQualifier01: "MR",
          referenceIdentification02: "0020",
        },
        {
          referenceIdentificationQualifier01: "PD",
          referenceIdentification02: "POS REPLEN",
        },
        {
          referenceIdentificationQualifier01: "IA",
          referenceIdentification02: "546382721",
        },
      ],
      saleOrderNumber: "132236",
      servicePromotionAllowanceOrChargeInformationSACLoop: [
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "I410",
            amount05: 87.61,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 2.09,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
        {
          servicePromotionAllowanceOrChargeInformationSAC: {
            allowanceOrChargeIndicator01: "A",
            servicePromotionAllowanceOrChargeCode02: "I570",
            amount05: 41.92,
            allowanceChargePercentQualifier06: "6",
            percentDecimalFormat07: 1,
            allowanceOrChargeMethodOfHandlingCode12: "02",
          },
        },
      ],
      shipDateScheduled: "02/23/2023",
      shipNoLater: "02/23/2023",
      shipNotBefore: "02/23/2023",
      termsOfSaleDeferredTermsOfSaleITD: [
        {
          termsTypeCode01: "08",
          termsBasisDateCode02: "15",
          termsDiscountPercent03: 1,
          termsDiscountDaysDue05: 50,
          termsNetDays07: 90,
        },
      ],
      transactionSetHeaderST: {
        transactionSetIdentifierCode01: "850",
        transactionSetControlNumber02: 109333,
      },
      transactionSetTrailerSE: {
        numberOfIncludedSegments01: 27,
        transactionSetControlNumber02: 109333,
      },
      transactionTotalsCTTLoop: [
        {
          transactionTotalsCTT: {
            numberOfLineItems01: 1,
          },
          monetaryAmountInformationAMT: {
            amountQualifierCode01: "GV",
            monetaryAmount02: 4191.84,
          },
        },
      ],
      width: "24",
    },
  ] as WalmartOrder[];

  return (
    <div className="flex flex-col w-full space-y-4 bg-base-300 rounded p-4">
      <ActionBar
        filterList={filterList}
        selection={selection}
        tableOptions={tableOptions}
        handleTableOptions={handleTableOptions}
        handlePackingListFrame={handlePackingListFrame}
        handleUnderlyingBOLFrame={handleUnderlyingBOLFrame}
        handleMasterBOLFrame={handleMasterBOLFrame}
      />
      <DataTable table={table} enableFilter height="h-[calc(100vh-216px)]" />
      {/* <PDFModal pdf={"packingList"} selection={selection} frame={packingListFrame} handleFrame={handlePackingListFrame} /> */}
      <PDFModal pdf={"underlyingBOL"} selection={selection} frame={underlyingBOLFrame} handleFrame={handleUnderlyingBOLFrame} />
      {/* <PDFModal pdf={"masterBOL"} selection={selection} frame={masterBOLFrame} handleFrame={handleMasterBOLFrame} /> */}
    </div>
  );
};

export default WalmartUS;
