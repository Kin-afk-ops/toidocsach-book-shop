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
    image: "/slide_1.jpg",
    title: "Slide 1",
  },
  {
    id: 2,
    image: "/slide_2.jpg",
    title: "Slide 2",
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
              <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px]">
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
