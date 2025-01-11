import { ProductTypes } from "@/lib/types";
import { format, formatDistanceToNow } from "date-fns";
import ProductActionButtons from "./product-action-buttons";

const Product = ({ product }: { product: ProductTypes }) => {
  const formattedDate = product.lastChecked
    ? format(new Date(product.lastChecked), "MMM dd, yyyy")
    : "N/A";

  const relativeTime = product.lastChecked
    ? formatDistanceToNow(new Date(product.lastChecked), { addSuffix: true })
    : "N/A";
  return (
    <div className="flex flex-col w-[250px] h-[340px] rounded-lg overflow-hidden border p-2 relative">
      <ProductActionButtons
        name={product.name}
        url={product.url}
        id={product._id}
      />
      <img
        src={product.image || "/placeholder.svg"}
        alt={`${product.name} image`}
        className="w-full h-[200px] object-contain"
      />
      <div className="p-2 flex flex-col mt-auto">
        <p className="text-xl font-bold truncate">{product.name}</p>
        <p>
          Current price:{" "}
          <span className="font-bold text-red-700">
            ${product.currentPrice.toFixed(2)}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Last checked: {formattedDate}
        </p>
        <p className="text-xs text-muted-foreground">({relativeTime})</p>
      </div>
    </div>
  );
};

export default Product;
