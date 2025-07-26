'use client';

import * as React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { clsx } from 'clsx';

import s from './slider.module.scss';
import '../../../../src/styles/swiperOverrides.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  srcArray: StaticImageData[];
  navigation?: boolean;
  loop?: boolean;
};


export const Slider = ({
                         srcArray,
                         navigation = true,
                         loop = true,
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
      className={clsx(s.Swiper, 'mySwiper')}
    >
      {srcArray.map((img: StaticImageData) => (
        <SwiperSlide className={s.SwiperSlide} key={img.src}>
          <Image src={img} alt={'photo'} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};