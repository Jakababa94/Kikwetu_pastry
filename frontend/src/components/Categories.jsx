import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Cakes',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Custom cakes for all occasions',
    link: '/products?category=cakes'
  },
  {
    name: 'Mandazi',
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Traditional Kenyan donuts',
    link: '/products?category=mandazi'
  },
  {
    name: 'Cookies',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Freshly baked cookies',
    link: '/products?category=cookies'
  },
  {
    name: 'Samosas',
    image: 'https://images.pexels.com/photos/5840133/pexels-photo-5840133.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Crispy triangular pastries',
    link: '/products?category=samosas'
  },
  {
    name: 'Doughnuts',
    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Glazed and filled doughnuts',
    link: '/products?category=doughnuts'
  },
  {
    name: 'Bread',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    description: 'Fresh baked bread daily',
    link: '/products?category=bread'
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Our Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide variety of traditional and modern pastries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
