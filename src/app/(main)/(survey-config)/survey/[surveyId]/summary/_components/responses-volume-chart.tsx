"use client";

import { VolumeByDay } from "@/lib/types";
import { format } from "date-fns";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  Text,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type ResponsesVolumeChartProps = {
  data: VolumeByDay[];
};

function generateTicks(maxValue: number) {
  const minTicks = 2;
  const maxTicks = 10;

  const tickCount = Math.min(
    Math.max(Math.floor(maxValue / 5), minTicks),
    maxTicks
  );

  const roundedMaxValue = Math.ceil(maxValue / 5) * 5;

  const tickInterval = Math.round(roundedMaxValue / tickCount);

  const ticks = Array.from(
    { length: tickCount + 1 },
    (_, index) => index * tickInterval
  );

  return ticks;
}

const ResponsesVolumeChart = ({ data }: ResponsesVolumeChartProps) => {
  const chartId = useId();
  const barRef = useRef(null);
  const [xAxisTickWidth, setXAxisTickWidth] = useState(20);
  const [hideXAxis, setHideXAxis] = useState(() => {
    if (window.innerWidth < 400) {
      return true;
    } else if (window.innerWidth >= 400) {
      return false;
    }
  });

  const maxNumber = useMemo(() => {
    const dataCopy = [...data];
    dataCopy.sort((a, b) => b.response_count - a.response_count);

    return dataCopy[0].response_count;
  }, [data]);

  useEffect(() => {
    const onWindowResize = (e: Event) => {
      if (window.innerWidth < 400 && !hideXAxis) {
        setHideXAxis(true);
      } else if (window.innerWidth >= 400 && hideXAxis) {
        setHideXAxis(false);
      }
      // @ts-ignore
      const width = barRef.current?.props.xAxis.bandSize || 20;
      setXAxisTickWidth(width);
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [hideXAxis]);

  return (
    <ResponsiveContainer
      onResize={() => {
        // @ts-ignore
        const width = barRef.current?.props.xAxis.bandSize || 20;
        setXAxisTickWidth(width);
      }}
      width="100%"
      height={300}
    >
      <BarChart
        id={chartId}
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
          dataKey="day"
          tick={(props) => (
            <CustomXAxisTick
              {...props}
              width={xAxisTickWidth}
              hideXAxis={hideXAxis}
            />
          )}
          className="relative"
        />
        <YAxis
          width={25}
          ticks={generateTicks(maxNumber)}
          tick={CustomYAxisTick}
          interval={0}
          minTickGap={1}
        />
        <Tooltip />

        <Bar ref={barRef} dataKey="response_count" fill="#B4FF00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomXAxisTick = (s: any) => {
  return !s.hideXAxis ? (
    <g transform={`translate(${s.x - (s.width - 10) / 2},${s.y})`}>
      <foreignObject textAnchor="middle" width="100%" height="100%">
        <div
          title={format(new Date(s.payload.value), "MMMM d")}
          style={{
            width: s.width - 10,
          }}
          className="text-xs p-0.5  text-center border-r leading-[12px] border-red-50 break-all line-clamp-2"
        >
          <div> {format(new Date(s.payload.value), "MMMM d")}</div>
        </div>
      </foreignObject>
    </g>
  ) : null;
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <Text className="text-xs" x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {`${payload.value}`}
    </Text>
  );
};

export default ResponsesVolumeChart;
