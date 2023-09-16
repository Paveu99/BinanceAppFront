import React, {useState} from "react";
import {TradeEntity} from "types";
import {Modal} from "../modal/Modal";
import up from "../styles/Green_Arrow_Up_Darker.svg.png";
import down from "../styles/900px-Red_Arrow_Down.svg.png";
import '../styles/SingleTrade.css'

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
        {props.trade.symbol} and {props.trade.weightedAvgPrice}
        <button onClick={deleteTrade}>Delete</button>
        <button onClick={() => setOpenModal(!openModal)}>Show modal</button>
        <Modal info={props.trade} isOpen={openModal} onClose={() => setOpenModal(false)}/>
        {Number(props.trade.priceChangePercent) > 0 ? <img src={up} style={{width: '30px'}}/> : <img src={down} style={{width: '30px'}}/>}
    </div>

    return (response)
}