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

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid a, officia asperiores doloribus architecto quos! Facilis architecto tempora doloremque, numquam laboriosam, nobis exercitationem explicabo, quam nihil voluptate libero temporibus odit.",
    price: "120.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: "150.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: "200.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: "90.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 9,
    name: "Sản phẩm 9",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 10,
    name: "Sản phẩm 10",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
];

const HotProducts = () => {
  return (
    <div className="p-[15px] main-container">
      <div className="flex text-[var(--text)] font-bold text-[20px] items-center pb-[15px] border-b border-[#ddd]">
        <p>Hot Books</p>
      </div>
      <HomeCartItem products={products} />

      <div className="flex justify-center mt-6">
        <div className="w-[20%]">
          <TransparentButton content="View more" />
        </div>
      </div>
    </div>
  );
};

export default HotProducts;
