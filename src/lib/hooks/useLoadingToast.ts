import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";

export function useLoadingToast(isLoading: boolean) {
  const { toast } = useToast();
  const toastRef = useRef<{ id: string; dismiss: () => void; update: any }>();

  useEffect(() => {
    if (isLoading) {
      const loadingToast = toast({
        variant: "destructive",
        title: "Loading page...",
      });
      toastRef.current = loadingToast;
    } else {
      toastRef.current?.dismiss();
    }
  }, [isLoading, toast]);
}
