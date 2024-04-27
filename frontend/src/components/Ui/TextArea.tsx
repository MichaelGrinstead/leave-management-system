import * as React from "react";

import { clx } from "../../utils/clx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-left">
        {error ? (
          <label className="text-red-600 font-semibold">{error}</label>
        ) : (
          <label>{label}</label>
        )}
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
