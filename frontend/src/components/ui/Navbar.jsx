import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { user } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const isAdmin = user && user.role === 'admin';
  return (
    <nav className="bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-50 shadow-md dark:bg-background dark:text-foreground sticky top-0 z-50 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight text-orange-700">Kikwetu Pastry</Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-orange-600 transition">Home</Link>
            <Link to="/products" className="hover:text-orange-600 transition">Products</Link>
            <Link to="/orders" className="hover:text-orange-600 transition">Orders</Link>
            {isAdmin && <Link to="/admin" className="hover:text-orange-600 transition">Admin</Link>}
            <Link to="/cart" className="relative hover:text-orange-600 transition">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-orange-500 text-white rounded-full px-2 text-xs font-bold">{cartCount}</span>
              )}
            </Link>
            <Link to="/login" className="hover:text-orange-600 transition">Login</Link>
            <Link to="/signup" className="hover:text-orange-600 transition">Signup</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden flex flex-col space-y-2 py-2 bg-yellow-50 border-t border-orange-200">
            <Link to="/" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Products</Link>
            <Link to="/orders" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Orders</Link>
            {isAdmin && <Link to="/admin" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Admin</Link>}
            <Link to="/cart" className="relative hover:text-orange-600 transition" onClick={() => setOpen(false)}>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-orange-500 text-white rounded-full px-2 text-xs font-bold">{cartCount}</span>
              )}
            </Link>
            <Link to="/login" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/signup" className="hover:text-orange-600 transition" onClick={() => setOpen(false)}>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 