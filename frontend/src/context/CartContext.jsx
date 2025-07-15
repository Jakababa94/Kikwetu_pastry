import React, { createContext, useContext, useReducer, useEffect } from 'react';

/* ---------- Reducer ---------- */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      console.log('Processing ADD_ITEM:', product);
      console.log('Current cart state:', state);
      
      const existingItem = state.find(item => item._id === product._id);

      if (existingItem) {
        console.log('Item exists, updating quantity');
        return state.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      };
      
      console.log('Adding new item:', newItem);
      return [...state, newItem];
    }

    case 'REMOVE_ITEM': {
      return state.filter(item => item._id !== action.payload);
    }

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return state.filter(item => item._id !== id);
      }
      return state.map(item =>
        item._id === id ? { ...item, qty } : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

/* ---------- Context ---------- */
const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

/* ---------- Provider ---------- */
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  /* Load cart from localStorage on mount */
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsedCart = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  /* Persist cart whenever items change */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* Action creators */
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQty = (id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQty, 
    clearCart 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
