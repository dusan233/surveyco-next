"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { OperationPosition } from "@/lib/types";

type CopyQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  surveyId: string;
};

const CopyQuestionDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
}: CopyQuestionDialogProps) => {
  const form = useForm({
    defaultValues: {
      page: "1",
      position: OperationPosition.after,
      questionNumber: "1",
    },
  });

  const { surveyPages } = useSurveyPages(surveyId);
  const selectedPageNumber = Number(form.watch("page"));
  const currentPageTotalQuestions = surveyPages?.find(
    (page) => page.number === selectedPageNumber
  )?.totalQuestions;

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Question</DialogTitle>
          <DialogDescription>
            Copy this question and put it on ...
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mb-8 mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="page"
                render={({ field }) => (
                  <FormItem className="min-w-[70px]">
                    <FormLabel>Page</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {surveyPages?.map((page) => {
                          return (
                            <SelectItem
                              key={page.id}
                              value={page.number.toString()}
                            >
                              {page.number}.
                            </SelectItem>
                          );
                        })}
                        <SelectItem value={"52"}>532.</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {currentPageTotalQuestions! > 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                        <FormLabel>Position</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={OperationPosition.after}>
                              After
                            </SelectItem>
                            <SelectItem value={OperationPosition.before}>
                              Before
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="questionNumber"
                    render={({ field }) => (
                      <FormItem className="max-w-[300px]">
                        <FormLabel>Question</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from(
                              { length: currentPageTotalQuestions! },
                              (_, index) => index + 1
                            ).map((q) => {
                              return (
                                <SelectItem key={q} value={q.toString()}>
                                  {q}.
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} size="sm">
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} size="sm">
            Copy question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyQuestionDialog;
