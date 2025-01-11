import { getProducts } from "@/hooks/products";
import TrackProduct from "./track-product";
import Product from "./product";

const Products = () => {
  const { data: products } = getProducts();
  return (
    <div className="flex-1 flex flex-col">
      {products && products?.length > 0 ? (
        <div className="h-full flex justify-stretch gap-6 flex-wrap w-full max-md:justify-center">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col gap-3 items-center justify-center">
          <p className="text-3xl font-bold text-red-700">
            No <span className="text-black">products</span> yet.
          </p>

          <TrackProduct />
        </div>
      )}
    </div>
  );
};

export default Products;
