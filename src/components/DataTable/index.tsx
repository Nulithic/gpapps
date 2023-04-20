import { useState, useEffect, useMemo, Fragment } from "react";
import { Table, Column, Row, flexRender } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import AutoComplete from "@/components/AutoComplete";

interface FilterType {
  column: Column<any, unknown>;
}
interface TableProps {
  table: Table<unknown>;
  height?: string;
  enableFilter?: boolean;
  rowColors?: (row: Row<any>) => string;
}

const Filter = ({ column }: FilterType) => {
  // const columnFilterValue = column.getFilterValue();
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = useMemo(() => Array.from(facetedUniqueValues.keys()).sort(), [facetedUniqueValues]).filter((x) => x !== "" && x !== null);
  const options = sortedUniqueValues.map((item: any) => ({ value: item, label: item }));

  const [value, setValue] = useState<any>();

  const handleAutoComplete = (value: any) => {
    setValue(value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value) {
        column.setFilterValue(value.value);
      } else column.setFilterValue(null);
    }, 100);

    return () => clearTimeout(timeout);
  }, [column, value]);

  return <AutoComplete options={options} value={value} onChange={handleAutoComplete} placeholder="Filter" />;
};

const DataTable = ({ table, height, rowColors, enableFilter = false }: TableProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className={`flex bg-base-100 rounded ${height} overflow-auto`}>
        <table className="table table-compact min-w-full h-fit">
          <thead className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div className="flex flex-col min-w-[8rem]">
                      <div className="flex flex-row items-center space-x-2 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                        <span className="text-base">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {{
                          asc: <ChevronUpIcon className="h-4 w-4" />,
                          desc: <ChevronDownIcon className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() && enableFilter ? <Filter column={header.column} /> : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const rowColor = rowColors?.(row) ?? "";
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Fragment key={cell.id}>
                        {cell.column.id === "select" ? (
                          <td key={cell.id} className={rowColor} onClick={() => row.toggleSelected()}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ) : (
                          <td key={cell.id} className={rowColor}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )}
                      </Fragment>
                    );
                  })}
                </tr>
              );
            })}
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
