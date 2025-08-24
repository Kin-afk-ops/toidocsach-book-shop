import Image from "next/image";
import ProductImage from "./ProductImage";
import TransparentButton from "../customs/TransparentButton";
import { ShoppingCart } from "lucide-react";
import PrimaryButton from "../customs/PrimaryButton";

const ProductAction = () => {
  return (
    <div className="list-container flex flex-col items-center p-4">
      <ProductImage />
      <div className="flex justify-between w-full mt-6 grid grid-cols-2 gap-4">
        <TransparentButton
          content="Add to Cart"
          icon={<ShoppingCart size={18} />}
        />

        <PrimaryButton content="Buy now" />
      </div>
    </div>
  );
};

export default ProductAction;
