import React from "react";
import {TradeEntity, WholeTradeEntity } from "types";

interface Props {
    trade: TradeEntity
    refresh: () => void
}
export const SingleFavTrade = (props: Props) => {

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

    const response = <div>
        {props.trade.symbol} and {props.trade.weightedAvgPrice} <button onClick={deleteTrade}>Delete</button>
    </div>

    return (response)
}