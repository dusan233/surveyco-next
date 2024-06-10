"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import usePlacePageForm from "../_hooks/usePlacePageForm";
import { OperationPosition } from "@/types/common";
import { PlacePageData, SurveyPage } from "@/types/survey";
import Spinner from "@/components/ui/spinner";

type PlaceSurveyPageFormProps = {
  onPlacePage: (values: PlacePageData) => Promise<SurveyPage | undefined>;
  isPending: boolean;
  surveyPages: SurveyPage[];
  type?: "copy" | "move";
  onCancel?: () => void;
};

const PlaceSurveyPageForm = ({
  onPlacePage,
  isPending,
  surveyPages,
  onCancel,
  type = "copy",
}: PlaceSurveyPageFormProps) => {
  const form = usePlacePageForm({
    pageId: surveyPages.find((page) => page.number === 1)?.id ?? "",
    position: OperationPosition.after,
  });

  const handleSubmit = async (values: PlacePageData) => {
    await onPlacePage(values);
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
        <Button onClick={() => onCancel && onCancel()} size="sm">
          Cancel
        </Button>
        <Button
          disabled={isPending}
          variant="secondary"
          onClick={form.handleSubmit(handleSubmit)}
          size="sm"
        >
          {type === "copy" ? "Copy" : "Move"} page{" "}
          {isPending && <Spinner size="xs" />}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default PlaceSurveyPageForm;
