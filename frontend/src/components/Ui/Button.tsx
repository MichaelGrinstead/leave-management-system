import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clx } from "../../utils/clx";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md whitespace-nowrap text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-darkBlue",
  {
    variants: {
      variant: {
        default: "bg-midBlue text-white",
        defaultMedium: "bg-midBlue text-lg text-white ",
        defaultLarge: "bg-midBlue text-lg text-white ",
        outline:
          "hover:border border-input bg-background hover:bg-gray-100 hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 w-60 px-8",
        icon: "h-10 w-10",
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
    return (
      <button
        className={clx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
