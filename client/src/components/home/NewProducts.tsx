import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import HomeCartItem from "./HomeCartItem";
import { Praise } from "next/font/google";
import TransparentButton from "../customs/TransparentButton";
import Link from "next/link";
import { BookItemInterface } from "@/interface/book.i";

interface ChildProps {
  products: BookItemInterface[];
}

const NewProducts: React.FC<ChildProps> = ({ products }) => {
  return (
    <div className="p-[15px] main-container">
      <div className="flex text-[var(--text)] font-bold text-[20px] items-center pb-[15px] border-b border-[#ddd]">
        <p>New Books</p>
      </div>
      <HomeCartItem products={products} />

      <div className="flex justify-center mt-6">
        <Link href={"/categories/new-book.html"} className="w-[20%]">
          <TransparentButton content="View more" />
        </Link>
      </div>
    </div>
  );
};

export default NewProducts;
