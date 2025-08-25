import Categories from "@/components/home/Categories";
import NewProducts from "@/components/home/NewProducts";
import Slider from "@/components/slider/Slider";
import { BookItemInterface } from "@/interface/book.i";

export default async function Home() {
  const bookResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/book`
  );
  const bookData: BookItemInterface[] = await bookResponse.json();
  return (
    <div className="">
      <Slider />
      <Categories />
      <NewProducts products={bookData} />
      {/* <HotProducts /> */}
    </div>
  );
}
