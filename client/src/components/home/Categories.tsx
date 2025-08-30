import { CategoryInterface } from "@/interface/category.i";
import { ChartBarBig } from "lucide-react";
import CategoriesDetail from "./CategoriesDetail";

export default async function Categories() {
  let categories: CategoryInterface[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/categories`,
      { cache: "no-store" } // luôn lấy dữ liệu mới
    );

    if (!res.ok) {
      throw new Error("Không thể lấy danh mục sản phẩm");
    }

    categories = (await res.json()) as CategoryInterface[];
  } catch (error) {
    console.error("Lấy danh mục thất bại:", error);
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium py-6 animate-pulse">
        Đang tải danh mục...
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="p-[15px]">
        <div
          className="flex items-center gap-2 pb-3 border-b border-[#ddd] 
  text-lg sm:text-xl md:text-2xl font-bold text-[var(--text)]"
        >
          <ChartBarBig className="mr-2" size={24} color="#e11d48" />
          <p>Danh mục sản phẩm</p>
        </div>

        {categories.length > 0 ? (
          <CategoriesDetail categories={categories} />
        ) : (
          <div className="text-center text-red-500 font-medium py-4">
            Hệ thống đang gặp sự cố. Đôi khi xảy ra lỗi, mong bạn thông cảm.
          </div>
        )}
      </div>
    </div>
  );
}
