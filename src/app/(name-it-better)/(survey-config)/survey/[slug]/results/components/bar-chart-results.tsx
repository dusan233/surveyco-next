import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarChartResultsProps = {
  data: {
    description: string;
    percenteges: string;
    answeredCount: number;
    id: string;
  }[];
};

const BarChartResults = ({ data }: BarChartResultsProps) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        interval={0}
        minTickGap={1}
        dataKey="description"
        tick={CustomXAxisTick}
      />
      <YAxis
        ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        tick={CustomYAxisTick}
        interval={0}
        minTickGap={1}
      />
      <Tooltip content={CustomTooltipContent} />

      <Bar
        dataKey="percenteges"
        fill="#B4FF00"
        activeBar={<Rectangle fill="#B4FF00" stroke="#002340" />}
      />
    </BarChart>
  );
};

const CustomTooltipContent = ({ payload, label, active }: any) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload; // Get the data item associated with the active tooltip
    return (
      <div className="p-2 rounded-sm bg-slate-800 text-white text-sm">
        <p className="text-sm max-w-[150px]">{dataItem.description}</p>
        <p className="text-[#B4FF00]">{` ${dataItem.answeredCount} (${
          dataItem.percenteges + "%"
        })`}</p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <text
      x={x}
      y={y}
      dy={16}
      className="text-xs"
      textAnchor="middle"
      fill="#666"
      style={{
        maxWidth: `${100}px`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {`${payload.value}`} {/* Custom text */}
    </text>
  );
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload, dy, dx } = props;
  return (
    <text className="text-xs" x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {`${payload.value}%`}
    </text>
  );
};

const CustomYAxisLabel = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x} y={y} dy={-10} textAnchor="middle" fill="#666">
      {`213%`}
    </text>
  );
};

export default BarChartResults;
