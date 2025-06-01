import React from "react";
import { XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

function BalanceOverTimeChart({ balanceChartData }) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
      <div className="bg-white border-transparent rounded-lg shadow-xl">
        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
          <span className="font-bold uppercase text-gray-600">
            Net Balance Over Time
          </span>
        </div>
        <div className="p-5">
          <LineChart width={350} height={300} data={balanceChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default BalanceOverTimeChart;
