import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export const toastError = (title?: string) => {
  return toast({
    duration: 5000,
    variant: "destructive",
    title: title ?? "Something went wrong!",
    icon: <AlertCircle className="text-desctructive" />,
  });
};
