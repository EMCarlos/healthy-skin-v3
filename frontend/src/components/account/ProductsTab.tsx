import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductCreate, useProductDelete, useProductUpdate } from "@/hooks";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";

interface ProductsTabProps {
  products: Product[];
}

export const ProductsTab = ({ products }: ProductsTabProps) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { updateProduct } = useProductUpdate();
  const { createProduct, isCreating } = useProductCreate();
  const { deleteProduct, isDeleting } = useProductDelete();

  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", e.target.form.image.files[0]);
    formData.append("product_id", e.target.form.productId.value);
    console.log(formData);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosInstance.post("/api/products/upload/", formData, config);

      setImage(file.name || data); // Use data.image if your API returns { image: "url" }
      setUploading(false);
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const productId = form.productId.value;
    const name = form.name.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const brand = form.brand.value;
    const size = form.size.value;
    const about = form.about.value;
    const category = form.category.value;
    const countInStock = form.countInStock.value;
    const description = form.description.value;

    updateProduct({
      _id: productId,
      name,
      price,
      discount,
      image,
      brand,
      size,
      about,
      category,
      countInStock,
      description,
    });

    //close the dialog after submission
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex max-sm:flex-col max-sm:gap-4 flex-row items-center justify-between space-y-0 px-8 py-4">
        <div className="flex flex-col space-y-1 max-sm:w-full ">
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your store's products</CardDescription>
        </div>
        <Button
          className="max-sm:w-full"
          onClick={() => createProduct()}
          disabled={isCreating}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.countInStock}</TableCell>
                <TableCell className="flex gap-2">
                  <Dialog
                    key="edit-product-dialog"
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
                        onSubmit={submitHandler}
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

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the product
                          from your store.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteProduct(product._id ?? 0)}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
