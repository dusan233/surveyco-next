"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

const SSOCallback = () => {
  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
