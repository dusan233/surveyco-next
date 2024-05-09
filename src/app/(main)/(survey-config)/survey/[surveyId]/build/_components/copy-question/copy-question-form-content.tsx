import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OperationPosition } from "@/types/common";
import { Question } from "@/types/question";
import { SurveyPage } from "@/types/survey";
import React from "react";
import { useFormContext } from "react-hook-form";

type CopyQuestionFormContentProps = {
  surveyPages: SurveyPage[];
  questions?: Question[];
  isLoading: boolean;
};

const CopyQuestionFormContent = ({
  surveyPages,
  questions,
  isLoading,
}: CopyQuestionFormContentProps) => {
  const form = useFormContext();
  return (
    <>
      <FormField
        control={form.control}
        name="pageId"
        render={({ field }) => (
          <FormItem className="min-w-[70px]">
            <FormLabel>Page</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {surveyPages?.map((page) => {
                  return (
                    <SelectItem key={page.id} value={page.id}>
                      {page.number}.
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem className="min-w-[100px]">
            <FormLabel>Position</FormLabel>

            <Select
              disabled={isLoading}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={OperationPosition.after}>After</SelectItem>
                <SelectItem value={OperationPosition.before}>Before</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="questionId"
        render={({ field }) => {
          return (
            <FormItem className="max-w-[300px]">
              <FormLabel>Question</FormLabel>

              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {questions?.map((q) => {
                    return (
                      <SelectItem key={q.id} value={q.id}>
                        {q.number}.
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          );
        }}
      />
    </>
  );
};

export default CopyQuestionFormContent;
