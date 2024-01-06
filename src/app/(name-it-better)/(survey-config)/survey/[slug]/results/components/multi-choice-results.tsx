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
import { getQuestionTypeLable } from "@/lib/utils";

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

  const resultsDataa = questionResult.choices.map((choice) => {
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

  const resultsData = [
    ...resultsDataa,
    // { answeredCount: 5, description: "dwq", percenteges: "50", id: "124fas" },
    // {
    //   answeredCount: 5,
    //   description: "dwq12",
    //   percenteges: "65",
    //   id: "dwq124fas",
    // },
    // {
    //   answeredCount: 5,
    //   description: "dwqdas",
    //   percenteges: "89",
    //   id: "12fgag4fas",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "70",
    //   id: "12fgag4fagggs",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "75",
    //   id: "12fgag4fagggqqwe2s",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "40",
    //   id: "12fgag4fagggsff",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "30",
    //   id: "12fgag4fagggdqws",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "25",
    //   id: "111111132444",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "92",
    //   id: "11111113244405",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "27",
    //   id: "11111113244400",
    // },
    // {
    //   answeredCount: 5,
    //   description: "no",
    //   percenteges: "98",
    //   id: "111111132444055",
    // },
    // {
    //   answeredCount: 0,
    //   description: "no",
    //   percenteges: "0",
    //   id: "111111132444001",
    // },
    // {
    //   answeredCount: 0,
    //   description: "no",
    //   percenteges: "0",
    //   id: "1111111324440551",
    // },
    // {
    //   answeredCount: 0,
    //   description: "no",
    //   percenteges: "43",
    //   id: "111111132444001qw",
    // },
    // {
    //   answeredCount: 0,
    //   description: "no",
    //   percenteges: "56",
    //   id: "1111111324440551pp",
    // },
  ];

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

      {(showChart || showTable) && (
        <div className="flex mt-10 gap-10 justify-center flex-wrap items-start">
          {showChart &&
            (questionResult.answeredCount !== 0 ? (
              <BarChartResults data={resultsData} />
            ) : (
              <p>No matching responses.</p>
            ))}

          {showTable && (
            <div className="flex-1">
              <MultiChoiceResultsTable data={resultsData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiChoiceQuestionResults;
