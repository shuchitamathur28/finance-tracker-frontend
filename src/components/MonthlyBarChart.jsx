import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyBarChart({ chartMonthlyData }) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
      <div className="bg-white border-transparent rounded-lg shadow-xl">
        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
          <span className="font-bold uppercase text-gray-600">
            Monthly Expense Trends
          </span>
        </div>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartMonthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip isAnimationActive={false} />
              <Legend />
              <Bar dataKey="income" stackId="a" fill="#82ca9d" />
              <Bar dataKey="expense" stackId="a" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MonthlyBarChart;
