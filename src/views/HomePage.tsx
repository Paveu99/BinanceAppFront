import React from "react";
import '../components/styles/HomePage.css'
export const HomePage = () => {
    return <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="animate-charcter">
                    <a href="https://www.binance.com/en" rel="noreferrer" target="_blank">
                        BINANCE APP
                    </a>
                </h3>
            </div>
        </div>
        <div style={{textAlign: "center", fontSize: "25px"}}>
            WEB APPLICATION THAT HELPS YOU FIND INFORMATION ABOUT BINANCE TRADES
        </div>
    </div>
}