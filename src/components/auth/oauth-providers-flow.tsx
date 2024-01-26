"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";
import OauthProviderButton from "./oauth-provider-button";
import { useToast } from "../ui/use-toast";
import Spinner from "../ui/spinner";

type OauthProvidersFlowProps = {
  login?: boolean;
};

const OauthProvidersFlow = ({ login = false }: OauthProvidersFlowProps) => {
  const { signIn, isLoaded } = useSignIn();
  const { toast } = useToast();

  const signinWithProvicer = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  };

  if (!isLoaded) {
    return <Spinner size="md" />;
  }

  return (
    <div className="flex flex-col gap-2">
      <OauthProviderButton
        provider="google"
        onClick={() => signinWithProvicer("oauth_google")}
      >
        {login ? "Login" : "Sign up"} with Google
      </OauthProviderButton>
      <OauthProviderButton
        provider="facebook"
        onClick={() => signinWithProvicer("oauth_facebook")}
      >
        {login ? "Login" : "Sign up"} with Facebook
      </OauthProviderButton>
    </div>
  );
};

export default OauthProvidersFlow;
