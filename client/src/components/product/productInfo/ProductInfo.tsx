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
  sold_count: number;
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
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
        {title && title}
      </h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text)] text-sm sm:text-base">
        <div>
          <div>
            Nhà cung cấp:{" "}
            <span className="font-bold">{supplier && supplier}</span>
          </div>
          <div>
            Nhà xuất bản:{" "}
            <span className="font-bold">{publisher && publisher}</span>
          </div>
        </div>
        <div>
          <div>
            Tác giả: <span className="font-bold">{author && author}</span>
          </div>
          <div>
            Hình thức bìa: <span className="font-bold">{layout && layout}</span>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text)] text-sm sm:text-base">
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
            {bookQuantity && bookQuantity - sold_count} sản phẩm
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p className="font-bold text-2xl sm:text-[32px] leading-tight text-[var(--primary)]">
          {price && discount
            ? formatPrice(price - (price * discount) / 100)
            : "0"}
        </p>
        <p className="text-[var(--text)] line-through text-sm sm:text-base">
          {price && formatPrice(price)}{" "}
        </p>
        <Badge
          variant="destructive"
          className="px-2 py-1 bg-[var(--primary)] text-white text-xs sm:text-sm"
        >
          -{discount && discount}%
        </Badge>
      </div>

      {sold_count === bookQuantity ? (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <Badge className="text-lg">Đã hết hàng</Badge>
        </div>
      ) : (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-base sm:text-lg font-bold">Số lượng:</span>
          <div className="flex items-center border border-[#ccc] rounded-md w-max">
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
              className="w-12 text-center outline-0 text-sm sm:text-base"
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
                if (quantity < totalProduct - sold_count) {
                  setQuantity((prev) => prev + 1);
                  setQuantityProduct({
                    bookId: bookId,
                    quantity: quantity + 1,
                  });
                }
              }}
            >
              <Plus
                color={`${
                  quantity === totalProduct - sold_count ? "gray" : "black"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
