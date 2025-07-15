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

  if (authLoading || loading) return <div>Loading...</div>;
  if (!token) return <div className="text-center py-16">Please log in to view your orders.</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-muted-foreground">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-card rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <span className="font-semibold">Order #</span> {order._id}
                </div>
                <div className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <ul className="mb-2">
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    {item.quantity} × {item.product?.name || 'Product'}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">Total: ${order.totalPrice.toFixed(2)}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 