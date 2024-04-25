import * as React from "react";

import { clx } from "../../utils/clx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, errorMessage, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-left">
        {errorMessage ? <label>{errorMessage}</label> : <label>{label}</label>}
        <textarea
          className={clx(
            "flex min-h-[80px] w-60 rounded-md border-2 px-2 py-2 focus:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
