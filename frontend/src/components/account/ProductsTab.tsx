import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import EditProductDialog from "./EditProductDialog";
import DeleteProductAlert from "./DeleteProductAlert";

interface ProductsTabProps {
  products: Product[];
}

export const ProductsTab = ({ products }: ProductsTabProps) => {
  const [image, setImage] = useState("");
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
    const discount = form.discount.value || 0;
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
  };

  return (
    <Card>
      <CardHeader className="flex max-sm:flex-col max-sm:gap-4 flex-row items-center justify-between space-y-0 px-8 py-4">
        <div className="flex flex-col space-y-1 max-sm:w-full">
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
                  <EditProductDialog
                    product={product}
                    onSubmit={submitHandler}
                    uploadFileHandler={uploadFileHandler}
                    image={image}
                  />

                  <DeleteProductAlert
                    onDelete={() => product?._id && deleteProduct(product._id)}
                    isDeleting={isDeleting}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
