"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { BookImage } from "@/interface/book.i";

interface ChildProps {
  images: BookImage[];
}

const ProductImage: React.FC<ChildProps> = ({ images }) => {
  const visibleImages = images.slice(1, images.length);
  const remaining = images.length > 5 ? images.length - 6 : 0;
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[400px] items-center">
      {/* Hình chính */}

      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="flex gap-2 justify-start flex-wrap w-full"
        mode="lg-fade"
        closable={true}
        closeOnTap={true}
        hideBarsDelay={0}
        isMobile={() => true} // 👈 phải là function
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: true,
          rotate: false,
          closeOnTap: true,
        }}
      >
        <a
          className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[376px] cursor-pointer"
          href={images[0].image_url}
          data-src={images[0].image_url}
        >
          <Image
            src={images[0].image_url}
            alt="Ảnh sản phẩm"
            fill
            className="object-contain"
          />
        </a>

        {visibleImages.map((image, index) => (
          <a
            href={image.image_url}
            data-src={image.image_url}
            className={`relative h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] cursor-pointer flex justify-center mt-3 sm:mt-4 ${
              index < 5 ? "block" : "hidden"
            }`}
            key={index}
          >
            <Image
              alt={"Ảnh sản phẩm"}
              src={image.image_url}
              fill
              className="object-contain"
            />

            {remaining > 0 && (
              <>
                {index === 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
                    <span className="text-white font-semibold text-base sm:text-lg">
                      +{remaining}
                    </span>
                  </div>
                )}
              </>
            )}
          </a>
        ))}
      </LightGallery>

      {/* <div className="grid grid-cols-5 gap-2 w-full">
        {visibleImages.map((src, index) => (
          <div
            key={index}
            className="relative w-[calc(400/5)] h-[70px] cursor-pointer"
          >
            <Image
              src={src}
              alt={`Thumbnail ${index}`}
              fill
              className="object-cover "
            />

            {remaining > 0 && (
              <>
                {index === images.length - 1 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center ">
                    <span className="text-white font-semibold text-lg">
                      +{remaining}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProductImage;
