"use client";

import React, { useState } from "react";
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
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import useLoginForm from "./useLoginForm";
import { LoginData } from "@/lib/types";
import LoginError from "./login-error";
import Spinner from "@/components/ui/spinner";

const getLoginErrorMessage = (err: any) => {
  if (isClerkAPIResponseError(err)) {
    const error = err.errors[0];
    let errorMsg = "";
    if (err.status === 500) {
      errorMsg = "Something went wrong! Please try again.";
    } else if (err.status === 429) {
      errorMsg =
        "Sorry, too many incorrect login attempts. For security reasons, please wait 1h before trying again.";
    } else if (err.status === 422) {
      errorMsg =
        "Your login info is invalid. Please try again with correct credentials.";
    }
    return errorMsg;
  } else {
    return "Something went wrong! Please try again.";
  }
};

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const form = useLoginForm();

  async function handleSubmit(values: LoginData) {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log("signin successfully done!");
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      const errorMsg = getLoginErrorMessage(err);
      form.setError("root", { message: errorMsg });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {form.formState.errors.root && (
          <LoginError message={form.formState.errors.root.message} />
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
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
          type="submit"
          size="sm"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
