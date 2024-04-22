"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import useSurveyPages from "@/hooks/useSurveyPages";
import React from "react";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useMoveSurveyPage from "../_hooks/useMoveSurveyPage";
import { PlacePageData, OperationPosition } from "@/lib/types";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import {
  Form,
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
import { useToast } from "@/components/ui/use-toast";
import usePlacePageForm from "../_hooks/usePlacePageForm";
import { useQueryClient } from "@tanstack/react-query";

type MoveSurveyPageFormProps = {
  surveyId: string;
  onMovePage: () => void;
};

const MoveSurveyPageForm = ({
  surveyId,
  onMovePage,
}: MoveSurveyPageFormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { surveyPages } = useSurveyPages(surveyId);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { movePageMutation, isPending } = useMoveSurveyPage();
  const form = usePlacePageForm({
    pageId: surveyPages!.find((page) => page.number === 1)?.id ?? "",
    position: OperationPosition.after,
  });

  useLoadingToast(isPending);

  const handleSubmit = (values: PlacePageData) => {
    movePageMutation(
      {
        surveyId,
        sourcePageId: currentPage!.id,
        data: { position: values.position, pageId: values.pageId },
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({
            queryKey: ["survey", surveyId, "questions", data.id],
          });
          onMovePage();
        },
        onError() {
          toast({
            title: "Something went wrong!",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="gap-2 mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-end gap-2"
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="min-w-[100px]">
                <FormLabel>Position</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
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
                    {surveyPages?.map((page, index) => {
                      return (
                        <SelectItem key={page.id} value={page.id}>
                          {index + 1}.
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="mt-10">
        <Button onClick={() => onMovePage()} size="sm">
          Cancel
        </Button>
        <Button
          disabled={isPending}
          loading={isPending}
          variant="secondary"
          onClick={form.handleSubmit(handleSubmit)}
          size="sm"
        >
          Move page
        </Button>
      </DialogFooter>
    </div>
  );
};

export default MoveSurveyPageForm;
