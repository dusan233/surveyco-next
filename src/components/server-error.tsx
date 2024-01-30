"use client";

import React from "react";
import { Button } from "./ui/button";

const ServerError = () => {
  return (
    <div className="mx-auto space-y-4 max-w-sm text-center">
      <h1 className="text-2xl font-medium">Internal Server Error</h1>
      <p className="text-lg">
        Sorry, we had some tehnical problems during your last operation. Please
        try again in a bit.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload page
      </Button>
    </div>
  );
};

export default ServerError;
