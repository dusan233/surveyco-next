import { useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { Link, Settings } from "lucide-react";
import React from "react";

type CopyCollectorWebLinkProps = {
  collectorId: string;
};

const CopyCollectorWebLink = ({ collectorId }: CopyCollectorWebLinkProps) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();

  const collectorWebLink = `http://localhost:3000/s/${collectorId}`;

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
    <div className="flex justify-between gap-2 text-xs bg-slate-100">
      <div className="truncate ... flex-1  p-1.5">{collectorWebLink}</div>
      <button
        onClick={handleCopyCollectorWebLink}
        className="text-white p-1.5 bg-blue-950"
      >
        Copy URL
      </button>
    </div>
  );
};

export default CopyCollectorWebLink;
