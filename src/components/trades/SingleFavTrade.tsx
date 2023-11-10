import React, {useState} from "react";
import {TradeEntity} from "types";
import {Modal} from "../modal/Modal";
import up from "../styles/Green_Arrow_Up_Darker.svg.png";
import down from "../styles/900px-Red_Arrow_Down.svg.png";
import '../styles/SingleFavTrade.css'
import { BarChart } from "../modal/Modal3";
import {IData} from "../modal/Modal2";

interface Props {
    trade: TradeEntity
    refresh: () => void
}
export const SingleFavTrade = (props: Props) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [data, setData] = useState<IData[]>([
        {
            label: "Weighted Average Price",
            value: Number(props.trade.weightedAvgPrice)
        },
        {
            label: "Open Price",
            value: Number(props.trade.openPrice)
        },
        {
            label: "Last Price",
            value: Number(props.trade.lastPrice)
        },
        {
            label: "High Price",
            value: Number(props.trade.highPrice)
        },
        {
            label: "Low Price",
            value: Number(props.trade.lowPrice)
        },
    ])
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
        <div className="tradeName2">
            {props.trade.symbol}
        </div>
        <div className="info2">
            <div className="main2">
                <div className="spec2">
                    <div className="desc2">
                        Price Change Percent
                    </div>
                    <div className="value2">
                        {
                            Number(props.trade.priceChangePercent) > 0
                                ? <div>{props.trade.priceChangePercent}%<img src={up} style={{width: '30px', paddingLeft: "10px"}}/></div>
                                : <div>{props.trade.priceChangePercent}%<img src={down} style={{width: '30px', paddingLeft: "10px"}}/></div>
                        }
                    </div>
                </div>
                <hr/>
                <div className="spec2">
                    <div className="desc2">
                        Weighted Average Price
                    </div>
                    <div className="value2">
                        {props.trade.weightedAvgPrice}
                    </div>
                </div>
            </div>
            <div className="detailed2">
                <div className="upper2">
                    <div className="spec2">
                        <div className="desc2">
                            Open Price
                        </div>
                        <div className="value2">
                            {props.trade.openPrice}
                        </div>
                    </div>
                    <hr/>
                    <div className="spec2">
                        <div className="desc2">
                            Last Price
                        </div>
                        <div className="value2">
                            {props.trade.lastPrice}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="lower2">
                    <div className="spec2">
                        <div className="desc2">
                            High Price
                        </div>
                        <div className="value2">
                            {props.trade.highPrice}
                        </div>
                    </div>
                    <hr/>
                    <div className="spec2">
                        <div className="desc2">
                            Low Price
                        </div>
                        <div className="value2">
                            {props.trade.lowPrice}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="chart">
            <BarChart data={data} sizeX={500} sizeY={150} color={'balck'}></BarChart>
        </div>
        <div className="buttons">
            <button className="button" onClick={deleteTrade}>Delete from favourites</button>
            <button  className="button" onClick={() => setOpenModal(!openModal)}>Calculator</button>
        </div><Modal info={props.trade} isOpen={openModal} onClose={() => setOpenModal(false)}/>
    </div>

    return (response)
}