import { ChartBarBig } from "lucide-react";
import Image from "next/image";

export const featuredCategories = [
  {
    id: 1,
    name: "Sách Giáo Khoa",
    image: "https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/8936235570006-1.jpg",
    link: "/categories/sach-giao-khoa",
  },
  {
    id: 2,
    name: "Truyện Thiếu Nhi",
    image: "https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/8935337532127.jpg",
    link: "/categories/truyen-thieu-nhi",
  },
  {
    id: 3,
    name: "Tiểu Thuyết",
    image:
      "https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/6902957275668-2-removebg-preview.png",
    link: "/categories/tieu-thuyet",
  },
  {
    id: 4,
    name: "Sách Kỹ Năng",
    image: "https://cdn1.fahasa.com/media/wysiwyg/Thang-08-2025/SGK-Lop3-1.jpg",
    link: "/categories/sach-ky-nang",
  },
  {
    id: 5,
    name: "Văn Học Nước Ngoài",
    image:
      "https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/240715/hsk100x100.jpg",
    link: "/categories/van-hoc-nuoc-ngoai",
  },
];

const Categories = () => {
  return (
    <div className="main-container">
      <div className="p-[15px]">
        <div className="flex text-[var(--text)] font-bold text-[20px] items-center pb-[15px] border-b border-[#ddd]">
          <ChartBarBig className="mr-2 " size={30} color="#e11d48" />
          <p>Product Category</p>
        </div>
        <div className="pt-[15px] flex justify-between">
          {featuredCategories.map((featuredCategory) => (
            <div className=" cursor-pointer group" key={featuredCategory.id}>
              <Image
                src="https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/8936235570006-1.jpg"
                alt="image"
                width={100}
                height={100}
                className="object-contain"
              />

              <p className="mt-[15px] text-[16px] group-hover:text-[var(--primary)] transition duration-100">
                {featuredCategory.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
