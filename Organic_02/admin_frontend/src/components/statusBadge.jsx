import React from 'react';

export const getStatusBadge = (status) => {
  const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full';

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
