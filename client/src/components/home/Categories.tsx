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
      throw new Error("Failed to fetch categories");
    }

    categories = (await res.json()) as CategoryInterface[];
  } catch (error) {
    console.error("Fetch categories failed:", error);
  }

  return (
    <div className="main-container">
      <div className="p-[15px]">
        <div className="flex text-[var(--text)] font-bold text-[20px] items-center pb-[15px] border-b border-[#ddd]">
          <ChartBarBig className="mr-2 " size={30} color="#e11d48" />
          <p>Product Category</p>
        </div>

        {categories.length > 0 ? (
          <CategoriesDetail categories={categories} />
        ) : (
          <div className="text-center text-red-500 font-medium py-4">
            The system is experiencing an error. Sometimes errors may occur,
            please kindly understand.
          </div>
        )}
      </div>
    </div>
  );
}
