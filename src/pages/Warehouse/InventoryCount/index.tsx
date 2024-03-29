import { useState, useEffect, useMemo } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
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
} from "@tanstack/react-table";

import DataTable from "@/components/DataTable";
import IndeterminateCheckbox from "@/components/CheckBox";
import "./InventoryCount.css";

interface CountList {
  _id: string;
  name: string;
  date: string;
  info: string;
}
interface CountData {
  _id: string;
  sku: string;
  bin: string;
  cartonSize: number;
  cartonQty: number;
  loose: number;
  totalQty: number;
  po: string;
  comment: string;
  date: string;
}

const convertToString = (data: any) => {
  if (data != null)
    Object.keys(data).forEach((k) => {
      if (typeof data[k] === "object") {
        return convertToString(data[k]);
      }
      data[k] = "" + data[k];
    });
  return data;
};

const countListData = [
  {
    _id: "638f85eb477ea60256e03136",
    name: "Test",
    date: "12/6/2022 10:11:55 AM",
    info: "Test",
  },
  {
    _id: "638f8762477ea60256e03232",
    name: "asdf",
    date: "12/6/2022 10:18:10 AM",
    info: "asdf",
  },
  {
    _id: "638f8860477ea60256e033aa",
    name: "dghvbm",
    date: "12/6/2022 10:22:24 AM",
    info: "dfgh",
  },
];
const tempCountData = [
  {
    sku: "B-LC103BK",
    upc: "",
    bin: "J18-3",
    cartonSize: 5,
    cartonQty: 0,
    loose: 320,
    totalQty: 320,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103BK",
    upc: "",
    bin: "J25-2",
    cartonSize: 10,
    cartonQty: 1,
    loose: 2484,
    totalQty: 2484,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103BK",
    upc: "",
    bin: "M19-2-A",
    cartonSize: 15,
    cartonQty: 0,
    loose: 438,
    totalQty: 438,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103C",
    upc: "",
    bin: "J25-2",
    cartonSize: 20,
    cartonQty: 0,
    loose: 324,
    totalQty: 324,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103C",
    upc: "",
    bin: "J26-3",
    cartonSize: 25,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103C",
    upc: "",
    bin: "M19-2-B",
    cartonSize: 30,
    cartonQty: 0,
    loose: 498,
    totalQty: 498,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103M",
    upc: "",
    bin: "J25-2",
    cartonSize: 35,
    cartonQty: 0,
    loose: 324,
    totalQty: 324,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103M",
    upc: "",
    bin: "J26-3",
    cartonSize: 40,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103M",
    upc: "",
    bin: "M19-2-C",
    cartonSize: 45,
    cartonQty: 0,
    loose: 478,
    totalQty: 478,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103Y",
    upc: "",
    bin: "J25-2",
    cartonSize: 50,
    cartonQty: 0,
    loose: 324,
    totalQty: 324,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103Y",
    upc: "",
    bin: "J26-3",
    cartonSize: 55,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC103Y",
    upc: "",
    bin: "M19-2-D",
    cartonSize: 60,
    cartonQty: 0,
    loose: 482,
    totalQty: 482,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC105C",
    upc: "",
    bin: "M20-1-B",
    cartonSize: 65,
    cartonQty: 0,
    loose: 381,
    totalQty: 381,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC105M",
    upc: "",
    bin: "M20-1-C",
    cartonSize: 70,
    cartonQty: 1,
    loose: 278,
    totalQty: 278,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC105Y",
    upc: "",
    bin: "M20-1-D",
    cartonSize: 75,
    cartonQty: 0,
    loose: 403,
    totalQty: 403,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC107BK",
    upc: "",
    bin: "M20-1-A",
    cartonSize: 80,
    cartonQty: 0,
    loose: 424,
    totalQty: 424,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EBK",
    upc: "",
    bin: "E07-2",
    cartonSize: 85,
    cartonQty: 0,
    loose: 54,
    totalQty: 54,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EBK",
    upc: "",
    bin: "F17-2",
    cartonSize: 90,
    cartonQty: 0,
    loose: 378,
    totalQty: 378,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EBK",
    upc: "",
    bin: "M21-3-A",
    cartonSize: 95,
    cartonQty: 2,
    loose: 97,
    totalQty: 97,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EC",
    upc: "",
    bin: "M21-3-B",
    cartonSize: 100,
    cartonQty: 0,
    loose: 525,
    totalQty: 525,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EM",
    upc: "",
    bin: "M21-3-C",
    cartonSize: 105,
    cartonQty: 0,
    loose: 512,
    totalQty: 512,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC10EY",
    upc: "",
    bin: "M21-3-D",
    cartonSize: 110,
    cartonQty: 0,
    loose: 664,
    totalQty: 664,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203BK",
    upc: "",
    bin: "J18-2",
    cartonSize: 115,
    cartonQty: 0,
    loose: 972,
    totalQty: 972,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203BK",
    upc: "",
    bin: "J18-3",
    cartonSize: 120,
    cartonQty: 0,
    loose: 1188,
    totalQty: 1188,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203BK",
    upc: "",
    bin: "J25-2",
    cartonSize: 125,
    cartonQty: 0,
    loose: 108,
    totalQty: 108,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203BK",
    upc: "",
    bin: "M20-2-A",
    cartonSize: 130,
    cartonQty: 0,
    loose: 139,
    totalQty: 139,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203C",
    upc: "",
    bin: "J18-3",
    cartonSize: 135,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203C",
    upc: "",
    bin: "J21-3",
    cartonSize: 140,
    cartonQty: 0,
    loose: 162,
    totalQty: 162,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203C",
    upc: "",
    bin: "M20-2-B",
    cartonSize: 145,
    cartonQty: 0,
    loose: 719,
    totalQty: 719,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203M",
    upc: "",
    bin: "J21-3",
    cartonSize: 150,
    cartonQty: 0,
    loose: 648,
    totalQty: 648,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203M",
    upc: "",
    bin: "M20-2-C",
    cartonSize: 155,
    cartonQty: 0,
    loose: 648,
    totalQty: 648,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203Y",
    upc: "",
    bin: "J21-3",
    cartonSize: 160,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC203Y",
    upc: "",
    bin: "M20-2-D",
    cartonSize: 165,
    cartonQty: 0,
    loose: 537,
    totalQty: 537,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC205XXLC",
    upc: "",
    bin: "M21-1-C",
    cartonSize: 170,
    cartonQty: 0,
    loose: 427,
    totalQty: 427,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC205XXLM",
    upc: "",
    bin: "M21-1-D",
    cartonSize: 175,
    cartonQty: 0,
    loose: 441,
    totalQty: 441,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC205XXLY",
    upc: "",
    bin: "M22-1-A",
    cartonSize: 180,
    cartonQty: 0,
    loose: 442,
    totalQty: 442,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC207XXLBK",
    upc: "",
    bin: "M21-1-B",
    cartonSize: 185,
    cartonQty: 0,
    loose: 438,
    totalQty: 438,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC209XXLBK",
    upc: "",
    bin: "M21-1-B",
    cartonSize: 190,
    cartonQty: 0,
    loose: 246,
    totalQty: 246,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EBK",
    upc: "",
    bin: "D06-2",
    cartonSize: 195,
    cartonQty: 0,
    loose: 486,
    totalQty: 486,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EBK",
    upc: "",
    bin: "D07-2",
    cartonSize: 200,
    cartonQty: 0,
    loose: 550,
    totalQty: 550,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EBK",
    upc: "",
    bin: "D13-2",
    cartonSize: 205,
    cartonQty: 0,
    loose: 540,
    totalQty: 540,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EBK",
    upc: "",
    bin: "G14-3",
    cartonSize: 210,
    cartonQty: 0,
    loose: 1026,
    totalQty: 1026,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EBK",
    upc: "",
    bin: "M25-1-A",
    cartonSize: 215,
    cartonQty: 0,
    loose: 127,
    totalQty: 127,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EC",
    upc: "",
    bin: "D07-2",
    cartonSize: 220,
    cartonQty: 0,
    loose: 1134,
    totalQty: 1134,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EC",
    upc: "",
    bin: "M25-1-B",
    cartonSize: 225,
    cartonQty: 0,
    loose: 717,
    totalQty: 717,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EM",
    upc: "",
    bin: "D17-2",
    cartonSize: 230,
    cartonQty: 0,
    loose: 648,
    totalQty: 648,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EM",
    upc: "",
    bin: "M25-1-C",
    cartonSize: 235,
    cartonQty: 0,
    loose: 429,
    totalQty: 429,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC20EY",
    upc: "",
    bin: "M25-1-D",
    cartonSize: 240,
    cartonQty: 0,
    loose: 854,
    totalQty: 854,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013BK",
    upc: "",
    bin: "J21-3",
    cartonSize: 245,
    cartonQty: 0,
    loose: 768,
    totalQty: 768,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013BK",
    upc: "",
    bin: "J26-3",
    cartonSize: 250,
    cartonQty: 0,
    loose: 2014,
    totalQty: 2014,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013BK",
    upc: "",
    bin: "M18-1-A",
    cartonSize: 255,
    cartonQty: 0,
    loose: 268,
    totalQty: 268,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013C",
    upc: "",
    bin: "J26-3",
    cartonSize: 260,
    cartonQty: 0,
    loose: 988,
    totalQty: 988,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013C",
    upc: "",
    bin: "M18-1-B",
    cartonSize: 265,
    cartonQty: 0,
    loose: 401,
    totalQty: 401,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013M",
    upc: "",
    bin: "J26-3",
    cartonSize: 270,
    cartonQty: 0,
    loose: 988,
    totalQty: 988,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013M",
    upc: "",
    bin: "M18-1-C",
    cartonSize: 275,
    cartonQty: 0,
    loose: 374,
    totalQty: 374,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013Y",
    upc: "",
    bin: "J22-3",
    cartonSize: 280,
    cartonQty: 0,
    loose: 328,
    totalQty: 328,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013Y",
    upc: "",
    bin: "J26-3",
    cartonSize: 285,
    cartonQty: 0,
    loose: 990,
    totalQty: 990,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3013Y",
    upc: "",
    bin: "M18-1-D",
    cartonSize: 290,
    cartonQty: 0,
    loose: 132,
    totalQty: 132,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3019XXLBK",
    upc: "",
    bin: "J22-3",
    cartonSize: 295,
    cartonQty: 0,
    loose: 156,
    totalQty: 156,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3019XXLBK",
    upc: "",
    bin: "M18-2-A",
    cartonSize: 300,
    cartonQty: 0,
    loose: 58,
    totalQty: 58,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3019XXLC",
    upc: "",
    bin: "M18-2-B",
    cartonSize: 305,
    cartonQty: 0,
    loose: 212,
    totalQty: 212,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3019XXLM",
    upc: "",
    bin: "M18-2-C",
    cartonSize: 310,
    cartonQty: 0,
    loose: 196,
    totalQty: 196,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3019XXLY",
    upc: "",
    bin: "M18-2-D",
    cartonSize: 315,
    cartonQty: 0,
    loose: 308,
    totalQty: 308,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3029XXLBK",
    upc: "",
    bin: "M23-2-A",
    cartonSize: 320,
    cartonQty: 0,
    loose: 316,
    totalQty: 316,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3029XXLC",
    upc: "",
    bin: "M23-2-B",
    cartonSize: 325,
    cartonQty: 0,
    loose: 381,
    totalQty: 381,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3029XXLM",
    upc: "",
    bin: "M23-2-C",
    cartonSize: 330,
    cartonQty: 0,
    loose: 392,
    totalQty: 392,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3029XXLY",
    upc: "",
    bin: "M23-2-D",
    cartonSize: 335,
    cartonQty: 0,
    loose: 378,
    totalQty: 378,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3033BK",
    upc: "",
    bin: "J22-3",
    cartonSize: 340,
    cartonQty: 0,
    loose: 114,
    totalQty: 114,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3033BK",
    upc: "",
    bin: "M28-1-A",
    cartonSize: 345,
    cartonQty: 0,
    loose: 60,
    totalQty: 60,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3033C",
    upc: "",
    bin: "M28-1-B",
    cartonSize: 350,
    cartonQty: 0,
    loose: 232,
    totalQty: 232,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3033M",
    upc: "",
    bin: "M28-1-C",
    cartonSize: 355,
    cartonQty: 0,
    loose: 209,
    totalQty: 209,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3033Y",
    upc: "",
    bin: "M28-1-D",
    cartonSize: 360,
    cartonQty: 0,
    loose: 151,
    totalQty: 151,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3035BK",
    upc: "",
    bin: "M30-1-A",
    cartonSize: 365,
    cartonQty: 0,
    loose: 102,
    totalQty: 102,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3035C",
    upc: "",
    bin: "M30-1-B",
    cartonSize: 370,
    cartonQty: 0,
    loose: 140,
    totalQty: 140,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3035M",
    upc: "",
    bin: "M30-1-C",
    cartonSize: 375,
    cartonQty: 0,
    loose: 139,
    totalQty: 139,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3035Y",
    upc: "",
    bin: "M30-1-D",
    cartonSize: 380,
    cartonQty: 0,
    loose: 138,
    totalQty: 138,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037BK",
    upc: "",
    bin: "J25-2",
    cartonSize: 385,
    cartonQty: 0,
    loose: 114,
    totalQty: 114,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037BK",
    upc: "",
    bin: "M31-1-A",
    cartonSize: 390,
    cartonQty: 0,
    loose: 161,
    totalQty: 161,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037C",
    upc: "",
    bin: "J25-2",
    cartonSize: 395,
    cartonQty: 0,
    loose: 120,
    totalQty: 120,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037C",
    upc: "",
    bin: "M31-1-B",
    cartonSize: 400,
    cartonQty: 0,
    loose: 222,
    totalQty: 222,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037M",
    upc: "",
    bin: "J25-2",
    cartonSize: 405,
    cartonQty: 0,
    loose: 120,
    totalQty: 120,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037M",
    upc: "",
    bin: "M31-1-C",
    cartonSize: 410,
    cartonQty: 0,
    loose: 217,
    totalQty: 217,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037Y",
    upc: "",
    bin: "J25-2",
    cartonSize: 415,
    cartonQty: 0,
    loose: 120,
    totalQty: 120,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3037Y",
    upc: "",
    bin: "M31-1-D",
    cartonSize: 420,
    cartonQty: 0,
    loose: 163,
    totalQty: 163,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLBK",
    upc: "",
    bin: "J23-3",
    cartonSize: 425,
    cartonQty: 0,
    loose: 76,
    totalQty: 76,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLBK",
    upc: "",
    bin: "J25-2",
    cartonSize: 430,
    cartonQty: 0,
    loose: 38,
    totalQty: 38,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLBK",
    upc: "",
    bin: "J26-3",
    cartonSize: 435,
    cartonQty: 0,
    loose: 190,
    totalQty: 190,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLBK",
    upc: "",
    bin: "M19-1-A",
    cartonSize: 440,
    cartonQty: 0,
    loose: 76,
    totalQty: 76,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLC",
    upc: "",
    bin: "M19-1-B",
    cartonSize: 445,
    cartonQty: 0,
    loose: 193,
    totalQty: 193,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLM",
    upc: "",
    bin: "M19-1-C",
    cartonSize: 450,
    cartonQty: 0,
    loose: 186,
    totalQty: 186,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC3039XLY",
    upc: "",
    bin: "M19-1-D",
    cartonSize: 455,
    cartonQty: 0,
    loose: 185,
    totalQty: 185,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41BK",
    upc: "",
    bin: "G22-2",
    cartonSize: 460,
    cartonQty: 0,
    loose: 100,
    totalQty: 100,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41BK",
    upc: "",
    bin: "M19-3-A",
    cartonSize: 465,
    cartonQty: 0,
    loose: 184,
    totalQty: 184,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41C",
    upc: "",
    bin: "G22-2",
    cartonSize: 470,
    cartonQty: 0,
    loose: 100,
    totalQty: 100,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41C",
    upc: "",
    bin: "M19-3-B",
    cartonSize: 475,
    cartonQty: 0,
    loose: 304,
    totalQty: 304,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41M",
    upc: "",
    bin: "G22-2",
    cartonSize: 480,
    cartonQty: 0,
    loose: 100,
    totalQty: 100,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41M",
    upc: "",
    bin: "M19-3-C",
    cartonSize: 485,
    cartonQty: 0,
    loose: 320,
    totalQty: 320,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41Y",
    upc: "",
    bin: "G22-2",
    cartonSize: 490,
    cartonQty: 0,
    loose: 100,
    totalQty: 100,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC41Y",
    upc: "",
    bin: "M19-3-D",
    cartonSize: 495,
    cartonQty: 0,
    loose: 237,
    totalQty: 237,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51BK",
    upc: "",
    bin: "M22-3-A",
    cartonSize: 500,
    cartonQty: 0,
    loose: 136,
    totalQty: 136,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51C",
    upc: "",
    bin: "F16-2",
    cartonSize: 505,
    cartonQty: 0,
    loose: 440,
    totalQty: 440,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51C",
    upc: "",
    bin: "M22-3-B",
    cartonSize: 510,
    cartonQty: 0,
    loose: 101,
    totalQty: 101,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51M",
    upc: "",
    bin: "M22-3-C",
    cartonSize: 515,
    cartonQty: 0,
    loose: 364,
    totalQty: 364,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51MR",
    upc: "",
    bin: "G09-3",
    cartonSize: 520,
    cartonQty: 0,
    loose: 283,
    totalQty: 283,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51Y",
    upc: "",
    bin: "M22-3-D",
    cartonSize: 525,
    cartonQty: 0,
    loose: 320,
    totalQty: 320,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC51YR",
    upc: "",
    bin: "G09-3",
    cartonSize: 530,
    cartonQty: 0,
    loose: 108,
    totalQty: 108,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC61/65C",
    upc: "",
    bin: "F18-3",
    cartonSize: 535,
    cartonQty: 0,
    loose: 50,
    totalQty: 50,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC61/65C",
    upc: "",
    bin: "M22-2-B",
    cartonSize: 540,
    cartonQty: 0,
    loose: 2679,
    totalQty: 2679,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC61/65M",
    upc: "",
    bin: "E03-2",
    cartonSize: 545,
    cartonQty: 0,
    loose: 240,
    totalQty: 240,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC61/65M",
    upc: "",
    bin: "M22-2-C",
    cartonSize: 550,
    cartonQty: 0,
    loose: 141,
    totalQty: 141,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC61/65Y",
    upc: "",
    bin: "M22-2-D",
    cartonSize: 555,
    cartonQty: 0,
    loose: 405,
    totalQty: 405,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC65BK",
    upc: "",
    bin: "G12-2",
    cartonSize: 560,
    cartonQty: 0,
    loose: 320,
    totalQty: 320,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC65BK",
    upc: "",
    bin: "H01-2",
    cartonSize: 565,
    cartonQty: 0,
    loose: 240,
    totalQty: 240,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC65BK",
    upc: "",
    bin: "H02-3",
    cartonSize: 570,
    cartonQty: 0,
    loose: 240,
    totalQty: 240,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC65BK",
    upc: "",
    bin: "M23-3-A",
    cartonSize: 575,
    cartonQty: 0,
    loose: 292,
    totalQty: 292,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC75M",
    upc: "",
    bin: "M21-2-C",
    cartonSize: 580,
    cartonQty: 0,
    loose: 4,
    totalQty: 4,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC75Y",
    upc: "",
    bin: "M21-2-D",
    cartonSize: 585,
    cartonQty: 0,
    loose: 178,
    totalQty: 178,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79BK",
    upc: "",
    bin: "F11-3",
    cartonSize: 590,
    cartonQty: 0,
    loose: 432,
    totalQty: 432,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79BK",
    upc: "",
    bin: "M18-3-A",
    cartonSize: 595,
    cartonQty: 0,
    loose: 41,
    totalQty: 41,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79C",
    upc: "",
    bin: "F11-3",
    cartonSize: 600,
    cartonQty: 0,
    loose: 140,
    totalQty: 140,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79C",
    upc: "",
    bin: "M18-3-B",
    cartonSize: 605,
    cartonQty: 0,
    loose: 91,
    totalQty: 91,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79M",
    upc: "",
    bin: "M18-3-C",
    cartonSize: 610,
    cartonQty: 0,
    loose: 348,
    totalQty: 348,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79Y",
    upc: "",
    bin: "F08-3",
    cartonSize: 615,
    cartonQty: 0,
    loose: 240,
    totalQty: 240,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
  {
    sku: "B-LC79Y",
    upc: "",
    bin: "M18-3-D",
    cartonSize: 620,
    cartonQty: 0,
    loose: 92,
    totalQty: 92,
    po: "",
    comment: "",
    date: "12/6/2022 10:18:10 AM",
    _id: "638f85eb477ea60256e03136",
  },
];

const InventoryCount = () => {
  const [hideList, setHideList] = useState(false);

  const [listRowSelection, setListRowSelection] = useState<RowSelectionState>({});
  const [listColumnFilters, setListColumnFilters] = useState<ColumnFiltersState>([]);
  const [listSorting, setListSorting] = useState<SortingState>([]);
  const [listPagination, setListPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const [dataRowSelection, setDataRowSelection] = useState<RowSelectionState>({});
  const [dataColumnFilters, setDataColumnFilters] = useState<ColumnFiltersState>([]);
  const [dataSorting, setDataSorting] = useState<SortingState>([]);
  const [dataPagination, setDataPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const [countList, setCountList] = useState<CountList[]>([]);
  const [countData, setCountData] = useState<CountData[]>([]);

  const handleHideList = () => {
    setHideList((prev) => !prev);
  };

  const countListCol = useMemo<ColumnDef<unknown>[]>(
    () => [
      {
        id: "select",
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
      { accessorKey: "name", header: "Name", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "info", header: "Info", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "date", header: "Date", enableColumnFilter: true, filterFn: "equals" },
    ],
    []
  );
  const countListTable = useReactTable({
    data: countList,
    columns: countListCol,
    state: {
      sorting: listSorting,
      pagination: listPagination,
      rowSelection: listRowSelection,
      columnFilters: listColumnFilters,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setListRowSelection,
    onColumnFiltersChange: setListColumnFilters,
    onSortingChange: setListSorting,
    onPaginationChange: setListPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const countDataCol = useMemo<ColumnDef<unknown>[]>(
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
      { accessorKey: "sku", header: "SKU", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "upc", header: "UPC", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "bin", header: "Bin", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "cartonSize", header: "Carton Size", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "cartonQty", header: "Carton Qty", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "loose", header: "Loose", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "totalQty", header: "Total Qty", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "po", header: "PO", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "comment", header: "Comment", enableColumnFilter: true, filterFn: "equals" },
      { accessorKey: "date", header: "Date", enableColumnFilter: true, filterFn: "equals" },
    ],
    []
  );
  const countDataTable = useReactTable({
    data: countData,
    columns: countDataCol,
    state: {
      sorting: dataSorting,
      pagination: dataPagination,
      rowSelection: dataRowSelection,
      columnFilters: dataColumnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setDataRowSelection,
    onColumnFiltersChange: setDataColumnFilters,
    onSortingChange: setDataSorting,
    onPaginationChange: setDataPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    setCountList(countListData);
  }, []);

  const rows = countListTable.getSelectedRowModel().rows;
  useEffect(() => {
    if (rows.length > 0) {
      const select = countListTable.getSelectedRowModel().rows[0].original as CountData;
      if (select._id === "638f85eb477ea60256e03136") setCountData(tempCountData);
    } else setCountData([]);
  }, [rows]);

  return (
    <div className={`flex flex-col w-full ${hideList ? "space-y-0" : "space-y-4"}`}>
      <div className={`flex-auto bg-base-300 rounded overflow-y-auto transition-all ease-in-out duration-300 ${hideList ? "h-0 !m-0" : "h-[22rem]"}`}>
        <div className="flex-auto flex-row bg-base-300 rounded p-4 space-y-4">
          <div className="flex flex-row space-x-2">
            <button className="btn btn-mid" onClick={() => {}}>
              Import
            </button>
          </div>
          <DataTable table={countListTable} height={"max-h-[13.5rem]"} enableFilter />
        </div>
      </div>

      <div className="flex-auto flex-row bg-base-300 rounded p-4 space-y-4">
        <div className="flex flex-row space-x-2">
          <button className="btn btn-mid" onClick={handleHideList}>
            <ChevronUpIcon className={`${hideList ? "rotate-180 h-4 w-4" : "h-4 w-4"} transition-transform duration-300 mr-2`} />
            {hideList ? "Show List" : "Hide List"}
          </button>
          <button className="btn btn-mid" onClick={() => {}}>
            Export
          </button>
        </div>
        <DataTable table={countDataTable} enableFilter />
      </div>
    </div>
  );
};

export default InventoryCount;
