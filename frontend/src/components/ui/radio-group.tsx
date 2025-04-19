import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, Ref } from "react";

type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  ref?: Ref<any>;
};

function RadioGroup({ className, ref: refProp, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      ref={refProp}
      {...props}
    />
  );
}
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  ref?: Ref<any>;
};

function RadioGroupItem({ className, ref: refProp, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={refProp}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
