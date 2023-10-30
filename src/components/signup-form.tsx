import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  firstName: z.string().min(1, "Please provide first name"),
  lastName: z.string().min(1, "Please provide last name"),
});

const SignUpForm = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  //   const { signIn, setActive } = useSignIn();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      if (result.status === "complete") {
        console.log("signup successfully done!");
        await setActive!({ session: result.createdSessionId });

        router.push("/email-verification");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
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
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="block w-full" type="submit">
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
