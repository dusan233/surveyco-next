"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Save {pending && <Spinner size="xs" />}
    </Button>
  );
};

export default SubmitButton;
