import * as React from "react";
import { clx } from "../../utils/clx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, ...props }, ref) => {
    return (
      <div>
        <h6>{label}</h6>
        <input
          type={type}
          className={clx(
            "w-60 h-10 bg-white border rounded-md text-black border-2 p-2 focus:outline-none autocomplete-off placeholder:text-black focus:bg-white",
            className
          )}
          ref={ref}
          autoComplete="off"
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
