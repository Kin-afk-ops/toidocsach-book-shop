"use client";
import ListCart from "@/components/list/ListCart";
import ListPagination from "@/components/list/ListPagination";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { BookItemInterface } from "@/interface/book.i";
import axiosInstance from "@/lib/api/axiosInstance";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListPage = () => {
  const searchParams = useSearchParams();
  const currentCateId = searchParams.get("q");
  const page = (searchParams.get("page") as string) || "1";
  const [bookResult, setBookResult] = useState<{
    books: BookItemInterface[];
    total_pages: number;
    current_page: number;
  }>({
    books: [],
    total_pages: 0,
    current_page: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookCategories = async (): Promise<void> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        let res;
        if (currentCateId) {
          res = await axiosInstance.get(
            `/book/category/${currentCateId}?page=${page}`
          );
        } else {
          res = await axiosInstance.get(`/book/list?page=${page}`);
        }

        setBookResult(res?.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookCategories();
  }, [currentCateId, page]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="list-container">
        {/* Nếu không có sách */}
        {bookResult.books.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Không có sản phẩm nào để hiển thị
          </div>
        ) : (
          <>
            <ListCart bookItems={bookResult.books} />
            <ListPagination
              totalPage={bookResult.total_pages}
              currentPage={bookResult.current_page}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ListPage;
