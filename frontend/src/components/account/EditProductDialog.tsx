import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { FormEventHandler, useState } from "react";

type EditProductDialogProps = {
  product: Product;
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  uploadFileHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image?: string;
};

const EditProductDialog = ({
  product,
  onSubmit,
  uploadFileHandler,
  image,
}: EditProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      key={product._id}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          <Pen className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-sm:max-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-product-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
            setIsOpen(false);
          }}
        >
          <input
            type="hidden"
            name="productId"
            value={product._id}
          />
          {/* Name */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right"
              >
                Name
              </Label>
              <Input
                id="name"
                defaultValue={product.name}
                className="col-span-3"
              />
            </div>
            {/* Image */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="image"
                className="text-right"
              >
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={uploadFileHandler}
                className="col-span-2"
              />
              <Input
                type="text"
                readOnly
                id="imageName"
                name="imageName"
                value={image || product.image}
                className="col-span-1"
              />
            </div>
            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="price"
                className="text-right"
              >
                Price
              </Label>
              <Input
                id="price"
                name="price"
                defaultValue={product.price}
                type="number"
                className="col-span-3"
              />
            </div>
            {/* Discount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="discount"
                className="text-right"
              >
                Discount
              </Label>
              <Input
                id="discount"
                name="discount"
                defaultValue={product.discount}
                type="number"
                className="col-span-3"
              />
            </div>
            {/* Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="stock"
                className="text-right"
              >
                Stock
              </Label>
              <Input
                id="stock"
                name="countInStock"
                defaultValue={product.countInStock}
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="category"
                className="text-right"
              >
                Category
              </Label>
              <Input
                id="category"
                name="category"
                defaultValue={product.category}
                className="col-span-3"
              />
            </div>
            {/* Brand */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="brand"
                className="text-right"
              >
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                defaultValue={product.brand}
                className="col-span-3"
              />
            </div>
            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right"
              >
                Description
              </Label>
              <textarea
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="description"
                name="description"
                defaultValue={product.description}
              />
            </div>
            {/* About */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="about"
                className="text-right"
              >
                About
              </Label>
              <textarea
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                name="about"
                defaultValue={product.about}
              />
            </div>
            {/* Size */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="size"
                className="text-right"
              >
                Size
              </Label>
              <Input
                id="size"
                name="size"
                defaultValue={product.size}
                className="col-span-3"
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="edit-product-form"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {"Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
