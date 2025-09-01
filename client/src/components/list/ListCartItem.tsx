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
  bookItem: BookItemInterface;
}

const ListCartItem: React.FC<ChildProps> = ({ bookItem }) => {
  return (
    <Link
      scroll={true}
      href={`/product/${formatSlug(bookItem.title)}.html?q=${bookItem.id}`}
      key={bookItem.id}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px]">
            {bookItem?.images && (
              <Image
                src={bookItem.images[0].image_url}
                alt={bookItem.images[0].image_public_id}
                fill
                className="object-contain"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 flex-1 flex flex-col">
          <CardTitle className="text-sm font-medium line-clamp-2 h-[40px]">
            {bookItem.title}
          </CardTitle>
          <div className="mt-2">
            <span className="font-bold text-[var(--primary)] text-base sm:text-lg md:text-xl">
              {bookItem.price && bookItem.discount
                ? formatPrice(
                    bookItem.price - (bookItem.price * bookItem.discount) / 100
                  )
                : "0"}
            </span>
            <Badge
              variant="destructive"
              className="px-1.5 py-0.5 ml-2 text-[10px] sm:text-xs"
            >
              -{bookItem.discount}%
            </Badge>
          </div>

          <div className="mt-1">
            <span className="text-gray-500 text-xs sm:text-sm line-through">
              {formatPrice(bookItem.price)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-2">
          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 relative">
            <div
              className="bg-[var(--primary)] h-4 rounded-full"
              style={{
                width: `${Math.min(
                  (bookItem.sold_count / bookItem.quantity) * 100,
                  100
                )}%`,
              }}
            ></div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold text-white">
              Đã bán {bookItem.sold_count}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListCartItem;
