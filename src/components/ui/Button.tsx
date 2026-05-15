import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import type { ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cai-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-cai-blue text-white hover:bg-cai-blue-dark",
        outline: "border border-cai-blue text-cai-blue bg-white hover:bg-cai-blue/5",
        ghost: "text-navy-700 hover:bg-navy-50",
        link: "text-cai-blue hover:underline underline-offset-2 p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
