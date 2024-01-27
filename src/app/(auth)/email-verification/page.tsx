import VerifyEmailForm from "@/app/(auth)/email-verification/components/verify-email-form";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const EmailVerificationPage = async () => {
  return (
    <div className="flex  flex-col items-center justify-center">
      <VerifyEmailForm />
    </div>
  );
};

export default EmailVerificationPage;
