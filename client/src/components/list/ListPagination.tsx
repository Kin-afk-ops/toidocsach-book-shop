"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface ChildProps {
  totalPage: number; // số trang tối đa
  currentPage: number; // trang hiện tại
}

const ListPagination: React.FC<ChildProps> = ({ totalPage, currentPage }) => {
  if (totalPage <= 1) return null;

  // tạo mảng số trang [1,2,3,...,totalPage]
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="py-6">
      <Pagination>
        <PaginationContent>
          {/* Nút Previous */}
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${Math.max(1, currentPage - 1)}`}
            />
          </PaginationItem>

          {/* Các số trang */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                className={
                  page === currentPage
                    ? "bg-[var(--primary)] text-white"
                    : undefined
                }
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Nếu nhiều trang, có thể hiển thị dấu ... */}
          {totalPage > 5 && <PaginationEllipsis />}

          {/* Nút Next */}
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(totalPage, currentPage + 1)}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ListPagination;
