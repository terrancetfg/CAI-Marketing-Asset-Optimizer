import { cn } from "@/lib/cn"
import type { Brand } from "@/lib/mock-data"

interface BrandLogoProps {
  brand: Brand
  size?: "sm" | "md" | "lg"
  className?: string
}

const HEIGHT_BY_SIZE = {
  sm: "h-5",
  md: "h-7",
  lg: "h-10",
}

export function BrandLogo({ brand, size = "md", className }: BrandLogoProps) {
  return (
    <img
      src={brand.logoSrc}
      alt={brand.name}
      className={cn("w-auto object-contain", HEIGHT_BY_SIZE[size], className)}
    />
  )
}
