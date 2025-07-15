import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/products" className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <table className="w-full mb-6">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="py-2">Product</th>
            <th className="py-2">Price</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id} className="border-b border-gray-100">
              <td className="py-2 flex items-center gap-3">
                <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <span>{item.name}</span>
              </td>
              <td className="py-2">${item.price.toFixed(2)}</td>
              <td className="py-2">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => updateQty(item._id, parseInt(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
              </td>
              <td className="py-2">${(item.price * item.qty).toFixed(2)}</td>
              <td className="py-2">
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
        <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear Cart</button>
      </div>
      <button className="w-full bg-amber-500 text-white px-6 py-3 rounded font-semibold hover:bg-amber-600 transition">Checkout</button>
    </div>
  );
};

export default Cart;
