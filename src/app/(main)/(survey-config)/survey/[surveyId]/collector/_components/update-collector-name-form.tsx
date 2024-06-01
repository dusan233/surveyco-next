"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Collector, UpdateCollectorData } from "@/types/collector";
import useUpdateCollector from "../_hooks/useUpdateCollector";
import { useForm } from "react-hook-form";
import { updateCollectorNameSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

type UpdateCollectorNameFormProps = {
  collector: Collector;
};

const UpdateCollectorNameForm = ({
  collector,
}: UpdateCollectorNameFormProps) => {
  const { isPending, updateCollectorMutationAsync } = useUpdateCollector();
  const { toast } = useToast();
  const form = useForm<UpdateCollectorData>({
    resolver: zodResolver(updateCollectorNameSchema),
    defaultValues: {
      name: collector.name,
    },
  });

  const handleUpdateCollectorName = async (values: UpdateCollectorData) => {
    try {
      await updateCollectorMutationAsync({
        collectorId: collector.id,
        name: values.name,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-3 items-start max-w-md"
        onSubmit={form.handleSubmit(handleUpdateCollectorName)}
      >
        <div className="w-full space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>{"Collector's name"}</Label>
                <FormControl>
                  <Input
                    state={form.formState.errors.name && "error"}
                    {...field}
                    placeholder="Collector's name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Save {isPending && <Spinner size="xs" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateCollectorNameForm;
