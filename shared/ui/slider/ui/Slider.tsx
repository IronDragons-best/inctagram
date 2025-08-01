"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { clsx } from "clsx";
import s from "./slider.module.scss";
import "../../../../src/styles/swiperOverrides.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  srcArray: string | StaticImageData | (string | StaticImageData)[];
  navigation?: boolean;
  loop?: boolean;
  isSmall?: boolean;
};

export const Slider = ({ srcArray, navigation = true, loop = true }: Props) => {
  const toArray = (
    input: Props['srcArray']
  ): (string | StaticImageData)[] => {
    if (!input) return [];
    return Array.isArray(input) ? input : [input];
  };
  
  const images = toArray(srcArray);
  
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={loop}
      pagination={{
        clickable: true,
      }}
      navigation={navigation}
      modules={[Pagination, Navigation]}
      className={clsx(s.Swiper, "mySwiper")}
      data-isslidersmall={isSmall || undefined}
    >
      {images.map((img, index) => {
        const src = typeof img === "string" ? img : img.src;
        return (
          <SwiperSlide className={s.SwiperSlide} key={src}>
            <img
              src={src}
              alt={`slide-${index}`}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
