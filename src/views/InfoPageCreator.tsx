import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard'

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
      <SwiperSlide><p style={{marginBottom: '100px'}}>author: Paweł Jarecki</p></SwiperSlide>
      <SwiperSlide><p>email: <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a></p></SwiperSlide>
      <SwiperSlide><p>GitHub repository: <a href="https://github.com/Paveu99" target="_blank">github.com/Paveu99</a></p></SwiperSlide>
    </Swiper>
    {/*<h1>Information about the creator:</h1>*/}
    {/*<p>author: Paweł Jarecki</p>*/}
    {/*<p>email: <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a></p>*/}
    {/*<p>GitHub repository: <a href="https://github.com/Paveu99" target="_blank">github.com/Paveu99</a></p>*/}
  </div>
}