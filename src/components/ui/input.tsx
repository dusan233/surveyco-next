import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400  disabled:cursor-not-allowed disabled:opacity-50 border-[1.5px] focus:outline outline-[1.5px] outline-indigo-500 rounded-md px-2 focus:border-indigo-500 bg-slate-50",
  {
    variants: {
      inputSize: {
        default: "py-1.5 text-base",
        sm: "py-1 text-sm",
        md: "py-1.5 text-base",
      },
      state: {
        default: "border-slate-300",
        error: "border-red-500",
      },
    },
    defaultVariants: {
      inputSize: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, state, isError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, state, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
