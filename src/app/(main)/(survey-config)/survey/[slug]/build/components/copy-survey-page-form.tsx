"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useCopySurveyPage from "../hooks/useCopySurveyPage";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { PlacePageData, OperationPosition } from "@/lib/types";
import React from "react";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import usePlacePageForm from "../hooks/usePlacePageForm";

type CopySurveyPageFormProps = {
  surveyId: string;
  onCopyPage: () => void;
};

const CopySurveyPageForm = ({
  surveyId,
  onCopyPage,
}: CopySurveyPageFormProps) => {
  const { toast } = useToast();
  const { surveyPages } = useSurveyPages(surveyId);
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const form = usePlacePageForm({
    pageId: surveyPages!.find((page) => page.number === 1)?.id ?? "",
    position: OperationPosition.after,
  });
  const { copyPageMutation, isPending } = useCopySurveyPage();

  const handleSubmit = (values: PlacePageData) => {
    copyPageMutation(
      {
        surveyId,
        sourcePageId: currentPage!.id,
        data: { position: values.position, pageId: values.pageId },
      },
      {
        onSuccess(data) {
          setCurrentPage(data);
          onCopyPage();
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

  useLoadingToast(isPending);

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
        <Button onClick={() => onCopyPage()} size="sm">
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={form.handleSubmit(handleSubmit)}
          size="sm"
        >
          Copy page
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CopySurveyPageForm;
