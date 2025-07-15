import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvc: '' });
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
      clearCart();
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: '', card: '', expiry: '', cvc: '' });
      }, 2000);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h1>
        <Link to="/products" className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
      <table className="w-full mb-6">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-600">
            <th className="py-2 dark:text-white">Product</th>
            <th className="py-2 dark:text-white">Price</th>
            <th className="py-2 dark:text-white">Qty</th>
            <th className="py-2 dark:text-white">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id} className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-2 flex items-center gap-3">
                <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <span className="dark:text-white">{item.name}</span>
              </td>
              <td className="py-2 dark:text-white">${item.price.toFixed(2)}</td>
              <td className="py-2">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => updateQty(item._id, parseInt(e.target.value))}
                  className="w-16 border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </td>
              <td className="py-2 dark:text-white">${(item.price * item.qty).toFixed(2)}</td>
              <td className="py-2">
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline dark:text-red-400">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold dark:text-white">Total: ${total.toFixed(2)}</span>
        <button onClick={clearCart} className="text-sm text-red-500 hover:underline dark:text-red-400">Clear Cart</button>
      </div>
      <button
        className="w-full bg-amber-500 text-white px-6 py-3 rounded font-semibold hover:bg-amber-600 transition"
        onClick={() => setShowModal(true)}
      >
        Checkout
      </button>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setShowModal(false)}
              disabled={paying}
            >
              &times;
            </button>
            {success ? (
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4">Thank you for your order.</p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4">
                <h2 className="text-xl font-bold mb-2 text-amber-700 dark:text-amber-300">Payment Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInput}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="card"
                    value={form.card}
                    onChange={handleInput}
                    required
                    pattern="[0-9]{16}"
                    maxLength={16}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleInput}
                      required
                      placeholder="MM/YY"
                      pattern="(0[1-9]|1[0-2])\/\d{2}"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={form.cvc}
                      onChange={handleInput}
                      required
                      pattern="[0-9]{3,4}"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={paying}
                >
                  {paying ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
