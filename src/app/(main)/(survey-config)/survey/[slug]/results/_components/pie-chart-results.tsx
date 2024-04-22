import React from "react";
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type PieChartResultsProps = {
  data: {
    description: string;
    percenteges: number;
    answeredCount: number;
    id: string;
  }[];
};

const COLORS = [
  "#00BF6F",
  "#F9BE00",
  "#6BC8CD",
  "#FF8B4F",
  "#D25F90",
  "#DB4D5C",
  "#768086",
];

const PieChartResults = ({ data }: PieChartResultsProps) => {
  const answeredChoices = data.filter((choice) => choice.answeredCount !== 0);

  return (
    <ResponsiveContainer minWidth={450} height={350}>
      <PieChart>
        <Pie
          dataKey="percenteges"
          data={answeredChoices}
          isAnimationActive
          cx="50%"
          cy="50%"
          outerRadius={140}
          fill="#B4FF00"
          label={CustomLabel}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={CustomTooltipContent} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomTooltipContent = ({
  payload,
  active,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    return (
      <div className="p-2 rounded-sm bg-slate-800 text-white text-xs">
        <p className="flex gap-1">
          <span className="text-white">{`${dataItem.answeredCount}`}</span>
          <span className="text-white">
            {`(${dataItem.percenteges + "%"})`}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const calculateTextWidth = (text: string, fontSize: number) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = `${fontSize}px Arial`; // Set the font size and type
  const width = context.measureText(text).width; // Measure the width of the text
  return width;
};

const CustomLabel = (s: any) => {
  const textWidth = calculateTextWidth(s.description, 12);
  const textContainerWidth = textWidth > 70 ? 70 : textWidth + 10;
  const translateXVal =
    s.textAnchor === "start" ? s.x : s.x - textContainerWidth;

  return (
    <g>
      <foreignObject
        x={translateXVal}
        y={s.y - 12}
        cx={s.cx}
        cy={s.cy}
        height="27px"
        width={textContainerWidth}
      >
        <div
          style={{
            width: textContainerWidth,
          }}
          title={s.description}
          className="text-xs  p-0.5 leading-[12px] break-words line-clamp-2"
        >
          {s.description}
        </div>
      </foreignObject>
    </g>
  );
};

export default PieChartResults;
