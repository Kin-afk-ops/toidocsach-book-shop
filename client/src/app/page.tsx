import Categories from "@/components/home/Categories";
import NewProducts from "@/components/home/NewProducts";
import Slider from "@/components/slider/Slider";
import { BookItemInterface } from "@/interface/book.i";

export default async function Home() {
  let books: BookItemInterface[] | null = null;
  let hasError = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/book/home`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    books = (await res.json()) as BookItemInterface[];
  } catch (error) {
    console.error("Lỗi khi tải sách:", error);
    hasError = true;
  }

  return (
    <div>
      <Slider />
      <Categories />

      {hasError ? (
        <div className="p-4 text-center text-red-500 font-medium">
          🚨 Không thể tải dữ liệu sách. Vui lòng thử lại sau.
        </div>
      ) : (
        <NewProducts products={books ?? []} />
      )}
    </div>
  );
}
