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
import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";

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
  const { surveyPages } = useSurveyPages(surveyId);

  const form = useForm({
    defaultValues: {
      pageId: surveyPages!.find((page) => page.number === 1)!.id,
      position: OperationPosition.after,
      questionId: "",
    },
  });

  const selectedPageId = form.watch("pageId");
  const selectedPageNumber = surveyPages!.find(
    (page) => page.id === selectedPageId
  )!.number;
  const { questions, isLoading } = useSurveyQuestions(
    surveyId,
    selectedPageNumber
  );

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
                name="pageId"
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
                            <SelectItem key={page.id} value={page.id}>
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
              {!isLoading && questions!.length > 0 && (
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
                    name="questionId"
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
                            {questions!.map((q) => {
                              return (
                                <SelectItem key={q.id} value={q.id}>
                                  {q.number}.
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
