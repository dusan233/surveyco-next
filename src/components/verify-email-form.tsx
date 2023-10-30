"use client";

import * as z from "zod";
import { useUser } from "@clerk/nextjs";
import React, { useCallback, useEffect } from "react";
import { Card } from "./ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const verifyAccountSchema = z.object({
  code: z
    .string()
    .length(
      6,
      "Please enter the 6-digit number that was sent to your email address."
    ),
});

const VerifyEmailForm = ({ userEmail }: { userEmail?: string }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof verifyAccountSchema>>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyAccountSchema>) => {
    console.log("verify account!", values);
    try {
      if (isLoaded) {
        await user?.emailAddresses[0].attemptVerification({
          code: values.code,
        });
        console.log("uspesno verified");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendVerificationCode = useCallback(
    async (resend: boolean = false) => {
      try {
        const allowSendVerification = resend
          ? true
          : !user?.emailAddresses[0].verification.expireAt;
        if (isLoaded && allowSendVerification) {
          await user?.emailAddresses[0].prepareVerification({
            strategy: "email_code",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [isLoaded, user?.emailAddresses]
  );

  useEffect(() => {
    sendVerificationCode();
  }, [sendVerificationCode]);

  return (
    <Card className="max-w-md w-full p-5">
      {JSON.stringify(user?.emailAddresses[0].verification, null, 2)}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-2xl  mb-3 font-semibold tracking-tight">
            Enter confirmation code
          </h1>

          <div className="space-y-4">
            <div>
              <p>To verify your account, enter the 6-digit code we sent to:</p>
              <p className="font-bold">{userEmail}</p>
            </div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="6-digit code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              onClick={() => {
                console.log("resend code");
                sendVerificationCode(true);
              }}
              className="text-blue-600"
            >
              Resend verification code
            </button>
            <Button className="block w-full" type="submit">
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default VerifyEmailForm;
