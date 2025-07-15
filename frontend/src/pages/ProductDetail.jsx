import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/products" className="text-amber-600 hover:underline mb-4 inline-block">&larr; Back to Products</Link>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.image || 'https://via.placeholder.com/400x400?text=Product+Image'} 
              alt={product.name} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-amber-600 mb-4">${product.price.toFixed(2)}</div>
            <div className="text-gray-600 mb-4">{product.description}</div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Stock:</span>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Rating:</span>
                <span className="font-medium">{product.averageRating || 0} ({product.numReviews || 0} reviews)</span>
              </div>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            {added && (
              <div className="mt-4 text-center text-green-600 font-semibold">Added to cart!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 