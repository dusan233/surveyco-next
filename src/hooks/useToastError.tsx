import { toastError } from "@/lib/util/toastError";
import { useEffect, useRef } from "react";

export default function useToastError(isError: boolean, title?: string) {
  const toastRef = useRef<{ id: string; dismiss: () => void; update: any }>();

  useEffect(() => {
    if (isError) {
      const errorToast = toastError(title ?? "Something went wrong!");
      toastRef.current = errorToast;
    }

    return () => toastRef.current?.dismiss();
  }, [isError, title]);
}
