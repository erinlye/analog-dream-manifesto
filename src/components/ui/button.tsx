
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-comic",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#6CADDE] to-[#3080C0] text-white border-2 border-[#3080C0] shadow-retro hover:from-[#3080C0] hover:to-[#1060A0]",
        destructive: "bg-gradient-to-b from-[#FF6666] to-[#CC0000] text-white border-2 border-[#CC0000] shadow-retro hover:from-[#CC0000] hover:to-[#990000]",
        outline: "border-2 border-[#3080C0] bg-white text-[#3080C0] hover:bg-[#E8FFFF] shadow-retro",
        secondary: "bg-gradient-to-b from-[#FFFF99] to-[#FFCC00] text-[#996600] border-2 border-[#FFCC00] shadow-retro hover:from-[#FFCC00] hover:to-[#CC9900]",
        ghost: "hover:bg-[#E8FFFF] hover:text-[#3080C0]",
        link: "text-[#3080C0] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
