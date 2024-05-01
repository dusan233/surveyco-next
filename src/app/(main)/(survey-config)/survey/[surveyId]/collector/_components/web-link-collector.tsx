"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Collector } from "@/types/collector";
import { Link, LinkIcon } from "lucide-react";
import React from "react";

type CopyWebLinkProps = {
  collector: Collector;
};

const CopyWebLink = ({ collector }: CopyWebLinkProps) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();
  const collectorWebLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/s/${collector.id}`;

  const handleCopyCollectorWebLink = async () => {
    await copyToClipboard(collectorWebLink);
    toast({
      variant: "default",
      title: "Link copied to clipboard.",
      icon: <Link />,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-3 mt-10">
      <p>
        Copy and paste this URL to share your survey in an email, on a website,
        or on social media. This kind of collector is open by default and the
        link works until you close it.
      </p>
      <div className="p-5 bg-white flex flex-col sm:flex-row  gap-2">
        <LinkIcon className="hidden sm:block" />
        <div className="truncate ... flex-1  p-1.5">{collectorWebLink}</div>
        <Button
          onClick={handleCopyCollectorWebLink}
          size="sm"
          variant="outline"
        >
          Copy URL
        </Button>
      </div>
    </div>
  );
};

export default CopyWebLink;
