"use client";

import React, { useEffect } from "react";
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
import { CopyQuestionData, OperationPosition } from "@/lib/types";
import useDownsizedQuestions from "@/lib/hooks/useDownsizedQuestions";
import { Skeleton } from "../ui/skeleton";
import { z } from "zod";
import { placeQuestionSchema } from "@/lib/validationSchemas";
import useCopyQuestion from "@/lib/hooks/useCopyQuestion";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import { zodResolver } from "@hookform/resolvers/zod";

type CopyQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  surveyId: string;
  questionId: string;
};

const CopyQuestionDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  questionId,
}: CopyQuestionDialogProps) => {
  const { surveyPages } = useSurveyPages(surveyId);
  const { copyQuestionMutation, isPending } = useCopyQuestion();
  const form = useForm<z.infer<typeof placeQuestionSchema>>({
    resolver: zodResolver(placeQuestionSchema),
    defaultValues: {
      pageId: surveyPages!.find((page) => page.number === 1)!.id,
      position: OperationPosition.before,
      questionId: "",
    },
  });

  const selectedPageId = form.watch("pageId");
  const selectedPageNumber = surveyPages!.find(
    (page) => page.id === selectedPageId
  )!.number;
  const { questions, isLoading } = useDownsizedQuestions(
    surveyId,
    selectedPageNumber
  );

  useEffect(() => {
    const currentPageId = form.getValues().pageId;
    const questionId = questions ? (questions[0] ? questions[0].id : "") : "";
    const position = OperationPosition.after;
    // console.log("pitanjca brteau");
    form.reset({ pageId: currentPageId, position, questionId });
    // console.log("ovo treba da setujem sad", questionId);
    // form.setValue("questionId", questionId);
    // form.setValue("position", position);
  }, [questions, form]);

  useLoadingToast(isPending);

  const onSubmit = async (values: CopyQuestionData) => {
    console.log(values);
    // copyQuestionMutation({ surveyId, questionId, data: values });
  };
  //dasdasd
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Copy Question</DialogTitle>
          <DialogDescription>
            Copy this question and put it on ...
          </DialogDescription>
        </DialogHeader>
        <div className="gap-2  mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-end gap-2"
            >
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
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[100px]" />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                        <FormLabel>Position</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
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
                    render={({ field }) => {
                      console.log(field.value, "ta famozna vrednost");
                      return (
                        <FormItem className="max-w-[300px]">
                          <FormLabel>Question</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                onChange={(e) => {
                                  console.log(e);
                                }}
                              >
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
                      );
                    }}
                  />
                </>
              )}
            </form>
          </Form>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} size="sm">
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} size="sm">
              Copy question
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CopyQuestionDialog;
