import React from "react";
import { WholeTradeEntity } from "types";
import {SingleTrade} from "./SingleTrade";


interface Props {
    trades: WholeTradeEntity[],
    refresh: () => void
}

export const AllTradesTable = (props: Props) => {

    const response = <div>
            {
                props.trades
                    .map((el) => {
                        return (<SingleTrade refresh={props.refresh} trade={el} key={el.symbol}/>)
                    })
            }
    </div>
    return (
        response
    )
}