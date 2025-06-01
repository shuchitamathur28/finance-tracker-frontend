import React from "react";
import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function ExpensePieChart({ pieChartData }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
      <div className="bg-white border-transparent rounded-lg shadow-xl">
        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
          <span className="font-bold uppercase text-gray-600">
            Expenses by Category
          </span>
        </div>
        <div className="p-5">
          <PieChart width={350} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {pieChartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default ExpensePieChart;
