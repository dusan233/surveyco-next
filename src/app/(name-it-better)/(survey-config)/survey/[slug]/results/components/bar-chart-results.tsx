"use client";

import React, { useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  Text,
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
  const barRef = useRef(null);
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        interval={0}
        minTickGap={1}
        dataKey="description"
        tick={(props) => (
          <CustomXAxisTick
            {...props}
            // @ts-ignore
            width={barRef.current?.props.xAxis.bandSize || 20}
          />
        )}
        className="relative"
      />
      <YAxis
        onClick={() => console.log(barRef.current)}
        ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        tick={CustomYAxisTick}
        interval={0}
        minTickGap={1}
      />
      <Tooltip content={CustomTooltipContent} />

      <Bar
        ref={barRef}
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
        <p className="text-sm max-w-[150px] break-all ...">
          {dataItem.description}
        </p>
        <p className="text-[#B4FF00]">{` ${dataItem.answeredCount} (${
          dataItem.percenteges + "%"
        })`}</p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = (s: any) => {
  return (
    <g transform={`translate(${s.x - (s.width - 10) / 2},${s.y})`}>
      <foreignObject textAnchor="middle" width="100%" height="100%">
        <div
          title={s.payload.value}
          style={{
            width: s.width - 10,
          }}
          className="text-xs p-0.5  text-center border-r leading-[12px] border-red-50 break-all line-clamp-2"
        >
          <div>{s.payload.value}</div>
        </div>
      </foreignObject>
    </g>
  );
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text className="text-xs" x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {`${payload.value}%`}
    </Text>
  );
};

export default BarChartResults;
