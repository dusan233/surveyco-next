"use client";

import React from "react";
import { Card } from "../../../../components/ui/card";

import LoginForm from "./login-form";
import TermsEndPrivacyAgreement from "@/components/auth/terms-and-privacy-agreement";
import OauthProvidersFlow from "../../../../components/auth/oauth-providers-flow";
import { useSignIn } from "@clerk/nextjs";
import Spinner from "@/components/ui/spinner";

const Login = () => {
  const { isLoaded } = useSignIn();

  if (!isLoaded)
    return (
      <Card className="max-w-md flex justify-center items-center h-96 w-full p-10 drop-shadow-sm">
        <Spinner size="xl" />
      </Card>
    );

  return (
    <Card className="max-w-md w-full p-10 drop-shadow-sm">
      <h1 className="text-3xl text-center mb-3 font-medium tracking-tight">
        Log in
      </h1>
      <LoginForm />
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or login with
          </span>
        </div>
      </div>
      <OauthProvidersFlow login />
      <TermsEndPrivacyAgreement />
    </Card>
  );
};

export default Login;
