import VerifyEmailForm from "@/components/verify-email-form";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const EmailVerificationPage = async () => {
  //using this so user can see emailAddress instantly.
  const user = await currentUser();

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col items-center justify-center sm:p-24 p-3">
      <VerifyEmailForm userEmail={user?.emailAddresses[0].emailAddress} />
    </div>
  );
};

export default EmailVerificationPage;
