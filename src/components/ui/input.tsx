import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400  disabled:cursor-not-allowed disabled:opacity-50 ${
            isError ? "border-red-500" : "border-slate-300"
          } border-[1.5px] focus:outline outline-[1.5px] outline-indigo-500 rounded-md px-2 py-1 focus:border-indigo-500 text-sm bg-slate-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
