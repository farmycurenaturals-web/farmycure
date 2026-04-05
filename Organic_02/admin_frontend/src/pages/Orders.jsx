import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table';
import { getStatusBadge } from '../components/statusBadge';
import { api } from '../services/api';
import { AlertCircle } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders();
      setOrders(Array.isArray(data) ? data : (data.orders || []));
      setError('');
    } catch (err) {
      setError('Failed to fetch orders. Check backend connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrder(orderId, { status: newStatus });
      setSuccess(`Order #${(orderId).substring(0,8)} status updated to ${newStatus}`);
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update order status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const columns = [
    { 
      title: 'Order ID', 
      dataIndex: '_id',
      render: (row) => <span className="font-medium text-gray-900">{(row._id || row.id)?.substring(0,8) || '#...'}</span>
    },
    { 
      title: 'Customer', 
      dataIndex: 'customer',
      render: (row) => (
         <span className="text-gray-900">{row.customer || (row.shippingAddress?.fullName || 'Unknown Customer')}</span>
      )
    },
    { 
      title: 'Date', 
      dataIndex: 'createdAt',
      render: (row) => {
        const dateStr = row.createdAt || row.date;
        return <span className="text-gray-500">{dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A'}</span>;
      }
    },
    { 
      title: 'Total', 
      dataIndex: 'totalPrice',
      render: (row) => <span className="font-medium text-gray-900">${row.totalPrice || row.total || '0.00'}</span> 
    },
    { 
      title: 'Status Action', 
      dataIndex: 'status',
      render: (row) => (
        <div className="flex items-center gap-3">
          {getStatusBadge(row.status || 'Pending')}
          
          <select 
            value={row.status?.toLowerCase() || 'pending'}
            onChange={(e) => handleStatusChange(row._id || row.id, e.target.value)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-gray-50 text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 text-sm border border-green-100">
          <AlertCircle size={16} /> {success}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Manage customer orders and fulfillments.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Table 
          columns={columns} 
          data={orders} 
          keyExtractor={(row) => row._id || row.id || Math.random().toString()} 
        />
      )}
    </div>
  );
};

export default Orders;
