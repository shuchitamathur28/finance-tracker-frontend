import React from "react";
import { formatCurrency } from "../utils/format";


function SummaryCards({ value }) {
  const { totalBalance, totalIncome, totalExpense } = value;
  return (
    <>
      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
        <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded-full p-5 bg-green-600">
                <i className="fa fa-wallet fa-2x fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h2 className="font-bold uppercase text-gray-600">
                Total Balance
              </h2>
              <p className="font-bold text-3xl">
                {formatCurrency(totalBalance)}
                <span className="text-green-500">
                  <i className="fas fa-caret-up"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
        <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded-full p-5 bg-pink-600">
                <i className="fas fa-users fa-2x fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h2 className="font-bold uppercase text-gray-600">
                Total Income
              </h2>
              <p className="font-bold text-3xl">
                {formatCurrency(totalIncome)}
                <span className="text-pink-500">
                  <i className="fas fa-exchange-alt"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 p-6">
        <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded-full p-5 bg-yellow-600">
                <i className="fas fa-user-plus fa-2x fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h2 className="font-bold uppercase text-gray-600">
                Total Expense
              </h2>
              <p className="font-bold text-3xl">
                {formatCurrency(totalExpense)}
                <span className="text-yellow-600">
                  <i className="fas fa-caret-up"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryCards;
