// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const RiverGraph = ({ data }) => {
//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Surinetar Contributions
//       </h1>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="datetime"
//             tickFormatter={(tick) => new Date(tick).toLocaleString()}
//           />
//           <YAxis />
//           <Tooltip
//             labelFormatter={(label) => new Date(label).toLocaleString()}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="suirenitar_by_trishuli"
//             stroke="#8884d8"
//             name="Trishuli Contribution"
//           />
//           <Line
//             type="monotone"
//             dataKey="suirenitar_by_budigandaki"
//             stroke="#82ca9d"
//             name="Budigandaki Contribution"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RiverGraph;
