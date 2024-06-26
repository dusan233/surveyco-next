import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-1.5 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-slate-700/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary bg-transparent text-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#a1d19d]",
        yellow: "bg-amber-400 text-primary hover:bg-amber-400/90",
        neutral: "bg-accent text-primary hover:bg-slate-200",
        ghost: "hover:bg-secondary hover:text-primary",
        icon: "bg-white text-black",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "px-3 py-2",
        lg: "px-4 py-3",
        icon: "h-7 w-7 rounded-full border-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
