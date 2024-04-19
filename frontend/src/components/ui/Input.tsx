import * as React from "react";
import { clx } from "../../utils/clx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clx(
          "w-60 h-10 bg-transparent text-black border-2 border-darkBlueGrey p-2 focus:outline-none autocomplete-off placeholder:text-black focus:bg-white",
          className
        )}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
