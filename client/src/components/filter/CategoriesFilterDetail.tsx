"use client";
import { CategoryInterface } from "@/interface/category.i";
import formatSlug from "@/util/formatSlug";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ChildProps {
  categories: CategoryInterface[];
}

const CategoriesFilterDetail: React.FC<ChildProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const currentCateId = searchParams.get("q");
  return (
    <>
      <li className="group">
        <Link
          href={`/categories/new-book.html?page=${1}`}
          className={`cursor-pointer transition duration-100 group-hover:text-[var(--primary)] ${
            !currentCateId && "text-[var(--primary)]"
          }`}
        >
          Sách mới
        </Link>
      </li>
      {categories.length > 0 ? (
        categories?.map((category) => (
          <li className="group" key={category.id}>
            <Link
              href={`/categories/${formatSlug(
                category?.title
              )}.html?page=${1}&q=${category?.id}`}
              className={`cursor-pointer transition duration-100 group-hover:text-[var(--primary)] ${
                currentCateId === category.id && "text-[var(--primary)]"
              }`}
            >
              {category.title}
            </Link>
          </li>
        ))
      ) : (
        <div className="text-center text-red-500 font-medium py-4">
          The system is experiencing an error. Sometimes errors may occur,
          please kindly understand.
        </div>
      )}
    </>
  );
};

export default CategoriesFilterDetail;
