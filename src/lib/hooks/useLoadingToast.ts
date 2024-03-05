import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";

export function useLoadingToast(isLoading: boolean, title?: string) {
  const { toast } = useToast();
  const toastRef = useRef<{ id: string; dismiss: () => void; update: any }>();

  useEffect(() => {
    if (isLoading) {
      console.log("toasterororo");
      const loadingToast = toast({
        variant: "default",
        title: title ?? "Loading...",
      });
      toastRef.current = loadingToast;
    } else {
      toastRef.current?.dismiss();
    }
  }, [isLoading, toast, title]);
}
