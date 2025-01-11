import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteProduct } from "@/hooks/products";
import EditProduct from "./edit-product";
import { useState } from "react";

interface ProductActionButtonsProps {
  id: string;
  url: string;
  name: string;
}

const ProductActionButtons = ({ id, url, name }: ProductActionButtonsProps) => {
  const { mutate: deleteProductMutation } = deleteProduct();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full absolute top-2 right-2" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation(); // Prevent the menu from closing
            setIsDialogOpen(true); // Open the dialog manually
          }}
        >
          Edit Product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteProductMutation(id)}>
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
      <EditProduct
        id={id}
        url={url}
        name={name}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </DropdownMenu>
  );
};

export default ProductActionButtons;
