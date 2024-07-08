import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.jsonbin.io/v3/b/63a092ab15ab31599e2045be', {
        headers: {
          'x-access-key': '$2b$10$5pBRUbFRKdKft/b8qSQ3IeyPQgQ8CLXlvgoQA6GdpYvdWva.pOfGS'
        }
      });
      const data = await response.json();
      setTransactions(data.record.transactions);
      setTransactionTypes(data.record.transactionTypes);
      setDataLoaded(true);
    };

    fetchData();
  }, []);

  const getTransactionData = () => {
    const typeCounts = transactionTypes.map((type) => {
      return transactions.filter((transaction) => transaction.type === type.id).length;
    });

    const labels = transactionTypes.map((type) => type.name);
    const data = {
      labels,
      datasets: [
        {
          label: 'Transactions by Type',
          data: typeCounts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    return data;
  };

  const getBarChartData = () => {
    const dailyBalances = {};
    transactions.forEach((transaction) => {
      const date = transaction.date.split('T')[0];
      if (!dailyBalances[date]) {
        dailyBalances[date] = 0;
      }
      dailyBalances[date] += transaction.amount;
    });

    const labels = Object.keys(dailyBalances);
    const data = {
      labels,
      datasets: [
        {
          label: 'Daily Balance',
          data: Object.values(dailyBalances),
          backgroundColor: '#36A2EB',
        },
      ],
    };

    return data;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Historia Transakcji</h2>
      {dataLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Doughnut data={getTransactionData()} />
          </div>
          <div>
            <Bar data={getBarChartData()} />
          </div>
        </div>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
};

export default History;
