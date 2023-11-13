import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard'
import '../components/styles/Slides.css'

export const InfoPageCreator = () => {
  return <div>
    <h1>Information about the creator:</h1>
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
        keyboard
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
    >
      <SwiperSlide>
        <div className='slide'>
          <p className='slide__content'>
            author: Paweł Jarecki
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slide'>
          <p className='slide__content'>
            email: <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slide'>
          <p className='slide__content'>
            GitHub repository: <a href="https://github.com/Paveu99" target="_blank">github.com/Paveu99</a>
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
}