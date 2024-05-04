"use client"; // Error components must be Client Components

import AppLogo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="p-4 sm:p-10  bg-white sm:bg-accent min-h-screen">
      <div className="flex justify-center sm:justify-start mb-5 sm:mb-10">
        <AppLogo />
      </div>
      <div className="mx-auto space-y-4 max-w-sm text-center">
        <h1 className="text-2xl font-medium">Internal Server Error</h1>
        <p className="text-lg">
          Sorry, we had some tehnical problems during your last operation.
          Please try again in a bit.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            reset();
          }}
        >
          Reload page
        </Button>
      </div>
    </div>
  );
}
