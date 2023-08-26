import React from "react";
import {TradeEntity, WholeTradeEntity } from "types";

interface Props {
    trade: TradeEntity
}
export const SingleFavTrade = (props: Props) => {
    const response = <div>
        {props.trade.symbol}
    </div>

    return (response)
}