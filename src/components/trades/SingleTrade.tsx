import React, {FormEvent, useState} from "react";
import {TradeEntity, WholeTradeEntity } from "types";
import '../styles/Modal.css'
import {Modal} from "../modal/Modal";
import up from '../styles/Green_Arrow_Up_Darker.svg.png'
import down from '../styles/900px-Red_Arrow_Down.svg.png'

interface Props {
    trade: WholeTradeEntity
    refresh: () => void
    favs: number
}

export const SingleTrade = (props: Props) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [form, setForm] = useState<TradeEntity>({
        symbol: props.trade.symbol,
        userId: localStorage.getItem('token2') as string,
        weightedAvgPrice: props.trade.weightedAvgPrice,
        priceChangePercent: props.trade.priceChangePercent,
    })
    const updateList = async (e: FormEvent) =>{
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3001/trades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
            console.log(await res.json())
        } finally {
            props.refresh()
        }
    }

    return <div>
        {props.trade.symbol}
        {props.favs >= 5 ? '' : <button onClick={updateList}>Add to the data base</button>}
        <button onClick={() => setOpenModal(!openModal)}>Show modal</button>
        <Modal info={props.trade} isOpen={openModal} onClose={() => setOpenModal(false)}/>
        {Number(props.trade.priceChangePercent) > 0 ? <img src={up} style={{width: '30px'}}/> : <img src={down} style={{width: '30px'}}/>}
    </div>
}