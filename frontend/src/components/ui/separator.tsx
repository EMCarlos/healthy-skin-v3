import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = ({ className, orientation = "horizontal", decorative = true, ...props }) => (
  <SeparatorPrimitive.Root
    ref={props.ref}
    decorative={decorative}
    orientation={orientation as SeparatorPrimitive.SeparatorProps["orientation"]}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
);

export { Separator };
