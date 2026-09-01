import React, { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter 
} from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T | ((item: T) => string);
  filterOptions?: {
    label: string;
    key: keyof T;
    values: string[];
  }[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
  exportFileName?: string;
  emptyMessage?: string;
  hideSearch?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchKey,
  filterOptions,
  pageSize = 8,
  onRowClick,
  actions,
  exportFileName = "export_data",
  emptyMessage = "No records found matching your filters.",
  hideSearch = false,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Search & Filtering
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search matching
      if (searchTerm) {
        if (typeof searchKey === "function") {
          const val = searchKey(item);
          if (!val.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        } else if (searchKey && item[searchKey]) {
          const val = String(item[searchKey]);
          if (!val.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        } else {
          // Fallback search across all string fields
          const match = Object.values(item).some(
            (v) => typeof v === "string" && v.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (!match) return false;
        }
      }

      // Filter matching
      for (const [key, filterVal] of Object.entries(activeFilters)) {
        if (filterVal && filterVal !== "ALL") {
          if (String(item[key]) !== filterVal) return false;
        }
      }

      return true;
    });
  }, [data, searchTerm, searchKey, activeFilters]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      return sortDirection === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortKey(null);
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const exportCSV = () => {
    if (sortedData.length === 0) return;
    const headers = columns.map((col) => `"${col.header}"`).join(",");
    const rows = sortedData.map((item) =>
      columns
        .map((col) => {
          let val = col.accessorKey ? item[col.accessorKey] : "";
          if (val === undefined || val === null) val = "";
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${exportFileName}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search, Filters, Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search box */}
          {!hideSearch && (
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3.5 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              />
            </div>
          )}

          {/* Filter Dropdowns */}
          {filterOptions?.map((filter) => (
            <div key={String(filter.key)} className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500 hidden md:inline">{filter.label}:</span>
              <select
                value={activeFilters[String(filter.key)] || "ALL"}
                onChange={(e) => {
                  setActiveFilters((prev) => ({
                    ...prev,
                    [String(filter.key)]: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="text-xs py-1.5 pl-2.5 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="ALL">All {filter.label}</option>
                {filter.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Custom Actions + Export Button */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {actions}
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    onClick={() => col.sortable && handleSort(col.accessorKey)}
                    className={cn(
                      "py-3 px-4 select-none",
                      col.sortable ? "cursor-pointer hover:bg-slate-100/80 transition-colors" : "",
                      col.className
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {sortKey === col.accessorKey ? (
                            sortDirection === "asc" ? (
                              <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">{emptyMessage}</p>
                    <p className="text-xs text-slate-400 mt-1">Try refining your search terms or resetting active filters.</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, rowIdx) => (
                  <tr
                    key={item.id || rowIdx}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={cn(
                      "transition-colors",
                      onRowClick ? "cursor-pointer hover:bg-blue-50/40" : "hover:bg-slate-50/60"
                    )}
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={cn("py-3.5 px-4 text-slate-700 align-middle", col.className)}>
                        {col.cell ? col.cell(item) : col.accessorKey ? item[col.accessorKey] : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Item Counter + Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 py-3 bg-slate-50/50 border-t border-slate-200/80 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            Showing <span className="font-semibold text-slate-800">{sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{" "}
            <span className="font-semibold text-slate-800">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{" "}
            <span className="font-semibold text-slate-800">{sortedData.length}</span> entries
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
