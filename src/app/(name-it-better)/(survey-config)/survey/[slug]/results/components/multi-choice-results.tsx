"use client";

import { MultipleChoiceQuestionResult, QuestionType } from "@/lib/types";
import React from "react";
import { convert } from "html-to-text";
import { Checkbox } from "@/components/ui/checkbox";

import { Form, FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BarChartResults from "./bar-chart-results";
import MultiChoiceResultsTable from "./multi-choice-results-table";
import { getQuestionChartTypes, getQuestionTypeLable } from "@/lib/utils";
import PieChartResults from "./pie-chart-results";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MultiChoiceQuestionResultsProps = {
  questionResult: MultipleChoiceQuestionResult;
};

const MultiChoiceQuestionResults = ({
  questionResult,
}: MultiChoiceQuestionResultsProps) => {
  const form = useForm({
    // resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      showChart: true,
      showTable: false,
      chartType: "bar",
    },
  });

  const showChart = form.watch("showChart");
  const showTable = form.watch("showTable");
  const chartType = form.watch("chartType");

  const resultsDataa = questionResult.choices.map((choice) => {
    const percenteges =
      questionResult.answeredCount === 0
        ? 0
        : parseFloat(
            (
              (choice.answeredCount / questionResult.answeredCount) *
              100
            ).toFixed(2)
          );
    return {
      ...choice,
      description: convert(choice.description),
      percenteges,
    };
  });

  const resultsData = [...resultsDataa];

  return (
    <div className="p-5 shadow-sm rounded-lg bg-white">
      <div className="flex items-start gap-3">
        <span className="font-bold text-xl">Q{questionResult.number}</span>
        <h4 className="flex-1 text-xl">
          {convert(questionResult.description)}
        </h4>
      </div>
      <div className="flex gap-6 mt-5 text-gray-500">
        <span className="text-black">
          Type: {getQuestionTypeLable(questionResult.type)}
        </span>
        <div className="flex gap-3">
          <span>Answered: {questionResult.answeredCount}</span>
          <span>Skipped: {questionResult.skippedCount}</span>
        </div>
      </div>
      {questionResult.answeredCount !== 0 ? (
        <>
          <div className="mt-10 flex gap-3">
            <FormProvider {...form}>
              <Form className="w-full" {...form}>
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
                          <FormLabel className="font-normal">
                            Data table
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={"chartType"}
                      render={({ field }) => (
                        <FormItem className="max-w-[200px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select chart type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getQuestionChartTypes(questionResult.type).map(
                                (option, index) => (
                                  <SelectItem key={index} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </FormProvider>
          </div>

          {(showChart || showTable) && (
            <div className="flex mt-10 gap-10 justify-center flex-wrap items-start">
              {showChart &&
                (chartType === "pie" ? (
                  <PieChartResults data={resultsData} />
                ) : (
                  <BarChartResults data={resultsData} />
                ))}

              {showTable && (
                <div className="flex-1">
                  <MultiChoiceResultsTable data={resultsData} />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 text-center">
          <p>No matching responses .</p>
        </div>
      )}
    </div>
  );
};

export default MultiChoiceQuestionResults;
