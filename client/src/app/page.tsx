import Categories from "@/components/home/Categories";
import HotProducts from "@/components/home/HotProducts";
import NewProducts from "@/components/home/NewProducts";
import Slider from "@/components/slider/Slider";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <Categories />
      <NewProducts />
      <HotProducts />
    </div>
  );
}
