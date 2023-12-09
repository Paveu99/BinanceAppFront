import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard'
import '../components/styles/Slides.css'
import el1 from '../components/styles/Screenshots/Profile.jpg'
import el2 from '../components/styles/Screenshots/Paweł Jarecki - photo.jpg'
import el3 from '../components/styles/Screenshots/4672500.png'

export const InfoPageCreator = () => {
  return <div className="about-me">
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
          <img className="picture1" src={el2} alt="Profile picture"/>
          <div className="about">
            <h2>Author: Paweł Jarecki</h2>
            <p className="precise">
              Hi, I am graduate from Wroclaw University of Science and Technology, who is very passionate about new technologies and programming.
              I am working as a Technology Analyst at UBS.
              My preferable choice of programming language is JavaScript/TypeScript. I love working with React and MySQL, with which I created couple of projects that you can view on my GitHub repository.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slide'>
          <img className="picture" src={el3} alt="Gmail pic"/>
          <div className="about">
            <h2>email: <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a></h2>
            <p className="precise">
              Here is my email in case you would like to contact me.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='slide'>
          <img className="picture1" src={el1} alt="Gmail pic"/>
          <div className="about">
            <h2>GitHub repository: <a href="https://github.com/Paveu99" target="_blank">github.com/Paveu99</a></h2>
            <p className="precise">
              Here is a link to my GitHub repository in case you would like to see a little bit more of my projects. Hope you will find inspiration or help over there.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
}