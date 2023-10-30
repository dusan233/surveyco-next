"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";

const SigninOauth = () => {
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
      console.log("dudu ");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => signinWithProvicer("oauth_google")}
        className="block w-full"
        variant="outline"
      >
        Sign up with Google
      </Button>
      <Button
        onClick={() => signinWithProvicer("oauth_facebook")}
        className="block w-full"
        variant="outline"
      >
        Sign up with Facebook
      </Button>
    </div>
  );
};

export default SigninOauth;
