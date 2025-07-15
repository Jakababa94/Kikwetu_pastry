import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ui/ThemeToggle';


const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const totalItems = (cart || []).reduce((sum, item) => sum + item.qty, 0);
  const isAdmin = user && user.role === 'admin';

  return (
    <header className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 shadow-lg border-b-2 border-amber-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🥐</span>
            </div>
            <span className="text-2xl font-bold text-amber-800 dark:text-amber-100">Kikwetu Pastries</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
              Products
            </Link>
            {user && (
              <Link to="/orders" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                Orders
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/cart" className="relative text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-amber-200 dark:border-gray-600 z-50">
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-amber-700 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-amber-700 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-amber-700 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-amber-200 dark:border-gray-600 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                Products
              </Link>
              {user && (
                <Link to="/orders" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                  Orders
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 font-medium transition-colors">
                  Admin
                </Link>
              )}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-amber-200 dark:border-gray-600">
                <ThemeToggle />
                <Link to="/cart" className="relative text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {user ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-amber-700 dark:text-amber-200 font-medium">{user.name}</span>
                    <Link to="/orders" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors">
                      Orders
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="text-left text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
