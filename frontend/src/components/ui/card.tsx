import { cn } from "@/lib/utils";

const Card = ({ ...props }) => (
  <div
    ref={props.ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", props.className)}
    {...props}
  />
);

const CardHeader = ({ ...props }) => (
  <div
    ref={props.ref}
    className={cn("flex flex-col space-y-1.5 p-6", props.className)}
    {...props}
  />
);
const CardTitle = ({ ...props }) => (
  <h3
    ref={props.ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", props.className)}
    {...props}
  />
);

const CardDescription = ({ ...props }) => (
  <p
    ref={props.ref}
    className={cn("text-sm text-muted-foreground", props.className)}
    {...props}
  />
);

const CardContent = ({ ...props }) => (
  <div
    ref={props.ref}
    className={cn("p-6 pt-0", props.className)}
    {...props}
  />
);

const CardFooter = ({ ...props }) => (
  <div
    ref={props.ref}
    className={cn("flex items-center p-6 pt-0", props.className)}
    {...props}
  />
);

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
