import { CategoryInterface } from "@/interface/category.i";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

interface ChildProps {
  categories: CategoryInterface[];
}
const CategoriesDetail: React.FC<ChildProps> = ({ categories }) => {
  return (
    <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.length !== 0 &&
        categories.map((category) => (
          <Link
            scroll={true}
            href={`/categories/${slugify(category.title)}.html?q=${
              category.id
            }&page=${1}`}
            className=" cursor-pointer group flex justify-center flex-col items-center"
            key={category.id}
          >
            <div className="w-[100px] h-[100px]">
              {category?.image_url ? (
                <Image
                  src={category.image_url}
                  alt={category?.image_public_id || "Category"}
                  width={100}
                  height={100}
                  className="object-contain  max-h-[100px]"
                />
              ) : null}
            </div>

            <p className="mt-[15px] text-[16px] group-hover:text-[var(--primary)] transition duration-100 text-center">
              {category.title}
            </p>
          </Link>
        ))}
    </div>
  );
};

export default CategoriesDetail;
