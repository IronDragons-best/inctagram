"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../../src/styles/swiperOverrides.scss";
import s from "./slider.module.scss";

type Props = {
  srcArray: string[];
  // srcArray: string[] | StaticImageData[];
  navigation?: boolean;
  loop?: boolean;
  isSmall?: boolean;
};

export const Slider = ({ srcArray,
                         navigation = true,
                         loop = true,
                         isSmall = false,
}: Props) => {
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
      {srcArray.map((src: string) => (
        <SwiperSlide className={s.SwiperSlide} key={src}>
          <Image src={src} alt={"photo"} fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
