import React from "react";
import {TradeEntity, WholeTradeEntity } from "types";
import {SingleTrade} from "./SingleTrade";
import '../styles/SingleTrade.css'


interface Props {
    trades: WholeTradeEntity[],
    refresh: () => void,
    favsLen: number,
    favs: TradeEntity[]
}

export const AllTradesTable = (props: Props) => {

    const response = <div className="rootek">
            {
                props.trades
                    .map((el) => {
                        return (<SingleTrade refresh={props.refresh} trade={el} key={el.symbol} favsLen={props.favsLen} favs={props.favs}/>)
                    })
            }
    </div>
    return (
        response
    )
}