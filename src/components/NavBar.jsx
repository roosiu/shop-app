import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, currentUser, handleLogout }) => (
  <header className="bg-white p-4 shadow-md">
    <div className="max-w-screen-lg mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold">Mała Doniczka</h1>
      <nav className="flex items-center space-x-4">
        <Link to="/products" className="text-gray-700 hover:text-green-600">
          Produkty
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-green-600">
          Koszyk
        </Link>
        <Link to="/order-history" className="text-gray-700 hover:text-green-600">
          Historia Zamówień
        </Link>
        {isAuthenticated ? (
          <>
            <span className="text-gray-700">Witaj, {currentUser.username}</span>
            <button onClick={handleLogout} className="text-gray-700 hover:text-green-600">
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-600">
              Logowanie
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">
              Rejestracja
            </Link>
          </>
        )}
      </nav>
    </div>
  </header>
);

export default NavBar;
