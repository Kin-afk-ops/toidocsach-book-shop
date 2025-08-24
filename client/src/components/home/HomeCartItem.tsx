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
import Link from "next/link";

const HomeCartItem = ({ products }) => {
  return (
    <div className="grid grid-cols-5 gap-4 pt-[15px]">
      {products.map((product) => (
        <Link href={"/product/product.html"} key={product.id}>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="p-0">
              <div className="relative w-full h-[150px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <CardTitle className="text-[14px] font-medium line-clamp-2 h-[40px]">
                {product.name}
              </CardTitle>
              <div className="mt-2">
                <span className="font-bold font-semibold text-[var(--primary)] text-xl">
                  {product.price}
                </span>
                <Badge variant="destructive" className="px-[4px] py-[3px] ml-2">
                  -15%
                </Badge>
              </div>

              <div className="mt-2">
                <span className=" font-semibold text-[var(--text)] text-sm  line-through">
                  320.000₫
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <div className="w-full bg-gray-200 rounded-full h-4 relative">
                <div className="bg-[var(--primary)] h-4 rounded-full w-[83%]"></div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                  Sold 83
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default HomeCartItem;
