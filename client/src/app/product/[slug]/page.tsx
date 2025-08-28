import ProductAction from "@/components/product/ProductAction";
import ProductDescription from "@/components/product/productInfo/ProductDescription";
import ProductInfo from "@/components/product/productInfo/ProductInfo";
import ProductInfoDetail from "@/components/product/productInfo/ProductInfoDetail";
import { BookInterface } from "@/interface/book.i";

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { slug: string };
}

const ProductPage = async ({ searchParams }: ProductPageProps) => {
  const query = searchParams;
  const bookId = query.q as string;

  let bookData: BookInterface | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/book/${bookId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }

    bookData = (await res.json()) as BookInterface;
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  if (!bookData) {
    return (
      <div className="max-w-[1230px] mx-auto px-4 py-6 text-center text-red-500 font-medium">
        Không thể tải dữ liệu sách. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="max-w-[1230px] grid grid-cols-[40%_60%] gap-6 mx-auto px-4 py-6">
      <div className="relative">
        <div className="sticky top-6">
          <ProductAction
            images={bookData.images}
            bookId={bookId}
            bookQuantity={bookData.quantity}
          />
        </div>
      </div>

      <div>
        <ProductInfo
          title={bookData.title}
          supplier={bookData?.detail.publisher}
          author={bookData.detail.author}
          publisher={bookData.detail.publisher}
          layout={bookData.detail.layout}
          sold_count={bookData.sold_count}
          bookQuantity={bookData.quantity}
          price={bookData.price}
          discount={bookData.discount}
          bookId={bookId}
        />
        <ProductInfoDetail bookDetail={bookData?.detail} bookId={bookId} />
        <ProductDescription description={bookData?.detail.description} />
      </div>
    </div>
  );
};

export default ProductPage;
