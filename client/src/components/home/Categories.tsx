import { CategoryInterface } from "@/interface/category.i";
import { showError } from "@/util/styles/toast-utils";
import { ChartBarBig } from "lucide-react";

import CategoriesDetail from "./CategoriesDetail";

const Categories = async () => {
  const resCategories = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/categories`
  );

  const categories: CategoryInterface[] =
    (await resCategories.json()) as CategoryInterface[];

  if (!categories || categories.length === 0) {
    showError(
      "Không tải được danh mục sản phẩm. Hệ thống đang lỗi mong khách hàng thống cảm"
    );
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
};

export default Categories;
