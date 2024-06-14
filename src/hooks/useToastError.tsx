import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export default function useToastError(isError: boolean, title?: string) {
  const { toast } = useToast();
  const toastRef = useRef<{ id: string; dismiss: () => void; update: any }>();

  useEffect(() => {
    if (isError) {
      const errorToast = toast({
        duration: 4000,
        variant: "destructive",
        title: title ?? "Something went wrong!",
        icon: <AlertCircle className="text-desctructive" />,
      });
      toastRef.current = errorToast;
    }

    return () => toastRef.current?.dismiss();
  }, [isError, toast, title]);
}
