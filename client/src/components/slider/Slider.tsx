"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// import CSS Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image";
const slides = [
  {
    id: 1,
    image:
      "https://cdn1.fahasa.com/media/magentothem/banner7/Resize_CTT_T8_840x320_fix.png",
    title: "Slide 1",
  },
  {
    id: 2,
    image:
      "https://cdn1.fahasa.com/media/magentothem/banner7/Bitex_KC_Resize_840x320_1.png",
    title: "Slide 2",
  },
  {
    id: 3,
    image:
      "https://cdn1.fahasa.com/media/magentothem/banner7/TrangUuDaiT8_840x320_1.png",
    title: "Slide 3",
  },
];
const Slider = () => {
  return (
    <div className="main-container">
      <div className="w-full mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="rounded-lg overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[320px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover" // hoặc object-contain nếu muốn full nhưng giữ nguyên nền trắng
                  priority={index === 0} // tối ưu LCP cho slide đầu tiên
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
