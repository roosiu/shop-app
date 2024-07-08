import React from 'react';

function ShoppingCart({ cartItems, removeFromCart, updateQuantity }) {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Koszyk</h2>
        {cartItems.length === 0 ? (
          <div className="text-center p-4 border rounded">
            <p>Twój koszyk aktualnie jest pusty.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Wróć do sklepu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded mb-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div className="flex-grow mx-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="text-green-600 font-bold">{item.price}</p>
                    <p>Ilość: {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 rounded-l"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border p-4 rounded">
              <h2 className="text-2xl font-bold mb-4">Podsumowanie</h2>
              <div className="mb-4">
                <p>Wartość koszyka: {totalAmount.toFixed(2)} zł</p>
                <p>Koszt dostawy: Poznasz przy składaniu zamówienia</p>
                <p>Całkowity koszt: {totalAmount.toFixed(2)} zł</p>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Zacznij składać zamówienie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
