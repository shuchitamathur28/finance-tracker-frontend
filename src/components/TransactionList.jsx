import React, { useState, useEffect } from "react";
import TransactionService from "../services/TransactionService";
import { formatDate, formatCurrency } from "../utils/format";
import moment from "moment";

const TransactionList = ({
  onError,
  setTotalBalance,
  setTotalIncome,
  setTotalExpense,
  setBalanceChartData,
  setChartMonthlyData,
  setPieChartData,
  title,
  limit
}) => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
    limit: limit
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const resp = await TransactionService.getTransactions({ ...filters });
        setTransactions(resp.data);

        const trnx = resp.data;
        const amounts = trnx.map((txn) => txn.amount);
        setTotalBalance(
          amounts.reduce((acc, curr) => acc + curr, 0).toFixed(2)
        );

        const incomes = trnx.filter((txn) => txn.amount > 0);
        setTotalIncome(
          incomes.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
        );

        const expenses = trnx.filter((txn) => txn.amount < 0);
        setTotalExpense(
          expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
        );

        // Begin Bar Chart Logic
        const monthlyData = {};
        trnx.forEach((txn) => {
          const month = moment(txn.createdAt).format("YYYY-MM");
          if (!monthlyData[month]) {
            monthlyData[month] = { month, income: 0, expense: 0 };
          }

          if (txn.amount >= 0) {
            monthlyData[month].income += txn.amount;
          } else {
            monthlyData[month].expense += Math.abs(txn.amount);
          }
        });
        try {
          setChartMonthlyData(Object.values(monthlyData));
        } catch (error) {
          console.error(
            "Error converting monthly data to array:",
            error.message
          );
        }
        // End Bar Chart Logic

        // Begin Pie Chart Logic
        const dataMap = trnx
          .filter((txn) => txn.amount < 0)
          .reduce((acc, txn) => {
            acc[txn.name] = (acc[txn.name] || 0) + Math.abs(Number(txn.amount));
            return acc;
          }, {});
        setPieChartData(
          Object.entries(dataMap).map(([name, value]) => ({
            name,
            value,
          }))
        );
        // End Pie Chart Logic

        // Begin Line Chart Logic
        const balanceData = generateCumulativeBalance(trnx);
        setBalanceChartData(balanceData); // use this in your <LineChart />
        // End Line Chart Logic
      } catch (err) {
        // console.error("Error fetching transactions", err);
        onError("Failed to fetch transactions");
      }
    };
    fetchTransactions();
  }, [filters]);

  const generateCumulativeBalance = (transactions) => {
    // Step 1: Group amounts by date
    const grouped = {};

    transactions.forEach((txn) => {
      const date = formatDate(txn.createdAt);
      if (!grouped[date]) {
        grouped[date] = 0;
      }
      grouped[date] += txn.amount;
    });

    // Step 2: Sort by date and compute cumulative balance
    const sortedDates = Object.keys(grouped).sort();
    let cumulative = 0;

    const result = sortedDates.map((date) => {
      cumulative += grouped[date];
      return { date, balance: cumulative };
    });

    return result;
  };

  const dateClass =
    "w-full md:w-1/3 p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 shadow-sm";

  return (
      <div className="bg-white border-transparent rounded-lg shadow-xl">
        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
          <h2 className="font-bold uppercase text-gray-600">
            {title}
          </h2>
        </div>
        <div className="p-2">
          <div className="w-full p-1 mb-4">
            <select
              className="w-full md:w-1/3 p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 shadow-sm"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              className={dateClass}
              type="date"
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <input
              className={dateClass}
              type="date"
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
            {/* <button onClick={fetchFilteredTransactions}>Apply Filters</button> */}
          </div>
          <table className="w-full p-5 text-gray-700">
            <thead>
              <tr>
                <th className="text-left text-blue-900">Name</th>
                <th className="text-left text-blue-900">Type</th>
                <th className="text-left text-blue-900">Amount</th>
                <th className="text-left text-blue-900">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{txn.name}</td>
                  <td>{txn.amount < 0 ? "Expense" : "Income"}</td>
                  <td>{formatCurrency(txn.amount)}</td>
                  <td>{formatDate(txn.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default TransactionList;
