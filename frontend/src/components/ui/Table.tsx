import React, { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No records found.',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center text-[#667085] text-sm animate-pulse">
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-8 text-center text-[#667085] text-sm bg-white rounded-card border border-[#E5E1DC]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-card border border-[#E5E1DC] bg-white shadow-subtle">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#FAF9F6] border-b border-[#E5E1DC]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#667085] ${
                  col.className || ''
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E1DC]/60 text-sm text-[#202124]">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-[#FAF9F6]/60 transition-colors">
              {columns.map((col, idx) => (
                <td key={idx} className={`py-3.5 px-4 ${col.className || ''}`}>
                  {col.render
                    ? col.render(item)
                    : col.accessor
                    ? (item[col.accessor] as ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
