import React, {FormEvent, useState} from "react";
import {TradeEntity, WholeTradeEntity } from "types";
import '../styles/Modal.css'
import {Modal} from "../modal/Modal";
import up from '../styles/Green_Arrow_Up_Darker.svg.png'
import down from '../styles/900px-Red_Arrow_Down.svg.png'
import '../styles/SingleTrade.css'
import {Modal2} from "../modal/Modal2";

interface Props {
    trade: WholeTradeEntity
    refresh: () => void
    favsLen: number
    favs: TradeEntity[]
}

export const SingleTrade = (props: Props) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openModal2, setOpenModal2] = useState<boolean>(false)
    const [form, setForm] = useState<TradeEntity>({
        symbol: props.trade.symbol,
        userId: localStorage.getItem('token2') as string,
        weightedAvgPrice: props.trade.weightedAvgPrice,
        priceChangePercent: props.trade.priceChangePercent,
        openPrice: props.trade.openPrice,
        highPrice: props.trade.highPrice,
        lowPrice: props.trade.lowPrice,
        lastPrice: props.trade.lastPrice
    })
    const updateList = async (e: FormEvent) =>{
        e.preventDefault()
        try {
            await fetch('http://localhost:3001/trades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
        } finally {
            props.refresh()
        }
    }

    const contain = () => {
        if (props.favs) {
            for (const el of props.favs) {
                if (el.symbol === form.symbol) {
                    return true
                }
            }
        }
    }

    return <div className="singleTrade">
        <div className="overalInfo">
            <div className="tradeName">
                {props.trade.symbol}
            </div>
            <div className="priceChange">
                {
                    Number(props.trade.priceChangePercent) > 0
                        ? <div>{props.trade.priceChangePercent}%<img src={up} style={{width: '30px', paddingLeft: "10px"}}/></div>
                        : <div>{props.trade.priceChangePercent}%<img src={down} style={{width: '30px', paddingLeft: "10px"}}/></div>
                }
            </div>
        </div>
        <div className="options">
            {(props.favsLen >= 5 || contain()) ? '' : <button className="button1" onClick={updateList}>Add to your favourites</button>}
            <button className="button2" onClick={() => setOpenModal(!openModal)}>Calculator</button>
            <button className="button2" onClick={() => setOpenModal2(!openModal)}>More info</button>
            <Modal info={props.trade} isOpen={openModal} onClose={() => setOpenModal(false)}/>
            <Modal2 info={props.trade} isOpen={openModal2} onClose={() => setOpenModal2(false)}/>
        </div>
    </div>
}