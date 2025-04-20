import { cn } from "@/lib/utils";
import { HTMLAttributes, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";

function Table({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableElement> & { ref?: Ref<HTMLTableElement> }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={refProp}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}
Table.displayName = "Table";

function TableHeader({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & { ref?: Ref<HTMLTableSectionElement> }) {
  return (
    <thead
      ref={refProp}
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}
TableHeader.displayName = "TableHeader";

function TableBody({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & { ref?: Ref<HTMLTableSectionElement> }) {
  return (
    <tbody
      ref={refProp}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}
TableBody.displayName = "TableBody";

function TableFooter({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & { ref?: Ref<HTMLTableSectionElement> }) {
  return (
    <tfoot
      ref={refProp}
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}
TableFooter.displayName = "TableFooter";

function TableRow({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & { ref?: Ref<HTMLTableRowElement> }) {
  return (
    <tr
      ref={refProp}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}
TableRow.displayName = "TableRow";

function TableHead({
  className,
  ref: refProp,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { ref?: Ref<HTMLTableCellElement> }) {
  return (
    <th
      ref={refProp}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}
TableHead.displayName = "TableHead";

function TableCell({
  className,
  ref: refProp,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { ref?: Ref<HTMLTableCellElement> }) {
  return (
    <td
      ref={refProp}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}
TableCell.displayName = "TableCell";

function TableCaption({
  className,
  ref: refProp,
  ...props
}: HTMLAttributes<HTMLTableCaptionElement> & { ref?: Ref<HTMLTableCaptionElement> }) {
  return (
    <caption
      ref={refProp}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
