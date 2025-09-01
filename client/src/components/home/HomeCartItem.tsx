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
import { BookItemInterface } from "@/interface/book.i";
import { formatPrice } from "@/util/formatPrice ";
import formatSlug from "@/util/formatSlug";

interface ChildProps {
  products: BookItemInterface[];
}

const HomeCartItem: React.FC<ChildProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
      {products.length > 0 &&
        products.map((product) => (
          <Link
            scroll={true}
            href={`/product/${formatSlug(product.title)}.html?q=${product.id}`}
            key={product.id}
          >
            <Card className="hover:shadow-lg transition duration-300 cursor-pointer flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full h-[180px] sm:h-[200px]">
                  <Image
                    src={
                      product.images?.[0]?.image_url ||
                      "/images/placeholder.png"
                    }
                    alt={product.images?.[0]?.image_public_id || "placeholder"}
                    fill
                    className="object-contain"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-3 flex-1 flex flex-col">
                <CardTitle className="text-sm font-medium line-clamp-2 h-[40px]">
                  {product.title}
                </CardTitle>

                <div className="mt-2">
                  <span className="font-bold text-[var(--primary)] text-lg">
                    {product.price && product.discount
                      ? formatPrice(
                          product.price -
                            (product.price * product.discount) / 100
                        )
                      : "0"}
                  </span>
                  {product.discount ? (
                    <Badge
                      variant="destructive"
                      className="px-1 py-[2px] ml-2 text-xs"
                    >
                      -{product.discount}%
                    </Badge>
                  ) : null}
                </div>

                <div className="mt-2">
                  <span className="font-semibold text-[var(--text)] text-sm line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-2">
                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="bg-[var(--primary)] h-4 rounded-full"
                    style={{
                      width: `${Math.min(
                        (product.sold_count / product.quantity) * 100,
                        100
                      )}%`,
                    }}
                  ></div>

                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    Đã bán {product.sold_count}
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
