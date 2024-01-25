"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import useLoginForm from "./useLoginForm";
import { LoginData } from "@/lib/types";

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const form = useLoginForm();

  async function onSubmit(values: LoginData) {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log("signin successfully done!");
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="block w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
