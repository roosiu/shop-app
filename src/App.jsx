import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import AdminOrders from './components/AdminOrders';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('currentUser');
    setIsAuthenticated(loggedIn === 'true');
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
        <main className="flex-grow max-w-screen-lg mx-auto p-4">
          <Routes>
            <Route path="/products" element={<ProductCatalog addToCart={addToCart} />} />
            <Route path="/cart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/" element={<ProductCatalog addToCart={addToCart} />} />
          </Routes>
        </main>
        <footer className="bg-white p-4 text-center border-t">
          <p>&copy; 2024 Mała Doniczka</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
