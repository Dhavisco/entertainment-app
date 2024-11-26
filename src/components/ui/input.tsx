import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
  type={type}
  className={cn(
    "flex w-full border-b-[1px] border-transparent bg-transparent py-1 pb-4 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer",
    // Apply the bottom border color when the input has text (peer-focus or peer-placeholder-shown)
    "focus:border-[#5A698F] peer-placeholder-shown:border-transparent", 
    className
  )}
  ref={ref}
  {...props}
/>
    )
  }
)
Input.displayName = "Input"

export { Input }
