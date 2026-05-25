import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-[var(--field-hint)] placeholder:text-[0.95em] placeholder:italic selection:bg-primary selection:text-primary-foreground flex min-h-24 w-full min-w-0 resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_8px,rgba(30,79,97,0.14)_8px,rgba(30,79,97,0.14)_10px)] dark:disabled:bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_8px,rgba(215,244,255,0.18)_8px,rgba(215,244,255,0.18)_10px)] md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
