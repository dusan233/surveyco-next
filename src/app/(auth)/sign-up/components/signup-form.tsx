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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignUpData } from "@/lib/types";
import useSignUpForm from "./useSignUpForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { getAuthErrorMessage } from "@/lib/utils";

const SignUpForm = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const form = useSignUpForm();

  async function handleSubmit(values: SignUpData) {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      if (result.status === "complete") {
        await setActive!({
          session: result.createdSessionId,
          beforeEmit: async (s) => {
            await s?.user.emailAddresses[0].prepareVerification({
              strategy: "email_code",
            });
          },
        });

        router.push("/email-verification");
      }
    } catch (err) {
      const errorMsg = getAuthErrorMessage(err);
      form.setError("root", { message: errorMsg });
    } finally {
      setIsLoading(false);
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
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  state={form.formState.errors.firstName && "error"}
                  placeholder="First name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  state={form.formState.errors.lastName && "error"}
                  placeholder="Last name"
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
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
