import React, { useState, useEffect } from 'react';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import AdminOrders from './components/AdminOrders';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('ProductCatalog');
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

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductCatalog':
        return <ProductCatalog addToCart={addToCart} />;
      case 'ShoppingCart':
        return <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />;
      case 'OrderHistory':
        return <OrderHistory />;
      case 'AdminOrders':
        return <AdminOrders />;
      case 'Login':
        return <Login onLogin={handleLogin} />;
      case 'Register':
        return <Register onRegister={handleLogin} />;
      default:
        return <ProductCatalog addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white p-4 shadow-md">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mała Doniczka</h1>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setActiveComponent('ProductCatalog')}
              className="text-gray-700 hover:text-green-600"
            >
              Produkty
            </button>
            <button
              onClick={() => setActiveComponent('ShoppingCart')}
              className="text-gray-700 hover:text-green-600"
            >
              Koszyk
            </button>
            <button
              onClick={() => setActiveComponent('OrderHistory')}
              className="text-gray-700 hover:text-green-600"
            >
              Historia Zamówień
            </button>
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Witaj, {currentUser.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-green-600"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveComponent('Login')}
                  className="text-gray-700 hover:text-green-600"
                >
                  Logowanie
                </button>
                <button
                  onClick={() => setActiveComponent('Register')}
                  className="text-gray-700 hover:text-green-600"
                >
                  Rejestracja
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-screen-lg mx-auto p-4">
        {renderComponent()}
      </main>
      <footer className="bg-white p-4 text-center border-t">
        <p>&copy; 2024 Mała Doniczka</p>
      </footer>
    </div>
  );
};

export default App;
