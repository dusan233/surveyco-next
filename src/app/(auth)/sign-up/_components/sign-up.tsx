"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./signup-form";
import SigninOauth from "@/components/auth/oauth-providers-flow";
import TermsEndPrivacyAgreement from "@/components/auth/terms-and-privacy-agreement";
import { useSignUp } from "@clerk/nextjs";
import Spinner from "@/components/ui/spinner";

const SignUp = () => {
  const { isLoaded } = useSignUp();

  if (!isLoaded)
    return (
      <Card className="max-w-md border-none sm:border shadow-none flex justify-center items-center h-96 w-full p-10 sm:drop-shadow-sm">
        <Spinner size="xl" />
      </Card>
    );

  return (
    <Card className="max-w-md border-none sm:border shadow-none w-full px-5 sm:px-10 pt-5 pb-3 sm:pb-10 sm:drop-shadow-sm">
      <div className="flex justify-end gap-1 text-sm mb-5">
        {`Already have an account?`}
        <Link className="text-blue-800 hover:underline" href="/login">
          Log in
        </Link>
      </div>
      <h1 className="text-3xl text-left mb-3 font-medium tracking-tight">
        Create an account
      </h1>

      <div className="flex flex-col gap-2">
        <SignUpForm />
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SigninOauth />
      <TermsEndPrivacyAgreement />
    </Card>
  );
};

export default SignUp;
