import { Metadata } from "next";
import VerifyEmailForm from "./_components/verify-email-form";

export const metadata: Metadata = {
  title: "Surveyco - Email verification",
  description: "Page dedicated for account email verification.",
};

const EmailVerificationPage = async () => {
  return (
    <div className="flex  flex-col items-center justify-center">
      <VerifyEmailForm />
    </div>
  );
};

export default EmailVerificationPage;
