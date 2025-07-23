import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { year: "2018", Tesla: 120, BMW: 50, Nissan: 70 },
  { year: "2019", Tesla: 180, BMW: 80, Nissan: 90 },
  { year: "2020", Tesla: 260, BMW: 120, Nissan: 130 },
  { year: "2021", Tesla: 370, BMW: 150, Nissan: 140 },
  { year: "2022", Tesla: 480, BMW: 200, Nissan: 180 },
  { year: "2023", Tesla: 600, BMW: 240, Nissan: 220 },
];

export const EvCarsChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        EV Car Sales (2018–2023)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Tesla"
            stroke="#ef4444"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="BMW"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Nissan"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
