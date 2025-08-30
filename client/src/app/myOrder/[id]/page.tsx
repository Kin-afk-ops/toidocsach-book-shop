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
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [cancelMode, setCancelMode] = useState<boolean>(false);
  const [cancelOrder, setCancelOrder] = useState<OrderInterface | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingMore, setFetchingMore] = useState<boolean>(false);

  const fetchOrders = async (page: number) => {
    try {
      if (page > totalPage) return;

      const res = await axiosInstance.get(`/order/${userId}?page=${page}`);
      const { orders: newOrders, current_page, total_page } = res.data;

      setOrders((prev) => [...prev, ...newOrders]);
      setCurrentPage(current_page);
      setTotalPage(total_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (fetchingMore || currentPage >= totalPage) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300; // khi cách bottom 300px

      if (scrollPosition >= threshold) {
        setFetchingMore(true);
        fetchOrders(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPage, fetchingMore]);

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
        showSuccess("Hủy đơn hàng thành công!");
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
          "Hệ thống đang gặp lỗi. Mong quý khách thông cảm.";

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
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="text-center">Giá</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-center">Thành tiền</TableHead>
                <TableHead className="text-center">Địa chỉ</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.map(
                  (order) =>
                    order.items &&
                    order.items.map((item, index) => (
                      <TableRow
                        key={index}
                        className={`${
                          index === (order.items?.length ?? 0) - 1
                            ? "border-b border-[#ccc]"
                            : "border-0"
                        }`}
                      >
                        <TableCell className="align-top ">
                          <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] relative">
                            <Image
                              src={
                                item.book?.images
                                  ? item.book.images[0].image_url
                                  : ""
                              }
                              alt={
                                item.book?.images
                                  ? item.book.images[0].image_public_id
                                  : "image"
                              }
                              fill
                              className="object-contain"
                            />
                          </div>
                        </TableCell>

                        <TableCell className="w-[340px] h-[100px] text-[14px] text-[var(--text)] align-top">
                          <Link
                            href={`/product/${formatSlug(
                              item.book ? item.book.title : ""
                            )}.html?q=${item.book ? item.book.id : ""}`}
                            className="whitespace-normal break-words line-clamp-2 text-justify w-full hover:underline hover:decoration-2 hover:decoration-[var(--text)] hover:underline-offset-2 transition-all duration-200"
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
                                      (item.book.price * item.book.discount) /
                                        100
                                  )
                                : "0"}
                            </p>
                            <p className="line-through">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="text-center align-top">
                          {item.quantity}
                        </TableCell>

                        {index === 0 && (
                          <TableCell
                            className="text-center align-top font-bold text-[var(--primary)]"
                            rowSpan={order.items ? order.items.length : 0}
                          >
                            {formatPrice(order.amount)}
                          </TableCell>
                        )}

                        {index === 0 && (
                          <TableCell
                            className="flex flex-col justify-between text-[14px] text-[var(--text)]"
                            rowSpan={order.items?.length}
                          >
                            <span className="text-base-normal whitespace-normal break-words text-justify">
                              {formatAddress(order)}
                            </span>
                            {order.note && (
                              <div className="text-base-normal whitespace-normal break-words text-justify mt-2">
                                <span className="font-bold">Ghi chú:</span>{" "}
                                {order.note}
                              </div>
                            )}
                          </TableCell>
                        )}

                        {index === 0 && (
                          <TableCell
                            className="text-center align-top font-bold"
                            rowSpan={order.items?.length}
                          >
                            <Badge
                              className={`flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors bg-transparent ${
                                order.status === "pending"
                                  ? "text-yellow-500"
                                  : order.status === "delivering"
                                  ? "text-blue-500"
                                  : order.status === "completed"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {order.status === "pending"
                                ? "Đang chờ xử lý"
                                : order.status === "delivering"
                                ? "Đang giao hàng"
                                : order.status === "completed"
                                ? "Hoàn thành"
                                : "Đã hủy"}
                            </Badge>
                          </TableCell>
                        )}

                        {index === 0 && (
                          <TableCell
                            className="text-center align-top font-bold"
                            rowSpan={order.items?.length}
                          >
                            {order.status === "pending" && (
                              <PrimaryButton
                                content="Hủy đơn"
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

        <div className="md:hidden space-y-4">
          {orders &&
            orders.map((order, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-3 shadow-sm"
              >
                {order.items &&
                  order.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <Image
                        src={
                          item.book?.images ? item.book.images[0].image_url : ""
                        }
                        alt={item.book?.title || ""}
                        width={80}
                        height={80}
                        className="object-contain w-[80px] h-[80px]"
                      />
                      <div className="flex flex-col justify-between text-sm flex-1">
                        <Link
                          href={`/product/${formatSlug(
                            item.book?.title || ""
                          )}.html?q=${item.book?.id}`}
                          className="font-medium line-clamp-2 hover:underline"
                        >
                          {item.book?.title}
                        </Link>
                        <div className="flex items-center gap-2">
                          <p className="text-red-600 font-bold">
                            {item.book
                              ? formatPrice(
                                  item.book.price -
                                    (item.book.price * item.book.discount) / 100
                                )
                              : "0"}
                          </p>
                          <p className="text-gray-400 line-through text-xs">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <span>Số lượng: {item.quantity}</span>
                      </div>
                    </div>
                  ))}

                {/* Thông tin đơn hàng */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[var(--primary)]">
                    Tổng: {formatPrice(order.amount)}
                  </span>
                  <Badge
                    className={`${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "delivering"
                        ? "text-blue-500"
                        : order.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    } bg-transparent`}
                  >
                    {order.status === "pending"
                      ? "Đang chờ xử lý"
                      : order.status === "delivering"
                      ? "Đang giao hàng"
                      : order.status === "completed"
                      ? "Hoàn thành"
                      : "Đã hủy"}
                  </Badge>
                </div>

                <div className="text-sm">
                  <p>{formatAddress(order)}</p>
                  {order.note && (
                    <p className="mt-2">
                      <span className="font-bold">Ghi chú:</span> {order.note}
                    </p>
                  )}
                </div>

                {order.status === "pending" && (
                  <div className="pt-2">
                    <PrimaryButton
                      content="Hủy đơn"
                      handleTodo={() => {
                        setCancelMode(true);
                        setCancelOrder(order);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {fetchingMore && (
        <div className="text-center py-4 text-gray-500">Đang tải thêm...</div>
      )}

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
              Xác nhận hủy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyOrderPage;
