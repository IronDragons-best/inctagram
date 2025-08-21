'use client'

import * as React from 'react'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { clsx } from 'clsx'

import s from './slider.module.scss'
import '../../../../src/styles/swiperOverrides.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type Props = {
  srcArray: string[]
  navigation?: boolean
  loop?: boolean
  isSmall?: boolean
}

export const Slider = ({ srcArray, navigation = true, loop = true, isSmall = false }: Props) => {
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
      data-isslidersmall={isSmall || undefined}
    >
      {srcArray?.map((src: string) => (
        <SwiperSlide className={s.SwiperSlide} key={src}>
          <Image src={src} width={100} height={100} alt={'photo'} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
