"use client";
import Image from "next/image";
import React from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const images = [
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/b/a/bac_ho_viet_tuyen_ngon_doc_lap_bia_obi.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
  "https://cdn1.fahasa.com/media/catalog/product/z/6/z6879296494675_70a537fe23016622b5f036060d3cad64.jpg",
];

const ProductImage = () => {
  const visibleImages = images.slice(1, images.length);
  const remaining = images.length > 5 ? images.length - 6 : 0;
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className="flex flex-col gap-4  w-[400px]  items-center">
      {/* Hình chính */}

      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="flex  justify-between flex-wrap  w-full "
      >
        <a
          className="relative w-full h-[376px] cursor-pointer"
          href={images[0]}
          data-src={images[0]}
        >
          <Image
            src={images[0]}
            alt="Main product"
            fill
            className="object-contain"
          />
        </a>
        {visibleImages.map((image, index) => (
          <a
            href={image}
            data-src={image}
            className={` relative h-[70px] w-[70px] cursor-pointer flex justify-center mt-4 ${
              index < 5 ? "block" : "hidden"
            }`}
            key={index}
          >
            <Image alt={image} src={image} fill />

            {remaining > 0 && (
              <>
                {index === 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center ">
                    <span className="text-white font-semibold text-lg">
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
