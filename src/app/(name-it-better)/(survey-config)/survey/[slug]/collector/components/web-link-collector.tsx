"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { Collector } from "@/lib/types";
import { Link, LinkIcon } from "lucide-react";
import React from "react";

type WebLinkCollectorProps = {
  collector: Collector;
};

const WebLinkCollector = ({ collector }: WebLinkCollectorProps) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();
  const collectorWebLink = `http://localhost:3000/s/${collector.id}`;

  const handleCopyCollectorWebLink = () => {
    copyToClipboard(collectorWebLink);
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
      <div className="p-5 bg-white flex items-center gap-2">
        <LinkIcon />
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

export default WebLinkCollector;
