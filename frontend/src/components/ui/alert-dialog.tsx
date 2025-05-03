import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, HTMLAttributes, Ref } from "react";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & { ref?: Ref<any> }) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={refProp}
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

function AlertDialogContent({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & { ref?: Ref<any> }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={refProp}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid md:w-full max-sm:w-[320px] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

function AlertDialogTitle({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & { ref?: Ref<any> }) {
  return (
    <AlertDialogPrimitive.Title
      ref={refProp}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

function AlertDialogDescription({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
  ref?: Ref<any>;
}) {
  return (
    <AlertDialogPrimitive.Description
      ref={refProp}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

function AlertDialogAction({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & { ref?: Ref<any> }) {
  return (
    <AlertDialogPrimitive.Action
      ref={refProp}
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

function AlertDialogCancel({
  className,
  ref: refProp,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & { ref?: Ref<any> }) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={refProp}
      className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
      {...props}
    />
  );
}
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
