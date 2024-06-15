"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";
import OauthProviderButton from "./oauth-provider-button";
import Spinner from "../ui/spinner";
import { toastError } from "@/lib/util/toastError";

type OauthProvidersFlowProps = {
  login?: boolean;
  direction?: "col" | "row";
};

const OauthProvidersFlow = ({
  login = false,
  direction = "row",
}: OauthProvidersFlowProps) => {
  const { signIn, isLoaded } = useSignIn();

  const signinWithProvicer = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      toastError("Something went wrong!");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      }}
      className={` ${
        direction === "row" ? "grid gap-2" : "flex gap-2 flex-col"
      }`}
    >
      <OauthProviderButton
        direction={direction}
        provider="google"
        onClick={() => signinWithProvicer("oauth_google")}
      >
        {login ? "Log in with Google" : "Google"}
      </OauthProviderButton>
      <OauthProviderButton
        direction={direction}
        provider="facebook"
        onClick={() => signinWithProvicer("oauth_facebook")}
      >
        {login ? "Log in with Facebook" : "Facebook"}
      </OauthProviderButton>
      <OauthProviderButton
        direction={direction}
        provider="microsoft"
        onClick={() => signinWithProvicer("oauth_microsoft")}
      >
        {login ? "Log in with Microsoft" : "Microsoft"}
      </OauthProviderButton>
    </div>
  );
};

export default OauthProvidersFlow;
