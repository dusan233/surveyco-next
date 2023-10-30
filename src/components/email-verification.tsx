import { useSignUp } from "@clerk/nextjs";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const EmailVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return (
    <Card className="max-w-sm w-full p-5 text-center separate-y-3">
      <h1>Enter verification code</h1>
      <p>{"We'we sent code to your email address."}</p>
      <Button className="block w-full">Verify</Button>
    </Card>
  );
};

export default EmailVerification;
