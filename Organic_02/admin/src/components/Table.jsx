import React from 'react';

const getStatusBadge = (status) => {
  const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full";
  
  switch (status.toLowerCase()) {
    case 'completed':
      return <span className={`${baseClasses} bg-green-100 text-green-700`}>Completed</span>;
    case 'pending':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Pending</span>;
    case 'cancelled':
      return <span className={`${baseClasses} bg-red-100 text-red-700`}>Cancelled</span>;
    case 'processing':
      return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Processing</span>;
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>;
  }
};

const Table = ({ columns, data, keyExtractor }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={keyExtractor(row)} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500 text-sm">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Table, getStatusBadge };
