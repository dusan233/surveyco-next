import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import React from "react";

type LoginErrorProps = {
  message?: string;
};

const LoginError = ({ message }: LoginErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="h-4 w-4" />

      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default LoginError;
