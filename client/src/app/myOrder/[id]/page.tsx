"use client";

import PrimaryButton from "@/components/customs/PrimaryButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const MyOrderPage = () => {
  const orders = [
    {
      id: 1,
      total: "250,000đ",
      items: [
        {
          id: "p1",
          name: "Thư Cho Em Lorem ipsum dolor sit amet consectetur...",
          price: "112,000đ",
          oldPrice: "140,000đ",
          qty: 1,
          img: "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg",
        },
        {
          id: "p2",
          name: "Sách khác lorem ipsum dolor sit amet consectetur...",
          price: "138,000đ",
          oldPrice: "160,000đ",
          qty: 2,
          img: "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg",
        },
      ],
      status: "pending",
    },
    {
      id: 2,
      total: "180,000đ",
      items: [
        {
          id: "p3",
          name: "Cuốn sách ABC lorem ipsum dolor sit amet",
          price: "180,000đ",
          oldPrice: "200,000đ",
          qty: 1,
          img: "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg",
        },
      ],
      status: "delivering",
    },
  ];
  return (
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
          {orders.map((order) =>
            order.items.map((item, idx) => (
              <TableRow key={item.id} className="border-0">
                {/* Ảnh sản phẩm */}
                <TableCell className="align-top">
                  <Image
                    src={item.img}
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>

                {/* Tên sản phẩm */}
                <TableCell className="align-top">
                  <p className="whitespace-normal break-words line-clamp-2 text-justify text-[14px] text-[var(--text)]">
                    {item.name}
                  </p>
                </TableCell>

                {/* Giá */}
                <TableCell className="align-top text-center">
                  <div className="flex flex-col items-center">
                    <p className="text-[16px]">{item.price}</p>
                    <p className="line-through">{item.oldPrice}</p>
                  </div>
                </TableCell>

                {/* Số lượng */}
                <TableCell className="text-center align-top">
                  {item.qty}
                </TableCell>

                {/* Tổng đơn chỉ hiển thị ở hàng đầu tiên */}
                {idx === 0 && (
                  <TableCell
                    className="text-center align-top font-bold text-[var(--primary)]"
                    rowSpan={order.items.length}
                  >
                    {order.total}
                  </TableCell>
                )}

                {idx === 0 && (
                  <TableCell
                    className="text-center align-top font-bold "
                    rowSpan={order.items.length}
                  >
                    <Badge
                      className={`flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "delivering"
                          ? "bg-blue-500"
                          : order.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                )}

                {idx === 0 && (
                  <TableCell
                    className="text-center align-top font-bold "
                    rowSpan={order.items.length}
                  >
                    {order.status === "pending" && (
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
  );
};

export default MyOrderPage;
