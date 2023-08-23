import React from "react";
import { WholeTradeEntity } from "types";
import {SingleTrade} from "./SingleTrade";


interface Props {
    trades: WholeTradeEntity[],
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
                        return (<SingleTrade trade={el} key={el.symbol}/>)
                    })
            }
            </tbody>
        </table>
    </>
    return (
        response
    )
}