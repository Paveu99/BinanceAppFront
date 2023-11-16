import '../components/styles/InfoPage.css';
import el1 from '../components/styles/Screenshots/Main Page.png';
import el2 from '../components/styles/Screenshots/Creator Tab.png';
import el3 from '../components/styles/Screenshots/Login.png';
import el4 from '../components/styles/Screenshots/Reg.png';
import el5 from '../components/styles/Screenshots/Trade - fav.png';
import el6 from '../components/styles/Screenshots/Trade - all.png';
import el7 from '../components/styles/Screenshots/Trade - all - calc.png';
import el8 from '../components/styles/Screenshots/Trade - all - more info.png';
import el9 from '../components/styles/Screenshots/Edit-name.png';
import el10 from '../components/styles/Screenshots/Edit-email.png';
import el11 from '../components/styles/Screenshots/Edit-delete.png';
import el12 from '../components/styles/Screenshots/Logout.png';
import el13 from '../components/styles/Screenshots/kisspng-arrow-icon-right-arrow-png-image-5a7589d1736ad5.3965963915176524334728.png';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Keyboard} from 'swiper/modules';
export const InfoPage = () => {
  return (
      <>
        <Swiper
            modules={[Pagination, Navigation, Keyboard]}
            pagination={{
              type: 'fraction',
              clickable: true
            }}
            keyboard
            navigation={true}
            className="mySwiper"
            spaceBetween={0}
            slidesPerView={1}
        >
          <SwiperSlide className="slide2">
            <div className="slide2__desc">
              <h1>Information about the application:</h1>
              <p>It is a web application, that uses Binance API to help you gather data about cryptocurrencies. Web app gives you opportunity to check values of chosen cryptocurrencies and how they convert to different cryptocurrencies.</p>
              <p>By using build in calculator and opportunity to add your favourites, you can log in to check how the market is looking.</p>
              <p>Information comes from: <a href="https://api2.binance.com/api/v3/ticker/24hr" target="_blank">https://api2.binance.com/api/v3/ticker/24hr</a>.</p>
              <div className="slide2__direction">
                <p>Swipe right for tutorial</p>
                <img src={el13} style={{width: '1px'}} alt=""/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el1} title="Main Page" alt="Main Page"/>
            <br/>
            <div className="description">
            Home page, in which by clicking on BINANCE you will be redirected to the binance.com.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el2} title="Creator Page" alt="Creator Page"/>
            <br/>
            <div className="description">
              Creator page, in which information about the creator and how to contact him can be found.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el3} title="Log in" alt="Log in"/>
            <br/>
            <div className="description">
              Log in view - can be seen by clicking on "Log in" button in top-right corner of your screen.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el4} title="Register" alt="Register"/>
            <br/>
            <div className="description">
              Register - can be seen by clicking on "Log in" button and later on by clicking on "Registration".
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el5} title="Favourite Trades" alt="Favourite Trades"/>
            <br/>
            <div className="description">
              After you logged in and click on "Trades" tab you will be redirected.
              At the very top your favourite trades can be seen.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el6} title="All trades" alt="All trades"/>
            <br/>
            <div className="description">
              All trades - if you would like to search for specific type of trade you can look for it by using search field and filters.
              Depending on what you are looking for exactly a report can be generated.
              If you would like report containing all of trades, please leave search field empty, but if you are interested in specific trades,
              only trades put in the search filed will be generated in the Excel type report.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el7} title="Calculator" alt="Calculator"/>
            <br/>
            <div className="description">
              Calculator is a tool which allows you to convert value of one currency into the another.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el8} title="More info" alt="More info"/>
            <br/>
            <div className="description">
              More info, in "All trades" view, tells you more about the actual relation between currencies.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el9} title="Edit - name and surname" alt="Edit - name and surname"/>
            <br/>
            <div className="description">
              By clicking on your name in the top-right corner of the page you are able to go to edit view.
              First view is connected to editing your name and surname. By following guidelines you can change them immediately.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el10} title="Edit - emial" alt="Edit - emial"/>
            <br/>
            <div className="description">
              By clicking on the "Email" button you will be able to see a form which allows user to change his/her email.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el11} title="Edit - delete"  alt="Edit - delete"/>
            <br/>
            <div className="description">
              By clicking on "Delete account" button you are able to delete your account.
              You will be asked twice if your really want to the delete it.
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide2">
            <img className="explain" src={el12} title="Add to favourites" alt="Add to favourites"/>
            <br/>
            <div className="description">
              If you have less than 5 trades added to favourite you are able to add more by clicking on "Add to the data base".
            </div>
          </SwiperSlide>

          <SwiperSlide>

          </SwiperSlide>
          <SwiperSlide>

          </SwiperSlide>
        </Swiper>
      </>
  );
}