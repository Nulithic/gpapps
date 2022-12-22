import { useState, useEffect, useMemo, useRef } from "react";
import {
  Column,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  SortingState,
  PaginationState,
  ExpandedState,
} from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

import { ChevronUpIcon, ChevronDownIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import AutoComplete from "../AutoComplete";

interface TableProps {
  data: any;
  columns: any;
  sortList: SortingState;
  height: string;
  enableFilters?: boolean;
}

interface FilterType {
  column: Column<any, unknown>;
}

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const Filter = ({ column }: FilterType) => {
  const columnFilterValue = column.getFilterValue();
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = useMemo(() => Array.from(facetedUniqueValues.keys()).sort(), [facetedUniqueValues]).filter((x) => x !== "" && x !== null);
  const options = sortedUniqueValues.map((item: any) => ({ name: item, value: item }));

  const [value, setValue] = useState((columnFilterValue ?? "") as string);

  const handleAutoComplete = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    setValue((columnFilterValue ?? "") as string);
  }, [columnFilterValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      column.setFilterValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [column, value]);

  return <AutoComplete options={options} value={value} onChange={handleAutoComplete} placeholder="Filter" />;
};

const DataTable = ({ data, columns, sortList, height, enableFilters = true }: TableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>(sortList);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      pagination,
      expanded,
      columnFilters,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col space-y-4 ">
      <div className={`flex bg-base-100 rounded ${height} overflow-auto`}>
        <table className="table table-compact min-w-full h-fit">
          <thead className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div className="flex flex-col min-w-[8rem]">
                      <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                        <span>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {{
                          asc: <ChevronUpIcon className="h-4 w-4" />,
                          desc: <ChevronDownIcon className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() && enableFilters ? <Filter column={header.column} /> : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <button className="btn btn-mid" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronDoubleLeftIcon className="h-4 w-4" />
          </button>
          <button className="btn btn-mid" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button className="btn btn-mid" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button className="btn btn-mid" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </button>
          <div className="divider divider-horizontal"></div>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="divider divider-horizontal"></div>
          <span>{table.getPrePaginationRowModel().rows.length} Total Orders</span>
        </div>

        <div className="flex flex-row space-x-2 items-center">
          <span className="label-text whitespace-nowrap">Go to page:</span>
          <select
            className="select select-bordered select-mid w-20"
            value={table.getState().pagination.pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              table.setPageIndex(page);
            }}
          >
            {table.getPageCount() !== 0 ? (
              [...Array(table.getPageCount()).keys()].map((item, i) => (
                <option key={i} value={item}>
                  {item + 1}
                </option>
              ))
            ) : (
              <option value={0}></option>
            )}
          </select>
          <div className="divider divider-horizontal"></div>
          <span className="label-text whitespace-nowrap">Show:</span>
          <select
            className="select select-bordered select-mid w-20"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[50, 100, 200].map((pageSize, i) => (
              <option key={i} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
