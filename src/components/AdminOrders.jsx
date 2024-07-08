import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Zamówienia</h2>
      {orders.map(order => (
        <div key={order.id} className="border-b py-2">
          <h3 className="text-xl">Zamówienie #{order.id}</h3>
          <p>Status: {order.status}</p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2">Zaktualizuj status</button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
