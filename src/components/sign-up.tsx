"use client";

import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import SignUpForm from "./signup-form";
import SigninOauth from "./signin-oauth";

const SignUp = () => {
  return (
    <Card className="max-w-sm w-full p-5">
      <h1 className="text-2xl text-center mb-3 font-semibold tracking-tight">
        Sign up
      </h1>

      <div className="flex flex-col gap-2">
        <SignUpForm />
      </div>
      <div className="relative my-4">
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
      <p className="px-8 mt-5 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </Card>
  );
};

export default SignUp;
