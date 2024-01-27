import VerifyEmailForm from "./components/verify-email-form";

import React from "react";

const EmailVerificationPage = async () => {
  return (
    <div className="flex  flex-col items-center justify-center">
      <VerifyEmailForm />
    </div>
  );
};

export default EmailVerificationPage;
