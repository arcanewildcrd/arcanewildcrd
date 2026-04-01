import { useState, useEffect } from 'preact/hooks';

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('ucu_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ucu_cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return { cart, addItem, removeItem, total: cart.reduce((sum, i) => sum + i.price, 0) };
}
