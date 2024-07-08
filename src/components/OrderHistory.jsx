import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/63a092ab15ab31599e2045be', {
      headers: {
        'x-access-key': '$2b$10$5pBRUbFRKdKft/b8qSQ3IeyPQgQ8CLXlvgoQA6GdpYvdWva.pOfGS'
      }
    })
      .then(response => response.json())
      .then(data => setTransactions(data.transactions))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Historia Zamówień</h2>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Data</th>
              <th className="py-2">Typ</th>
              <th className="py-2">Opis</th>
              <th className="py-2">Kwota</th>
              <th className="py-2">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">{transaction.type}</td>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">{transaction.amount} zł</td>
                <td className="py-2 px-4">{transaction.balance} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
