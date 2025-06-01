import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TransactionList from "../components/TransactionList";

const Transactions = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartMonthlyData, setChartMonthlyData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [balanceChartData, setBalanceChartData] = useState([]);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  return (
    <div className="w-full md:w-full xl:w-full p-6 mt-12">
      <TransactionList
        onError={handleError}
        setTotalBalance={setTotalBalance}
        setTotalIncome={setTotalIncome}
        setTotalExpense={setTotalExpense}
        setChartMonthlyData={setChartMonthlyData}
        setPieChartData={setPieChartData}
        setBalanceChartData={setBalanceChartData}
        title = "Transactions"
        limit = {0} 
      />
    </div>
  );
};

export default Transactions;
