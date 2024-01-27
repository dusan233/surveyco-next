"use client";

import Spinner from "@/components/ui/spinner";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

const SSOCallbackPage = () => {
  return (
    <div className="flex justify-center items-center">
      <AuthenticateWithRedirectCallback />
      <Spinner size="lg" />
    </div>
  );
};

export default SSOCallbackPage;
