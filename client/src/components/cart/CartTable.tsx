"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/util/formatPrice ";
import { CartItemInterface, CartItemWithCheck } from "@/interface/cart.i";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAuthStore } from "@/store/useUserStore";
import { showError, showSuccess } from "@/util/styles/toast-utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { BookInterface } from "@/interface/book.i";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import formatSlug from "@/util/formatSlug";

interface ChildProps {
  data: CartItemInterface[];
  setData: React.Dispatch<React.SetStateAction<CartItemWithCheck[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartTable: React.FC<ChildProps> = ({ data, setData, setLoading }) => {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const toggleAllCheck = useCartStore((state) => state.toggleAllCheck);
  const toggleItemCheck = useCartStore((state) => state.toggleItemCheck);
  const clearCart = useCartStore((state) => state.clear);

  const [rowSelection, setRowSelection] = useState({});
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [bookDelete, setBookDelete] = useState<BookInterface | null>(null);

  const handleDelete = async (): Promise<void> => {
    if (!bookDelete?.id)
      return showError("Hệ thống đang lỗi! Xin quý khách hàng thông cảm!");
    setLoading(true);
    await axiosInstance
      .delete(`/cart/${user?.id}/remove?book_id=${bookDelete?.id}`)
      .then((res) => {
        const msg = res.data.message || "Item removed successfully!";
        showSuccess(msg);

        if (cartItems) {
          const updatedItems = cartItems.filter(
            (item) => item.book?.id !== bookDelete.id
          );

          if (updatedItems.length === 0) {
            clearCart(); // xoá hết thì clear store
          } else {
            setCartItems(updatedItems); // update lại store
          }
        }

        // đồng bộ thêm với state local trong component (nếu có)
        setData((prevData) =>
          prevData.filter((data) => data.book?.id !== bookDelete.id)
        );
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Xoá sách khỏi giỏ hàng thất bại! Hệ thống đang lỗi sẽ sớm khắc phục. Mong khách hàng thông cảm";

        showError(errMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns: ColumnDef<CartItemWithCheck>[] = [
    {
      id: "select",
      header: ({ table }) => {
        {
          const allChecked = cartItems?.every((item) => item.checked) ?? false;
          const someChecked =
            cartItems?.some((item) => item.checked) && !allChecked;
          return (
            <Checkbox
              checked={
                allChecked ? true : someChecked ? "indeterminate" : false
              }
              onCheckedChange={(value) => toggleAllCheck(!!value)}
              aria-label="Select all"
              className="cursor-pointer"
            />
          );
        }
      },
      cell: ({ row }) => {
        const item = row.original;

        return (
          <Checkbox
            checked={item.checked}
            onCheckedChange={() => toggleItemCheck(item.book?.id || "")}
            aria-label="Select row"
            className="cursor-pointer"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "image",
      header: `Select All (${data.length} items)`,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <Image
            src={item.book?.images ? item.book.images[0].image_url : ""}
            alt="image"
            width={119}
            height={119}
            className="object-contain w-[119px] h-[119px]"
          />
        );
      },
    },
    {
      accessorKey: "title",
      header: "",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="w-[340px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
            <Link
              href={`/product/${formatSlug(
                item.book ? item.book?.title : ""
              )}.html?q=${item.book ? item.book?.id : ""}`}
              className="text-base-normal break-words line-clamp-2 text-justify w-full hover:underline hover:decoration-2 hover:decoration-[var(--text)] hover:underline-offset-2 transition-all duration-200"
            >
              {item.book?.title}
            </Link>

            <div className=" flex items-center">
              <p className="text-[18px] line-[18px] font-bold">
                {item?.book?.price && item?.book?.discount
                  ? formatPrice(
                      item.book.price -
                        (item.book.price * item.book.discount) / 100
                    )
                  : "0"}
              </p>
              <p className="ml-2 line-through">
                {formatPrice(item.book?.price ?? 0)}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-center w-full">Quantity</div>,
      cell: ({ row }) => {
        const item = row.original;
        const bookQuantity = item.book?.quantity ? item.book?.quantity : 0;

        // Hàm cập nhật số lượng
        const updateQuantity = async (newQuantity: number) => {
          // Cập nhật local
          setData((prev) =>
            prev.map((p) =>
              p.id === item.id ? { ...p, quantity: newQuantity } : p
            )
          );

          // Cập nhật store
          setCartItems(
            cartItems.map((p) =>
              p.id === item.id ? { ...p, quantity: newQuantity } : p
            )
          );

          if (user) {
            setLoading(true);
            try {
              await axiosInstance.put(`/cart/${user?.id}/update`, {
                book_id: item.book?.id,
                quantity: newQuantity,
              });
            } catch (error) {
              console.error("Update quantity error:", error);
              showError("Cập nhật số lượng thất bại");
            } finally {
              setLoading(false);
            }
          }
        };

        return (
          <div className="flex items-center justify-center border border-[#ccc] rounded-[5px]">
            {/* Giảm */}
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.quantity - 1);
                }
              }}
            >
              <Minus color={`${item.quantity === 1 ? "gray" : "black"}`} />
            </button>

            {/* Input */}
            <input
              className="w-[40px] text-center outline-0"
              type="text"
              value={item.quantity.toString()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  const parsed = value === "" ? 0 : Number(value);
                  if (parsed >= 1 && parsed <= bookQuantity) {
                    updateQuantity(parsed);
                  }
                }
              }}
            />

            {/* Tăng */}
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                if (item.quantity < bookQuantity) {
                  updateQuantity(item.quantity + 1);
                }
              }}
            >
              <Plus
                color={`${item.quantity === bookQuantity ? "gray" : "black"}`}
              />
            </button>
          </div>
        );
      },
    },

    {
      id: "Subtotal",
      header: () => <div className="text-center w-full">Subtotal</div>,
      cell: ({ row }) => {
        const item = row.original; // lấy object gốc
        let subtotal;
        if (item.book) {
          subtotal =
            (item.book.price - (item.book.price * item.book.discount) / 100) *
            item.quantity;
        }

        return (
          <div className="text-center text-[18px] font-bold text-[var(--primary)]">
            {subtotal && formatPrice(subtotal)}
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        const book = item.book ? item.book : null;
        return (
          <div className="flex justify-center">
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  className="text-[var(--text)] cursor-pointer hover:text-[var(--primary)]"
                  onClick={() => {
                    setBookDelete(book);

                    setDeleteMode(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa sản phẩm trong giỏ hàng</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: cartItems,
    columns,
    autoResetPageIndex: false,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="list-container">
      <Table>
        <TableHeader className="mb-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                😔 Không có sản phẩm nào ở trong giỏ hàng
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteMode} onOpenChange={setDeleteMode}>
        <AlertDialogContent className="max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-red-600 px-4 py-2">
              Xóa sản phẩm khỏi giỏ hàng?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 px-4 text-justify">
              Bạn có chắc chắn muốn xóa{" "}
              <span className="font-medium text-blue-600">
                {bookDelete?.title}
              </span>{" "}
              khỏi giỏ hàng không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="px-4 py-2">
            <AlertDialogCancel className="rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={() => bookDelete?.id && handleDelete()}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartTable;
