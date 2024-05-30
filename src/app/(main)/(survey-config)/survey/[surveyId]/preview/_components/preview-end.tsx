import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type PreviewEndProps = {
  surveyId: string;
  restartPreview: () => void;
};

const PreviewEnd = ({ surveyId, restartPreview }: PreviewEndProps) => {
  return (
    <div className="text-center flex flex-col gap-3 items-center">
      <h4 className="text-2xl">{"That's the end of the preview!"}</h4>
      <div className="flex gap-3">
        <Button onClick={() => restartPreview()} size="sm">
          Preview again
        </Button>

        <Button size="sm" asChild>
          <Link href={`/survey/${surveyId}/collectors`}>Collect responses</Link>
        </Button>
      </div>
    </div>
  );
};

export default PreviewEnd;
