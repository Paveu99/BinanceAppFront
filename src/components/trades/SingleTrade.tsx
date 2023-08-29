import React, {FormEvent, useState} from "react";
import {TradeEntity, WholeTradeEntity } from "types";
import {json} from "react-router-dom";
import {symbol} from "prop-types";

interface Props {
    trade: WholeTradeEntity
    refresh: () => void
}

export const SingleTrade = (props: Props) => {

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

    return (
        <tr>
            <td><div onClick={updateList}>{props.trade.symbol}</div></td>
        </tr>
    )
}