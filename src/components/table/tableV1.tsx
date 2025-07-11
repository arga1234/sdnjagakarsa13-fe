/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Column {
  key: string;
  title: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
  sortable?: boolean; // Optional: Whether this column is sortable
}

interface ResponsiveTableProps {
  columns: Column[];
  data: Record<string, any>[];
  currentPage: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  sortState?: { key: string; direction: 'asc' | 'desc' };
}

interface TableFooterProps {
  currentPage: number;
  totalPage: number;
  limit: number;
  onLimitChange: (value: number) => void;
  onPageChange: (page: number) => void;
}

const Table: React.FC<{
  columns: Column[];
  data: Record<string, any>[];
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  sortState?: { key: string; direction: 'asc' | 'desc' };
}> = ({ columns, data, onSortChange, sortState }) => {
  const toggleSort = (key: string) => {
    if (!onSortChange) return;
    const direction = sortState?.key === key && sortState.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(key, direction);
  };

  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          minWidth: '800px',
          fontSize: '14px',
        }}
      >
        <thead style={{ backgroundColor: 'var(--background)' }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ ...thStyle, cursor: col.sortable ? 'pointer' : 'default' }}
                onClick={() => col.sortable && toggleSort(col.key)}
              >
                {col.title}
                {col.sortable && sortState?.key === col.key && (
                  <span style={{ marginLeft: '6px' }}>{sortState.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor:
                    idx % 2 === 0 ? 'var(--background)' : 'var(--background-secondary)',
                }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={tdStyle}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ ...tdStyle, textAlign: 'center', fontStyle: 'italic' }}
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPage,
  limit,
  onLimitChange,
  onPageChange,
}) => (
  <div style={footerStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>
        Halaman <strong>{currentPage}</strong> dari <strong>{totalPage}</strong>
      </span>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle}
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        style={buttonStyle}
      >
        &raquo;
      </button>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <label htmlFor="limitSelect">Tampilkan</label>
      <select
        id="limitSelect"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        style={selectStyle}
      >
        {[5, 10, 25, 50].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span>data</span>
    </div>
  </div>
);

export function ResponsiveTable({
  columns,
  data,
  currentPage,
  limit,
  total,
  onPageChange,
  onLimitChange,
  onSortChange,
  sortState,
}: ResponsiveTableProps) {
  const totalPage = Math.ceil(total / limit);

  return (
    <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
      <Table columns={columns} data={data} onSortChange={onSortChange} sortState={sortState} />
      <TableFooter
        currentPage={currentPage}
        totalPage={totalPage}
        limit={limit}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </div>
  );
}

const thStyle = {
  textAlign: 'left' as const,
  padding: '12px',
  borderBottom: '1px solid #ddd',
  whiteSpace: 'nowrap' as const,
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  whiteSpace: 'nowrap' as const,
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: '13px',
  cursor: 'pointer',
  borderRadius: '6px',
  border: '1px solid #ccc',
  backgroundColor: 'var(--background-secondary)',
  transition: 'all 0.2s ease-in-out',
};

const selectStyle: React.CSSProperties = {
  padding: '6px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '13px',
};

const footerStyle: React.CSSProperties = {
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: 'var(--background)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  flexWrap: 'wrap',
  gap: '12px',
};
