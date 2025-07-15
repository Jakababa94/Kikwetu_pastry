import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') {
    return <div className="text-center py-16 text-red-600 font-bold">Access denied. Admins only.</div>;
  }
  return children;
}

const AdminDashboard = () => {
  const [tab, setTab] = useState('products');
  return (
    <RequireAdmin>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-orange-700">Admin Dashboard</h1>
        <div className="flex gap-4 mb-8">
          <Button variant={tab === 'products' ? 'primary' : 'secondary'} onClick={() => setTab('products')}>Products</Button>
          <Button variant={tab === 'orders' ? 'primary' : 'secondary'} onClick={() => setTab('orders')}>Orders</Button>
        </div>
        {tab === 'products' ? <AdminProducts /> : <AdminOrders />}
      </div>
    </RequireAdmin>
  );
};

function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [token]);

  const handleSave = async (product) => {
    setModalLoading(true);
    setModalError('');
    try {
      const method = editProduct ? 'PUT' : 'POST';
      const url = editProduct ? `/api/products/${editProduct._id}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to save product');
      setShowModal(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setModalLoading(true);
    setModalError('');
    try {
      const res = await fetch(`/api/products/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-orange-200 rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-800">Products</h2>
        <Button variant="primary" onClick={() => { setEditProduct(null); setShowModal(true); }}>+ Add Product</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-orange-200 text-orange-700">
              <th className="py-2">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-orange-100 hover:bg-yellow-100">
                <td className="py-2">{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td className="flex gap-2">
                  <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => { setEditProduct(product); setShowModal(true); }}>Edit</Button>
                  <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => setDeleteId(product._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null); setModalError(''); }}
          onSave={handleSave}
          loading={modalLoading}
          error={modalError}
        />
      )}
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
          loading={modalLoading}
          error={modalError}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSave, loading, error }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    description: product?.description || '',
    image: product?.image || '',
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock) });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-orange-700">{product ? 'Edit Product' : 'Add Product'}</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full border border-orange-200 rounded px-3 py-2" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" required className="w-full border border-orange-200 rounded px-3 py-2" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" required className="w-full border border-orange-200 rounded px-3 py-2" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="w-full border border-orange-200 rounded px-3 py-2" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border border-orange-200 rounded px-3 py-2" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border border-orange-200 rounded px-3 py-2" />
          <div className="flex gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmModal({ message, onCancel, onConfirm, loading, error }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <div className="mb-4 text-orange-700 font-bold">{message}</div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex gap-2 justify-center">
          <Button onClick={onConfirm} variant="danger" disabled={loading}>{loading ? 'Deleting...' : 'Yes, Delete'}</Button>
          <Button onClick={onCancel} variant="secondary" disabled={loading}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusOrder, setStatusOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders', {
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

  useEffect(() => { fetchOrders(); }, [token]);

  const handleStatusUpdate = async (orderId, status) => {
    setModalLoading(true);
    setModalError('');
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setStatusOrder(null);
      fetchOrders();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setModalLoading(true);
    setModalError('');
    try {
      const res = await fetch(`/api/orders/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setDeleteId(null);
      fetchOrders();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-orange-200 rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-orange-800 mb-4">Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-orange-200 text-orange-700">
              <th className="py-2">Order #</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-orange-100 hover:bg-yellow-100">
                <td className="py-2">{order._id}</td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td className="flex gap-2">
                  <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => setStatusOrder(order)}>
                    Update Status
                  </Button>
                  <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => setDeleteId(order._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {statusOrder && (
        <StatusModal
          order={statusOrder}
          onClose={() => { setStatusOrder(null); setModalError(''); }}
          onSave={handleStatusUpdate}
          loading={modalLoading}
          error={modalError}
        />
      )}
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this order?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
          loading={modalLoading}
          error={modalError}
        />
      )}
    </div>
  );
}

function StatusModal({ order, onClose, onSave, loading, error }) {
  const [status, setStatus] = useState(order.status);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(order._id, status);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4 text-orange-700">Update Order Status</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-orange-200 rounded px-3 py-2">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard; 