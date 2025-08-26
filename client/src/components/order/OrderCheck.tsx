"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PrimaryButton from "../customs/PrimaryButton";
import { useCartStore } from "@/store/useCartStore";
import { CartItemWithCheck } from "@/interface/cart.i";
import { useEffect, useState } from "react";
import { formatPrice } from "@/util/formatPrice ";

const OrderCheck = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const [cartChecks, setCartChecks] = useState<CartItemWithCheck[]>([]);

  useEffect(() => {
    const getCartChecks = async (): Promise<void> => {
      const checks = cartItems.filter((item) => item.checked === true);
      setCartChecks(checks);
    };

    getCartChecks();
  }, [cartItems]);

  const handleGrandTotal = () => {
    return cartChecks.reduce((total, item) => {
      if (!item.book) return total;

      const { price, discount } = item.book;
      const finalPrice =
        price && discount ? price - (price * discount) / 100 : price ?? 0;

      return total + finalPrice * item.quantity;
    }, 0);
  };

  return (
    <div className="flex w-full justify-center my-4">
      <div className="w-full bg-white p-4">
        <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
          Check order again
        </div>

        <div>
          <Table>
            <TableBody>
              {cartChecks.length > 0 ? (
                cartChecks.map((cartCheck) => (
                  <TableRow key={cartCheck.id}>
                    <TableCell>
                      <Image
                        src={
                          cartCheck.book
                            ? cartCheck.book.images[0].image_url
                            : ""
                        }
                        alt={
                          cartCheck.book
                            ? cartCheck.book?.images[0].image_public_id
                            : "image"
                        }
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-[260px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                        <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
                          {cartCheck.book ? cartCheck.book.title : ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center flex-col">
                      <p className="text-[16px] line-[16px">
                        {cartCheck.book
                          ? formatPrice(
                              cartCheck.book.price -
                                (cartCheck.book.price *
                                  cartCheck.book.discount) /
                                  100
                            )
                          : "0"}
                      </p>
                      <p className="line-through">
                        {cartCheck.book
                          ? formatPrice(cartCheck.book.price)
                          : "0"}
                      </p>
                    </TableCell>
                    <TableCell className="text-center align-top">
                      {cartCheck.quantity}
                    </TableCell>
                    <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                      {cartCheck.book
                        ? formatPrice(
                            (cartCheck.book.price -
                              (cartCheck.book.price * cartCheck.book.discount) /
                                100) *
                              cartCheck.quantity
                          )
                        : "0"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <span className="text-[18px] ">Order Total: </span>
              <span className="ml-2 text-[20px] font-bold text-[var(--primary)]">
                {formatPrice(handleGrandTotal())}
              </span>
            </div>
            <div className="w-[50%]">
              <PrimaryButton content="Order Confirmation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheck;
