import React, { createContext, useContext, useReducer, useEffect } from 'react';

/* ---------- Helpers ---------- */
const calculateTotal = items =>
  items.reduce((total, item) => {
    // 15 % bulk discount
    const price = item.is_bulk ? item.product.price * 0.85 : item.product.price;
    return total + price * item.quantity;
  }, 0);

/* ---------- Reducer ---------- */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, is_bulk } = action.payload;

      const existingItem = state.items.find(
        item => item.product.id === product.id && item.is_bulk === is_bulk
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updatedItems, total: calculateTotal(updatedItems) };
      }

      const newItem = {
        id: `${product.id}-${is_bulk ? 'bulk' : 'single'}`,
        product,
        quantity,
        is_bulk,
      };

      const updatedItems = [...state.items, newItem];
      return { ...state, items: updatedItems, total: calculateTotal(updatedItems) };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: updatedItems, total: calculateTotal(updatedItems) };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems, total: calculateTotal(updatedItems) };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    case 'LOAD_CART':
      return { items: action.payload, total: calculateTotal(action.payload) };

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
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  /* Load cart from localStorage on mount */
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
  }, []);

  /* Persist cart whenever items change */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  /* Action creators */
  const addItem = (product, quantity, is_bulk = false) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, is_bulk } });

  const removeItem = id => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQuantity = (id, quantity) =>
    quantity <= 0
      ? removeItem(id)
      : dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = { state, addItem, removeItem, updateQuantity, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
