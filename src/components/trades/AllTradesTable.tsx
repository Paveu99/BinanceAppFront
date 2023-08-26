import React from "react";
import { WholeTradeEntity } from "types";
import {SingleTrade} from "./SingleTrade";


interface Props {
    trades: WholeTradeEntity[],
    refresh: () => void
}

export const AllTradesTable = (props: Props) => {

    const response = <>
        <table className='tabel'>
            <thead>
            <tr className="headers">
                <th>Symbol</th>
            </tr>
            </thead>
            <tbody>
            {
                props.trades
                    .map((el) => {
                        return (<SingleTrade refresh={props.refresh} trade={el} key={el.symbol}/>)
                    })
            }
            </tbody>
        </table>
    </>
    return (
        response
    )
}