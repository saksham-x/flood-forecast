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

const Chart = ({ data, title, yAxisDomain, lineKey, color, xAxisKey }) => {
  console.log("Data Passed to Chart:", data);

  return (
    <div className="stacked-charts">
      <h2 className="bg-gray-100 mt-10 text-center p-2 mb-10">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 150, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="auto" />
          <XAxis
            dataKey={xAxisKey}
            tickFormatter={(tick) =>
              tick
                ? new Date(tick).toLocaleString("en-US", { hour12: false })
                : ""
            }
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
