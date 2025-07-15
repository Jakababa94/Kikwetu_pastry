import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 min-h-[500px] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight">
              Authentic Kenyan
              <span className="block text-green-700">Pastries</span>
              <span className="block text-orange-600">Delivered Fresh</span>
            </h1>
            
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              From traditional mandazi to modern cakes, we bring you the finest pastries 
              made with love and authentic Kenyan flavors. Perfect for celebrations, 
              events, or your daily treat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Shop Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/bulk-orders" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Bulk Orders
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
                  alt="Fresh pastries" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
                  alt="Traditional mandazi" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
                  alt="Wedding cake" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" 
                  alt="Assorted cookies" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
