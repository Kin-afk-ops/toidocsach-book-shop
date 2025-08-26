"use client";

import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderInterface } from "@/interface/order.i";
import axiosInstance from "@/lib/api/axiosInstance";
import { formatPrice } from "@/util/formatPrice ";
import formatSlug from "@/util/formatSlug";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyOrderPage = () => {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [orders, setOrders] = useState<OrderInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (userId) {
          const res = await axiosInstance.get(`/order/${userId}`);
          setOrders(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);
  console.log(orders);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="main-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders?.map(
                (order) =>
                  order.items &&
                  order.items.map((item, index) => (
                    <TableRow key={item.id} className="border-0">
                      <TableCell className="align-top">
                        <Image
                          src={
                            item.book?.images
                              ? item.book.images[0].image_url
                              : ""
                          }
                          alt={
                            item.book?.images
                              ? item.book.images[0].image_public_id
                              : ""
                          }
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </TableCell>

                      <TableCell className="w-[340px] h-[100px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                        <Link
                          href={`/product/${formatSlug(
                            item.book ? item.book?.title : ""
                          )}.html?q=${item.book ? item.book?.id : ""}`}
                          className="text-base-normal break-words line-clamLink-2 text-justify w-full hover:underline hover:decoration-2 hover:decoration-[var(--text)] hover:underline-offset-2 transition-all duration-200"
                        >
                          {item.book?.title}
                        </Link>
                      </TableCell>

                      <TableCell className="align-top text-center">
                        <div className="flex flex-col items-center">
                          <p className="text-[16px]">{item.price}</p>
                          <p className="line-through">
                            {item.book
                              ? formatPrice(
                                  item.book.price -
                                    (item.book.price * item.book.discount) / 100
                                )
                              : "0"}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-center align-top">
                        {item.book ? formatPrice(item.book.price) : "0"}
                      </TableCell>

                      {index === 0 && (
                        <TableCell
                          className="text-center align-top font-bold text-[var(--primary)]"
                          rowSpan={order.items ? order.items.length : 0}
                        >
                          {order?.amount}
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell
                          className="text-center align-top font-bold "
                          rowSpan={order.items ? order.items.length : 0}
                        >
                          <Badge
                            className={`flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                              order?.status === "pending"
                                ? "bg-yellow-500"
                                : order?.status === "delivering"
                                ? "bg-blue-500"
                                : order?.status === "completed"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {order?.status}
                          </Badge>
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell
                          className="text-center align-top font-bold "
                          rowSpan={order?.items && order?.items.length}
                        >
                          {order?.status === "pending" && (
                            <PrimaryButton content="Cancel" />
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
              )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MyOrderPage;
