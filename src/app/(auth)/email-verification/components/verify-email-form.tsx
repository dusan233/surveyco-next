"use client";

import { isClerkAPIResponseError, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { verifyEmailAddressSchema } from "@/lib/validationSchemas";
import { VerifyEmailAddressData } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const getVerifyEmailErrorMsg = (err: any) => {
  let errorMsg = "";
  if (isClerkAPIResponseError(err)) {
    if (err.status === 422 && err.errors[0].code === "form_code_incorrect") {
      errorMsg = "Invalid code! Please provide valid verification code.";
    } else if (err.status === 400) {
      if (err.errors[0].code === "verification_expired") {
        errorMsg =
          "Verification code has expired. Please resend verification code and try again.";
      } else if (err.errors[0].code === "verification_failed") {
        errorMsg =
          "Too many failed attempts. Please resend verification code and try again.";
      }
    } else if (err.status === 500) {
      errorMsg = "Something went wrong! Please try again.";
    }
  } else {
    errorMsg = "Something went wrong! Please try again.";
  }

  return errorMsg;
};

const VerifyEmailForm = () => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const userEmail = user?.emailAddresses[0].emailAddress;

  const form = useForm<VerifyEmailAddressData>({
    resolver: zodResolver(verifyEmailAddressSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleAttemptEmailVerification = async (
    values: VerifyEmailAddressData
  ) => {
    try {
      setIsLoading(true);
      await user?.emailAddresses[0].attemptVerification({
        code: values.code,
      });

      router.push("/");
    } catch (err) {
      const errorMsg = getVerifyEmailErrorMsg(err);
      form.setError("root", { message: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendVerificationCode = async () => {
    try {
      await user?.emailAddresses[0].prepareVerification({
        strategy: "email_code",
      });
      toast({
        variant: "default",
        title: "Verification code successfully sent!",
      });
    } catch (err) {
      form.setError("root", {
        message: "Something went wrong! Please try again.",
      });
    }
  };

  if (!isLoaded) {
    return (
      <Card className="max-w-md h-96 flex justify-center items-center border-none sm:border shadow-none w-full px-5 sm:p-7 pt-5 pb-5  sm:drop-shadow-sm">
        <Spinner size="lg" />
      </Card>
    );
  }

  return (
    <Card className="max-w-md border-none sm:border shadow-none w-full px-5 sm:p-7 pt-5 pb-5  sm:drop-shadow-sm">
      {/* {JSON.stringify(user?.emailAddresses[0].verification, null, 2)} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAttemptEmailVerification)}>
          <h1 className="text-3xl mb-3 font-medium tracking-tight">
            Enter confirmation code
          </h1>
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-4 mt-3">
            <div>
              <p>To verify your account, enter the 6-digit code we sent to:</p>
              <p className="font-bold break-words" title={userEmail}>
                {userEmail}
              </p>
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
              onClick={handleResendVerificationCode}
              className="text-blue-700"
            >
              Resend verification code
            </button>
            <Button
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
              type="submit"
            >
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default VerifyEmailForm;
