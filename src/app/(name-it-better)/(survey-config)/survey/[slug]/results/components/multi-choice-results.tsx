import { MultipleChoiceQuestionResult } from "@/lib/types";
import React from "react";
import { convert } from "html-to-text";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Form, FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type MultiChoiceQuestionResultsProps = {
  questionResult: MultipleChoiceQuestionResult;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const percentData = [
  {
    name: "January",
    percent: 100,
  },
  {
    name: "February",
    percent: 75,
  },
  {
    name: "Maewrch",
    percent: 50,
  },
  {
    name: "March",
    percent: 0,
  },
];

const MultiChoiceQuestionResults = ({
  questionResult,
}: MultiChoiceQuestionResultsProps) => {
  const form = useForm({
    // resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      showChart: true,
      showTable: false,
    },
  });

  const showChart = form.watch("showChart");
  const showTable = form.watch("showTable");

  const choices = questionResult.choices.map((choice) => {
    const percenteges = (
      (choice.answeredCount / questionResult.answeredCount) *
      100
    ).toFixed(2);
    return {
      ...choice,
      percenteges,
    };
  });

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
      <div className="flex items-start gap-3">
        <span className="font-bold text-xl">Q{questionResult.number}</span>
        <h4 className="flex-1 text-xl">
          {convert(questionResult.description)}
        </h4>
      </div>
      <div className="flex gap-3 mt-5 text-slate-400">
        <span>Answered: {questionResult.answeredCount}</span>
        <span>Skipped: {questionResult.skippedCount}</span>
      </div>
      <div className="mt-10 flex gap-3">
        <FormProvider {...form}>
          <Form {...form}>
            <form
              //  onSubmit={form.handleSubmit(handleSubmit)}
              className="flex gap-3"
            >
              <FormField
                control={form.control}
                name={"showChart"}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Chart</FormLabel>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={"showTable"}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Data table</FormLabel>
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </FormProvider>
      </div>
      {showChart && (
        <div className="mt-10 flex gap-10">
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
          <BarChart
            width={500}
            height={300}
            data={choices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              //   type="number"
              //   domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tick={CustomYAxisTick}
              //   label={CustomYAxisLabel}

              interval={0}
              minTickGap={1}
            />
            <Tooltip />
            <Bar
              dataKey="percenteges"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
      )}
    </div>
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

export default MultiChoiceQuestionResults;
