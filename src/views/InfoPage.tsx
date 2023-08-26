import React from "react";

export const InfoPage = () => {
  return <div>
    <h1>Information about the application</h1>
    <p>It is a web application, that uses Binance API to help you gather data about cryptocurrencies. Web app gives you opportunity to check values of chosen cryptocurrencies and how they convert to different cryptocurrencies.</p>
    <p>By using build in calculator and opportunity to add your favourites, you can log in to check how the market is looking.</p>
    <p>Information comes from: <a href="https://danepubliczne.imgw.pl" target="_blank">https://api2.binance.com/api/v3/ticker/24hr</a>.</p>
    <br/>
    <h2>Information about the creator</h2>
    <p>author: Paweł Jarecki</p>
    <p>email: <a href="mailto:paweljarecki10@gmail.com?subject=Question&body=Description">paweljarecki10@gmail.com</a></p>
    <p>GitHub repository: <a href="https://github.com/Paveu99" target="_blank">github.com/Paveu99</a></p>
  </div>
}