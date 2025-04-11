import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

function RadarChartAnalytics({ datapoints }) {
  const extractDataPoints = (datapoints) => {
    if(!datapoints)
      return null;
    let datapointObj = [];
    if (datapoints?.RadarChart) {
      const datapointsValue = datapoints?.RadarChart[0].value;
      const jsonDataPoint = JSON.parse(datapointsValue);
      if (jsonDataPoint && jsonDataPoint instanceof Object) {
        const listKeys = Object.keys(jsonDataPoint);
        for (let key of listKeys) {
          let data = {};
          data.key = key;
          data.value = jsonDataPoint[key];
          data.fullValue = 100;
          datapointObj.push(data);
        }
      }
    }
    return datapointObj;
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={extractDataPoints(datapoints)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="key" />
        <PolarRadiusAxis />
        <Legend verticalAlign="top" height={70} />

        <Radar
          name="Emotion Tracking Chart"
          dataKey="value"
          stroke="#83a6ed"
          fill="#83a6ed"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default RadarChartAnalytics;
