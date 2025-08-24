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
import { Minus, Plus, Trash, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/util/formatPrice ";

interface CartInterface {
  id: string;
  image: string;
  title: string;
  price: number;
  discountPrice: number;
  quantity: number;
}

const CartTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<CartInterface[]>([
    {
      id: "1",
      title:
        "Book A Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, nostrum. Repellendus veniam quo ipsam tempore non illum aperiam cum quis facere adipisci explicabo, laudantium laborum ipsa omnis, unde sint odio!",
      image:
        "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg",
      price: 100000,
      discountPrice: 90000,
      quantity: 2,
    },
    {
      id: "2",
      title: "Book B",
      image:
        "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg",
      price: 200000,
      discountPrice: 180000,
      quantity: 1,
    },
  ]);

  const columns: ColumnDef<CartInterface>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "image",
      header: `Select All (${data.length} items)`,
      cell: ({ row }) => (
        <Image
          src={row.getValue("image")}
          alt="image"
          width={119}
          height={119}
          className="object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "",
      cell: ({ row }) => {
        const item = row.original as CartInterface;

        return (
          <div className="w-[340px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
            <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
              {item.title}
            </p>

            <div className=" flex items-center">
              <p className="text-[18px] line-[18px] font-bold">
                {formatPrice(item.price)}
              </p>
              <p className="ml-2 line-through">
                {formatPrice(item.discountPrice)}{" "}
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
        const item = row.original as CartInterface;

        return (
          <div className="flex items-center justify-center border border-[#ccc] rounded-[5px]">
            {/* Giảm */}
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                if (item.quantity > 1) {
                  setData((prev) =>
                    prev.map((p) =>
                      p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
                    )
                  );
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
                  setData((prev) =>
                    prev.map((p) =>
                      p.id === item.id
                        ? { ...p, quantity: value === "" ? 0 : Number(value) }
                        : p
                    )
                  );
                }
              }}
            />

            {/* Tăng */}
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                const totalProduct = 10; // giả sử max stock = 10
                if (item.quantity < totalProduct) {
                  setData((prev) =>
                    prev.map((p) =>
                      p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                    )
                  );
                }
              }}
            >
              <Plus color={`${item.quantity === 10 ? "gray" : "black"}`} />
            </button>
          </div>
        );
      },
    },

    {
      id: "Subtotal",
      header: () => <div className="text-center w-full">Subtotal</div>,
      cell: ({ row }) => {
        const item = row.original as CartInterface; // lấy object gốc
        const subtotal = item.price * item.quantity;

        return (
          <div className="text-center text-[18px] font-bold text-[var(--primary)]">
            {formatPrice(subtotal)}
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  className="text-[var(--text)] cursor-pointer hover:text-[var(--primary)]"
                  onClick={() => {}}
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
    data,
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartTable;
