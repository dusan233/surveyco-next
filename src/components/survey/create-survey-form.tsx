"use client";

import { CreateSurveyData } from "@/lib/types";
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
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createSurvey } from "@/actions/survey-actions";
import { SURVEY_CATEGORIES } from "@/lib/constants";

type CreateSurveyFormProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSurveyForm = ({ onCreate }: CreateSurveyFormProps) => {
  const { push } = useRouter();
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const form = useForm<CreateSurveyData>({
    resolver: zodResolver(createSurveySchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = async (values: CreateSurveyData) => {
    try {
      setPending(true);
      const newSurvey = await createSurvey(values);
      push(`/survey/${newSurvey.id}/build`);

      onCreate(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    } finally {
      setPending(false);
    }
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
                    {SURVEY_CATEGORIES.map((category) => (
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
          <Button loading={pending} disabled={pending} type="submit">
            Create survey
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSurveyForm;
