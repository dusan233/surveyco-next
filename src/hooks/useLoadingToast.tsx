import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";
import { Settings } from "lucide-react";

export function useLoadingToast(isLoading: boolean, title?: string) {
  const { toast } = useToast();
  const toastRef = useRef<{ id: string; dismiss: () => void; update: any }>();

  useEffect(() => {
    if (isLoading) {
      const loadingToast = toast({
        variant: "default",
        title: title ?? "Loading...",
        icon: <Settings className="animate-spin text-secondary" />,
      });
      toastRef.current = loadingToast;
    } else {
      toastRef.current?.dismiss();
    }
  }, [isLoading, toast, title]);
}
