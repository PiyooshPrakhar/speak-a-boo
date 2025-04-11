import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
function BrushChartAnalytics({datapoints}) {
  return (
    <div style={{ height: "290px" }}>
      <BarChart
        width={700}
        height={270}
        data={datapoints?.BrushChart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="key"
          label={{
            value: "Day of the week",
            position: "insideBottom",
            dy: 16,
            fill: "grey",
          }}
        />
        <YAxis
          label={{
            value: "Time (in mins)",
            angle: -90,
            dx: -10,
            dy: 50,
            position: "insideLeft",
            fill: "grey",
          }}
        />
        <Legend verticalAlign="top" height={50} color="grey"/>

        <Bar
          name="Session Tracking Chart"
          dataKey="value"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {datapoints?.BrushChart?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={"#FF9000"}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default BrushChartAnalytics;
