import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Phase-1",
    uv: -15,
  },
  {
    name: "Phase-2",
    uv: -10,
  },
  {
    name: "Phase-3",
    uv: 5,
  },
  {
    name: "Phase-4",
    uv: 2,
  },
  {
    name: "Phase-5",
    uv: -8,
  },
  {
    name: "Phase-6",
    uv: -2.5,
  },
  {
    name: "Phase-7",
    uv: 10,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

function AreaChartAnalytics() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{
            value: "Phases(1-7)",
            dx: 250,
            dy: 25,
            position: "insideLeft",
            fill: "grey",
          }}/>
        <YAxis label={{
            value: "Progress Distribution",
            angle: -90,
            dx: 10,
            dy: 60,
            position: "insideLeft",
            fill: "grey",
          }}/>
        <Tooltip />
        <Legend verticalAlign="top" height={50} color="grey" />

        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="green" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
         name="Progress Over Time Chart"
          type="monotone"
          dataKey="uv"
          stroke="#000"
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartAnalytics;
