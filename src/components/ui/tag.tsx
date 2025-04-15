
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/15",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        mood: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        price: "bg-green-100 text-green-800 hover:bg-green-200",
        category: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        trending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        editors: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default",
      }
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  selected?: boolean;
}

function Tag({
  className,
  variant,
  interactive,
  selected,
  ...props
}: TagProps) {
  return (
    <div
      className={cn(
        tagVariants({ variant, interactive }),
        selected && "ring-2 ring-ring ring-offset-1",
        className
      )}
      {...props}
    />
  );
}

export { Tag, tagVariants };
