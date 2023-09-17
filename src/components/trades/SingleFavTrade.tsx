import React, {useState} from "react";
import {TradeEntity} from "types";
import {Modal} from "../modal/Modal";
import up from "../styles/Green_Arrow_Up_Darker.svg.png";
import down from "../styles/900px-Red_Arrow_Down.svg.png";

interface Props {
    trade: TradeEntity
    refresh: () => void
}
export const SingleFavTrade = (props: Props) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const deleteTrade = async () => {
        if (!window.confirm(`Are you sure you want to remove this trade`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/trades/${props.trade.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occured: ${error.message}`);
            return
        }

        props.refresh()
    }

    const response = <div className="singleFavTrade">
        <div className="overalInfo">
            <div className="tradeName">
                {props.trade.symbol}
            </div>
        </div>
        <div className="info">
            <div className="main">
                <div className="spec">
                    <div className="desc">
                        Price Change Percent
                    </div>
                    <div className="value">
                        {
                            Number(props.trade.priceChangePercent) > 0
                                ? <div>{props.trade.priceChangePercent}%<img src={up} style={{width: '30px', paddingLeft: "10px"}}/></div>
                                : <div>{props.trade.priceChangePercent}%<img src={down} style={{width: '30px', paddingLeft: "10px"}}/></div>
                        }
                    </div>
                </div>
                <hr/>
                <div className="spec">
                    <div className="desc">
                        Weighted Average Price
                    </div>
                    <div className="value">
                        {props.trade.weightedAvgPrice}
                    </div>
                </div>
            </div>
            <div className="detailed">
                <div className="upper">
                    <div className="spec">
                        <div className="desc">
                            Open Price
                        </div>
                        <div className="value">
                            {props.trade.openPrice}
                        </div>
                    </div>
                    <hr/>
                    <div className="spec">
                        <div className="desc">
                            Last Price
                        </div>
                        <div className="value">
                            {props.trade.lastPrice}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="lower">
                    <div className="spec">
                        <div className="desc">
                            High Price
                        </div>
                        <div className="value">
                            {props.trade.highPrice}
                        </div>
                    </div>
                    <hr/>
                    <div className="spec">
                        <div className="desc">
                            Low Price
                        </div>
                        <div className="value">
                            {props.trade.lowPrice}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className="button" onClick={deleteTrade}>Delete</button>
        <button  className="button" onClick={() => setOpenModal(!openModal)}>Show modal</button>
        <Modal info={props.trade} isOpen={openModal} onClose={() => setOpenModal(false)}/>
    </div>

    return (response)
}