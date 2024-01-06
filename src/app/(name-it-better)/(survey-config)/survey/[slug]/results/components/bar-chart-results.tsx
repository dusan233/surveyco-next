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
        bottom: 2,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        interval={0}
        minTickGap={1}
        dataKey="description"
        tick={CustomXAxisTick}
        className="relative"
      />
      <YAxis
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
    // <g transform={`translate(${s.x - },${s.y})`}>
    <foreignObject
      x={s.x}
      y={s.y}
      transform="translate(50%)"
      textAnchor="end"
      width="100%"
      height="100px"
    >
      <div
        title={s.payload.value}
        className="text-xs  border-r leading-3 w-10 border-red-50 break-all line-clamp-2"
      >
        {s.payload.value}
      </div>
    </foreignObject>
    // </g>
  );

  return (
    <div
      style={{
        left: s.x,
        top: s.y,
      }}
      className="absolute z-50 bg-red-50"
    >{`${s.payload.value}`}</div>
    // <Text
    //   className="text-xs break-all ..."
    //   x={s.x}
    //   y={s.y}
    //   width={10}
    //   height={20}
    //   textAnchor="middle"
    //   verticalAnchor="start"
    //   overflow="hidden"
    // >
    //   {`${s.payload.value}`}
    // </Text>
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
