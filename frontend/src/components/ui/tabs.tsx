import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, Ref } from "react";

const Tabs = TabsPrimitive.Root;

function TabsList({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { ref?: Ref<any> }) {
  return (
    <TabsPrimitive.List
      ref={refProp}
      className={cn(
        "inline-flex h-10 max-sm:items-start max-sm:justify-start sm:items-center sm:justify-center rounded-md bg-muted p-1 text-muted-foreground max-sm:w-full box-border overflow-auto",
        className
      )}
      {...props}
    />
  );
}
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { ref?: Ref<any> }) {
  return (
    <TabsPrimitive.Trigger
      ref={refProp}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { ref?: Ref<any> }) {
  return (
    <TabsPrimitive.Content
      ref={refProp}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
