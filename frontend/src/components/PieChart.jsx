import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = () => {
  const data = [
    { name: "Pending Emergencies", value: 400 },
    { name: "Dispatched Emergencies", value: 300 },
    { name: "Resolved", value: 300 },
  ];

  const COLORS = ["#EE0000", "#FFBB28", "#00C49F"];

  return (
    <PieChart width={360} height={500}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
