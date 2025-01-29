import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, title, yAxisDomain, lineKey, color }) => {
  console.log("Data Passed to Chart:", data);

  return (
    <div className="stacked-charts">
      <h2 className="bg-fuchsia-50 mt-10 text-center mb-10">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 150, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="auto" />
          <XAxis
            dataKey="datetime"
            tickFormatter={(tick) => tick.replace("T", " ").slice(0, 16)} // Show in "YYYY-MM-DD HH:mm" format
            type="category"
          />
          <YAxis domain={yAxisDomain} />
          <Tooltip />
          <Line type="monotone" dataKey={lineKey} stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
