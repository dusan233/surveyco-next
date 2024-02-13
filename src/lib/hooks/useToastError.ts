import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function useToastError(isError: boolean) {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({ variant: "destructive", title: "Something went wrong!" });
    }
  }, [isError, toast]);
}
