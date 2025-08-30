import React from "react";

import HomeCartItem from "./HomeCartItem";
import TransparentButton from "../customs/TransparentButton";
import Link from "next/link";
import { BookItemInterface } from "@/interface/book.i";

interface ChildProps {
  products: BookItemInterface[];
}

const NewProducts: React.FC<ChildProps> = ({ products }) => {
  return (
    <div className="p-[15px] main-container">
      <div
        className="flex items-center pb-3 border-b border-[#ddd] 
  text-lg sm:text-xl md:text-2xl font-bold text-[var(--text)]"
      >
        <p>Sách mới</p>
      </div>

      <HomeCartItem products={products} />

      <div className="flex justify-center mt-6">
        <Link href="/categories/new-book.html" className="w-full sm:w-auto">
          <TransparentButton content="Xem thêm" />
        </Link>
      </div>
    </div>
  );
};

export default NewProducts;
