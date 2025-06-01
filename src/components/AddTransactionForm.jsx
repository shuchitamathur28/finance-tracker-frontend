import React, { useState } from "react";
import TransactionService from "../services/TransactionService";
import { useNavigate } from "react-router-dom";

const AddTransactionForm = ({ onSuccess, onError }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
      tname: "",
      amount: "",
    });
  const { tname, amount } = inputValue;
    const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!tname || !amount) {
          handleError("Please fill all the fields");
          return;
        }
        const resp = await TransactionService.addTransaction({ ...inputValue });
        if (resp.success) {
          onSuccess(resp.message);
          navigate("/dashboard");
        }
      } catch (error) {
        onError("An error occurred while saving transaction", error.message);
      }
    };


  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
      <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
        <h2 className="font-bold uppercase text-gray-600 text-center">
          Add your Income/ Expense
        </h2>
        <form onSubmit={handleFormSubmit}>
          <input
            className="w-full px-8 py-4 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            name="tname"
            placeholder="Add title about income/expense"
            value={tname}
            onChange={handleOnChange}
          />
          <input
            className="w-full px-8 py-4 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="number"
            name="amount"
            placeholder="Enter Amount in positive or negative"
            value={amount}
            onChange={handleOnChange}
          />
          <button
            className="text-md mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer"
            type="submit"
          >
            <svg
              className="w-6 h-6 text-white-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>

            <span className="ml-3">Save</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
