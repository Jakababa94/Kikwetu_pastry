import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { token, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (authLoading || loading) return <div className="dark:text-white">Loading...</div>;
  if (!token) return <div className="text-center py-16 dark:text-white">Please log in to view your orders.</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-muted-foreground dark:text-gray-400">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-card dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <span className="font-semibold dark:text-white">Order #</span> <span className="dark:text-gray-300">{order._id}</span>
                </div>
                <div className="text-muted-foreground dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <ul className="mb-2">
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className="text-sm dark:text-gray-300">
                    {item.quantity} × {item.product?.name || 'Product'}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary dark:text-amber-400">Total: ${order.totalPrice.toFixed(2)}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 