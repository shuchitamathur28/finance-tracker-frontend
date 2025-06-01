import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SummaryCards from "../components/SummaryCards";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyBarChart from "../components/MonthlyBarChart";
import ExpensePieChart from "../components/ExpensePieChart";
import BalanceOverTimeChart from "../components/BalanceOverTimeChart";

const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartMonthlyData, setChartMonthlyData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [balanceChartData, setBalanceChartData] = useState([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      // return;
    }
  }, []);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  return (
    <section>
      <div
        id="main"
        className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
      >
        <div className="bg-gray-800 pt-3" style={{ marginTop: "56px" }}>
          <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h1 className="font-bold pl-2">Analytics</h1>
          </div>
        </div>

        <div className="flex flex-wrap">
          <SummaryCards value={{ totalBalance, totalExpense, totalIncome }} />
          <AddTransactionForm onSuccess={handleSuccess} onError={handleError} />
          <div className="w-full md:w-3/4 xl:w-2/3 p-6">
            <TransactionList
              onError={handleError}
              setTotalBalance={setTotalBalance}
              setTotalIncome={setTotalIncome}
              setTotalExpense={setTotalExpense}
              setChartMonthlyData={setChartMonthlyData}
              setPieChartData={setPieChartData}
              setBalanceChartData={setBalanceChartData}
              title = "Recent Transactions"
              limit = {5}
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap flex-grow mt-2">
          <MonthlyBarChart chartMonthlyData={chartMonthlyData} />
          <ExpensePieChart pieChartData={pieChartData} />
          <BalanceOverTimeChart balanceChartData={balanceChartData} />
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Dashboard;
