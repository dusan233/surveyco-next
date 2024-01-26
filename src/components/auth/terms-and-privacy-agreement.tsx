import Link from "next/link";
import React from "react";

const TermsEndPrivacyAgreement = () => {
  return (
    <p className="px-8 mt-5 text-center text-sm text-muted-foreground">
      By continuing, you agree to our{" "}
      <Link
        href="/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};

export default TermsEndPrivacyAgreement;
