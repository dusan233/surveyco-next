"use client";

import { MultipleChoiceQuestionResult } from "@/lib/types";
import React from "react";
import { convert } from "html-to-text";
import { Checkbox } from "@/components/ui/checkbox";

import { Form, FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import BarChartResults from "./bar-chart-results";
import MultiChoiceResultsTable from "./multi-choice-results-table";

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
    },
  });

  const showChart = form.watch("showChart");
  const showTable = form.watch("showTable");

  const resultsData = questionResult.choices.map((choice) => {
    const percenteges =
      questionResult.answeredCount === 0
        ? "0"
        : ((choice.answeredCount / questionResult.answeredCount) * 100).toFixed(
            2
          );
    return {
      ...choice,
      description: convert(choice.description),
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

      <div className="mt-10 flex gap-10 justify-center flex-wrap items-start">
        {showChart && <BarChartResults data={resultsData} />}

        {showTable && (
          <div className="flex-1">
            <MultiChoiceResultsTable data={resultsData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiChoiceQuestionResults;
