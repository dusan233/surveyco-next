import React from "react";
import { Pie, PieChart, Text, Tooltip, Cell } from "recharts";

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

const data01 = [
  {
    name: "Group A",
    value: 400,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group B",
    value: 300,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group C",
    value: 300,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group D",
    value: 500,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group E",
    value: 278,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group F",
    value: 189,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group F",
    value: 189,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group F",
    value: 189,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group F",
    value: 189,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group F",
    value: 189,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group E",
    value: 278,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group E",
    value: 278,
    description: "Choice2",
  },
  {
    name: "Group E",
    value: 278,
    description:
      "Choice2 dasdaskdjsakdjq dqwdwqid wqdqowd woqdoqw dqowdoq doq dqwp dqwd qow doqwodowqdoqwod dwq dqw rwqr qwrqwr12r awfawgwag w q qgqgg qgqw gqwgqw qw",
  },
  {
    name: "Group E",
    value: 278,
    description: "Choice2",
  },
  {
    name: "Group E",
    value: 278,
    description: "Choice2",
  },
  {
    name: "Group E",
    value: 278,
    description: "Choice2",
  },
];

const PieChartResults = ({ data }: PieChartResultsProps) => {
  const answeredChoices = data.filter((choice) => choice.answeredCount !== 0);

  return (
    <PieChart width={510} height={400}>
      <Pie
        dataKey="percenteges"
        data={answeredChoices}
        isAnimationActive
        cx="50%"
        cy="50%"
        // nameKey="description"
        outerRadius={140}
        fill="#B4FF00"
        label={CustomLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip content={CustomTooltipContent} />
    </PieChart>
  );
};

const CustomTooltipContent = ({ payload, label, active }: any) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload; // Get the data item associated with the active tooltip
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
  console.log(s);
  const textWidth = calculateTextWidth(s.description, 12);
  const textContainerWidth = textWidth > 70 ? 70 : textWidth + 10;
  const translateXVal =
    s.textAnchor === "start" ? s.x : s.x - textContainerWidth;

  return (
    <g
    //   x={s.x}
    //   y={s.y}
    //   cx={s.cx}
    //   cy={s.cy}
    //   textAnchor={s.textAnchor}

    //   transform={`translate(${translateXVal},${s.y - 12})`}
    >
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
          className="text-xs  p-0.5 leading-[12px] break-all line-clamp-2"
        >
          {s.description}
        </div>
      </foreignObject>
    </g>
  );

  return (
    <Text
      className="text-xs"
      x={s.x}
      y={s.y}
      cx={s.cx}
      cy={s.cy}
      textAnchor={s.textAnchor}
      dominantBaseline="end"
      fill="#000"
    >
      {`${s.description}`}
    </Text>
  );
};

export default PieChartResults;
