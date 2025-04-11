import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function ScatterChartAnalytics({ datapoints }) {
  const extractDataPoints = (datapoints) => {
    if(!datapoints)
      return null;
    const datapointObj1 = new Map();
    const datapointObj2 = new Map();
    const datapointObj = [];
    for (let datapoint of datapoints) {
      if (!datapointObj1.get(Number(datapoint.key))) {
        datapointObj1.set(Number(datapoint.key), Number(datapoint.value));
      } else {
        datapointObj1.set(
          Number(datapoint.key),
          datapointObj1.get(Number(datapoint.key)) + Number(datapoint.value)
        );
      }

      if (!datapointObj2.get(Number(datapoint.key))) {
        datapointObj2.set(Number(datapoint.key), 1);
      } else {
        datapointObj2.set(
          Number(datapoint.key),
          datapointObj2.get(Number(datapoint.key)) + 1
        );
      }
    }
    for(let content of datapointObj1){
      const key = content[0];
      datapointObj.push({
        key,
        chats: datapointObj1.get(key),
        topics: datapointObj2.get(key)
      })
    }
    return datapointObj;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{
          top: 5,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="key"
          name="Day"
          label={{
            value: "Day of the week[1:SATURDAY - 7:SUNDAY]",
            position: "insideBottom",
            dy: 16,
            fill: "grey",
          }}
        />
        <Legend verticalAlign="top" height={50} color="grey" />

        <YAxis
          label={{
            value: "Total Topics",
            angle: -90,
            dx: 0,
            dy: 30,
            position: "insideLeft",
            fill: "grey",
          }}
          yAxisId="left"
          type="number"
          dataKey="topics"
          name="Topics"
          stroke="#8884d8"
        />
        <YAxis
          label={{
            value: "Total Chats",
            angle: 90,
            dx: 50,
            dy: -50,
            position: "insideLeft",
            fill: "grey",
          }}
          yAxisId="right"
          type="number"
          dataKey="chats"
          name="Chats"
          orientation="right"
          stroke="#82ca9d"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          yAxisId="left"
          name="Topic Distribution"
          data={extractDataPoints(datapoints.ScatterChart)}
          fill="#8884d8"
        />
        <Scatter
          yAxisId="right"
          name="Chat Distribution"
          data={extractDataPoints(datapoints.ScatterChart)}
          fill="#82ca9d"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default ScatterChartAnalytics;
