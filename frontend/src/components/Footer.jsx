import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer= () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🥐</span>
              </div>
              <span className="text-xl font-bold">Kikwetu Pastries</span>
            </div>
            <p className="text-amber-200 mb-4">
              Bringing authentic Kenyan pastries to your doorstep. Fresh, delicious, and made with love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-amber-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-amber-200 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-amber-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=cakes" className="text-amber-200 hover:text-white transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link to="/products?category=mandazi" className="text-amber-200 hover:text-white transition-colors">
                  Mandazi
                </Link>
              </li>
              <li>
                <Link to="/products?category=cookies" className="text-amber-200 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/products?category=samosas" className="text-amber-200 hover:text-white transition-colors">
                  Samosas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-200" />
                <span className="text-amber-200">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-200" />
                <span className="text-amber-200">info@jambopastries.co.ke</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-200" />
                <span className="text-amber-200">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-200">
            &copy; 2025 Kikwetu Pastries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;