"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type NoResponsesProps = {
  surveyId: string;
};

const NoResponses = ({ surveyId }: NoResponsesProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 ">
      <AlertTriangleIcon className="h-12 w-12" />
      <p className="text-xl font-medium">Your survey has no responses</p>

      <Button size="default" asChild>
        <Link href={`/survey/${surveyId}/collectors`}>Collect responses</Link>
      </Button>
    </div>
  );
};

export default NoResponses;
