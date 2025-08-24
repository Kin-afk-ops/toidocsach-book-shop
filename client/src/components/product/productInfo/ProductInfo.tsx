"use client";

import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const ProductInfo = () => {
  const totalProduct = 5;
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="list-container p-4 ">
      <h1 className="text-2xl font-bold">Thư cho em</h1>
      <div className="grid grid-cols-2 mt-4 text-[var(--text) text-sm">
        <div>
          <div>
            Supplier: <span className="font-bold">Nhã Nam</span>
          </div>
          <div>
            Publisher: <span className="font-bold">Hội Nhà Văn</span>
          </div>
        </div>
        <div>
          <div>
            Author: <span className="font-bold">Hoàng Nam Tiến</span>
          </div>
          <div>
            Book layout: <span className="font-bold">Bìa Mềm</span>
          </div>
        </div>
      </div>
      <div className="text-[var(--text) mt-2">
        Đã bán <span className="font-bold">1.5k</span>
      </div>

      <div className="flex items-center ">
        <p className="font-bold text-[32px] leading-[32px] text-[var(--primary)]">
          112.000 đ
        </p>
        <p className="ml-2 text-[var(--text)] line-through">140.000 đ </p>
        <Badge
          variant="destructive"
          className="px-[4px] py-[3px] ml-2 bg-[var(--primary)] "
        >
          -15%
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
              }
            }}
          >
            <Minus
              color={`${quantity === 1 || quantity === 0 ? "gray" : "black"}`}
            />
          </button>
          <input
            className="w-[40px] text-center outline-0"
            type="text"
            value={quantity.toString()} // ép sang string
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                // chỉ cho số 0-9
                setQuantity(value === "" ? 0 : Number(value)); // chuyển lại thành number
              }
            }}
          />

          <button
            className="p-2 cursor-pointer"
            onClick={() => {
              if (quantity < totalProduct) {
                setQuantity((prev) => prev + 1);
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
