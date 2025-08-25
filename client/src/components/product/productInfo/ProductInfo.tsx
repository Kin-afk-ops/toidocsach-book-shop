"use client";

import { Badge } from "@/components/ui/badge";
import { useQuantityProduct } from "@/store/useQuanityProductStore";
import { formatPrice } from "@/util/formatPrice ";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
interface ChildProps {
  title: string | undefined;
  supplier: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  layout: string | undefined;
  sold_count: number | undefined;
  bookQuantity: number | undefined;
  price: number | undefined;
  discount: number | undefined;
  bookId: string;
}

const ProductInfo: React.FC<ChildProps> = ({
  title,
  supplier,
  author,
  publisher,
  layout,
  sold_count,
  bookQuantity,
  price,
  discount,
  bookId,
}) => {
  const totalProduct = bookQuantity ? bookQuantity : 0;
  const [quantity, setQuantity] = useState<number>(1);
  const setQuantityProduct = useQuantityProduct(
    (state) => state.setQuantityProduct
  );

  return (
    <div className="list-container p-4 ">
      <h1 className="text-2xl font-bold">{title && title}</h1>
      <div className="grid grid-cols-2 mt-4 text-[var(--text) text-sm">
        <div>
          <div>
            Supplier: <span className="font-bold">{supplier && supplier}</span>
          </div>
          <div>
            Publisher:{" "}
            <span className="font-bold">{publisher && publisher}</span>
          </div>
        </div>
        <div>
          <div>
            Author: <span className="font-bold">{author && author}</span>
          </div>
          <div>
            Book layout: <span className="font-bold">{layout && layout}</span>
          </div>
        </div>
      </div>
      <div className="text-[var(--text) grid grid-cols-2 my-4">
        <div>
          Đã bán:
          <span className="font-bold">
            {" "}
            {sold_count && sold_count} sản phẩm
          </span>
        </div>
        <div>
          Hiện có:
          <span className="font-bold">
            {" "}
            {bookQuantity && bookQuantity} sản phẩm
          </span>
        </div>
      </div>

      <div className="flex items-center ">
        <p className="font-bold text-[32px] leading-[32px] text-[var(--primary)]">
          {price && discount
            ? formatPrice(price - (price * discount) / 100)
            : "0"}
        </p>
        <p className="ml-2 text-[var(--text)] line-through">
          {price && formatPrice(price)}{" "}
        </p>
        <Badge
          variant="destructive"
          className="px-[4px] py-[3px] ml-2 bg-[var(--primary)] "
        >
          -{discount && discount}%
        </Badge>
      </div>

      <div className="text-[18px] font-bold mt-6 flex items-center">
        Quantity:
        <div className="flex items-center ml-4 border border-[#ccc] rounded-[5px]">
          <button
            className="p-2 cursor-pointer"
            onClick={() => {
              if (quantity > 1) {
                setQuantity((prev) => prev - 1);
                setQuantityProduct({
                  bookId: bookId,
                  quantity: quantity - 1,
                });
              }
            }}
          >
            <Minus
              color={`${quantity === 1 || quantity === 0 ? "gray" : "black"}`}
            />
          </button>
          <input
            className="w-[50px] text-center outline-0"
            type="text"
            value={quantity.toString()} // ép sang string
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                // chỉ cho số 0-9
                setQuantity(value === "" ? 0 : Number(value));
                setQuantityProduct({
                  bookId: bookId,
                  quantity: value === "" ? 0 : Number(value),
                });
              }
            }}
          />

          <button
            className="p-2 cursor-pointer"
            onClick={() => {
              if (quantity < totalProduct) {
                setQuantity((prev) => prev + 1);
                setQuantityProduct({
                  bookId: bookId,
                  quantity: quantity + 1,
                });
              }
            }}
          >
            <Plus color={`${quantity === totalProduct ? "gray" : "black"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
