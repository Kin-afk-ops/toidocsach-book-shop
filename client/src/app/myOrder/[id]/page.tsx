"use client";

import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { showError, showSuccess } from "@/util/styles/toast-utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyOrderPage = () => {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [orders, setOrders] = useState<OrderInterface[] | null>(null);
  const [cancelMode, setCancelMode] = useState<boolean>(false);
  const [cancelOrder, setCancelOrder] = useState<OrderInterface | null>(null);
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

  const formatAddress = (order: OrderInterface): string => {
    if (order.country === "Việt Nam") {
      return `${order.fullname}, ${order.phone}, ${order.address}, ${order.ward}, ${order.province}, ${order.country}`;
    }
    return `${order.fullname}, ${order.phone}, ${order.address}`;
  };

  const handleCancelOrder = async (): Promise<void> => {
    setLoading(true);
    await axiosInstance
      .put(`/order/${cancelOrder?.id}/${userId}/cancelled`)
      .then(() => {
        showSuccess("Đã hủy đơn hàng thành công!");
        setOrders((prev) =>
          prev
            ? prev.map((order) =>
                order.id === cancelOrder?.id
                  ? ({ ...order, status: "cancelled" } as OrderInterface)
                  : order
              )
            : prev
        );
      })
      .catch((error) => {
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Hệ thống đang bị lỗi, sẽ sớm khắc phục. Mong quý khách hàng thông cảm";

        showError(errMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              <TableHead className="text-center">Address</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders?.map(
                (order) =>
                  order.items &&
                  order?.items?.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className={`${
                        index === (order?.items?.length ?? 0) - 1
                          ? "border-b border-[#ccc]"
                          : "border-0"
                      }`}
                    >
                      <TableCell className="align-top w-[100px] h-[100px]">
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
                          className="object-contain max-h-[100px]"
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
                          <p className="text-[16px]">
                            {item.book
                              ? formatPrice(
                                  item.book.price -
                                    (item.book.price * item.book.discount) / 100
                                )
                              : "0"}
                          </p>
                          <p className="line-through">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-center align-top">
                        {item && item.quantity}
                      </TableCell>

                      {index === 0 && (
                        <TableCell
                          className="text-center align-top font-bold text-[var(--primary)]"
                          rowSpan={order.items ? order.items.length : 0}
                        >
                          {formatPrice(order?.amount)}
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell
                          className="flex flex-col justify-between text-[14px] text-[var(--text)]"
                          rowSpan={order?.items && order?.items.length}
                        >
                          <span className="text-base-normal whitespace-normal  break-words text-justify">
                            {formatAddress(order)}
                          </span>

                          {order.note !== "" && (
                            <div className="text-base-normal whitespace-normal  break-words text-justify mt-2">
                              <span className="font-bold">Note:</span>{" "}
                              {order.note}
                            </div>
                          )}
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell
                          className="text-center align-top font-bold "
                          rowSpan={order.items ? order.items.length : 0}
                        >
                          <Badge
                            className={`flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors bg-transparent ${
                              order?.status === "pending"
                                ? "text-yellow-500"
                                : order?.status === "delivering"
                                ? "text-blue-500"
                                : order?.status === "completed"
                                ? "text-green-500"
                                : "text-red-500"
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
                            <PrimaryButton
                              content="Cancel"
                              handleTodo={() => {
                                setCancelMode(true);
                                setCancelOrder(order);
                              }}
                            />
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
              )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={cancelMode} onOpenChange={setCancelMode}>
        <AlertDialogContent className="max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-[var(--primary)] px-4 py-2">
              Hủy đơn hàng?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 px-4 text-justify">
              Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="px-4 py-2">
            <AlertDialogCancel className="rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={() => cancelOrder?.id && handleCancelOrder()}
            >
              Hủy đơn hàng
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyOrderPage;
