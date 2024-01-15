"use client";

import { CreateSurveyData, SurveyCategory } from "@/lib/types";
import { createSurveySchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { createSurvey } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const surveyCategories = [
  {
    value: SurveyCategory.customer_feedback,
    label: "Customer feedback",
  },
  {
    value: SurveyCategory.event_feedback,
    label: "Event feedback",
  },
  {
    value: SurveyCategory.student_feedback,
    label: "Student feedback",
  },
  {
    value: SurveyCategory.academic_research,
    label: "Academic research",
  },
  {
    value: SurveyCategory.market_research,
    label: "General market research",
  },
];

type CreateSurveyFormProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSurveyForm = ({ onCreate }: CreateSurveyFormProps) => {
  const { push } = useRouter();
  const [pending, setPending] = useState(false);
  const form = useForm<CreateSurveyData>({
    resolver: zodResolver(createSurveySchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const handleSubmit = async (values: CreateSurveyData) => {
    setPending(true);

    const newSurvey = await createSurvey(values);
    push(`/survey/${newSurvey.id}/build`);

    onCreate(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <Label>Survey title</Label>
                <FormControl>
                  <Input
                    state={form.formState.errors.title && "error"}
                    {...field}
                    placeholder="Survey title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"category"}
            render={({ field }) => (
              <FormItem>
                <Label>Survey category</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {surveyCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={pending} type="submit">
            Create survey
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSurveyForm;
