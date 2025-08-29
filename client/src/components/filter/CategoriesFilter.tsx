import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CategoryInterface } from "@/interface/category.i";

import CategoriesFilterDetail from "./CategoriesFilterDetail";

const CategoriesFilter = async () => {
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
    <aside className="w-[250px] flex-shrink-0">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-bold mb-4">Lọc sản phẩm</h2>

        {/* Example filter: Categories */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Danh mục</p>
          <ul className="space-y-1 pl-3">
            <CategoriesFilterDetail categories={categories} />
          </ul>
        </div>

        {/* Example filter: Price */}
        {/* <div className="mb-4">
          <p className="font-semibold mb-2">Price</p>

          <ul className="space-y-1 pl-3">
            <li className="group flex">
              <Checkbox
                id="100"
                className="border border-[#aaa] mr-2 cursor-pointer "
              />
              <Label
                htmlFor="100"
                className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]"
              >
                0 - 100k
              </Label>
            </li>
            <li className="group flex">
              <Checkbox
                id="300"
                className="border border-[#aaa] mr-2 cursor-pointer "
              />
              <Label
                htmlFor="300"
                className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]"
              >
                100k - 300k
              </Label>
            </li>
          </ul>
        </div> */}
      </div>
    </aside>
  );
};

export default CategoriesFilter;
