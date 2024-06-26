"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import useLoginForm from "./useLoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { getAuthErrorMessage } from "@/lib/util/getAuthErrorMessage";
import { LoginData } from "@/types/auth";
import Spinner from "@/components/ui/spinner";

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const form = useLoginForm();

  async function handleSubmit(values: LoginData) {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      const errorMsg = getAuthErrorMessage(err);
      form.setError("root", { message: errorMsg });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  state={form.formState.errors.email && "error"}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  state={form.formState.errors.password && "error"}
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Log in {form.formState.isSubmitting && <Spinner size="xs" />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
