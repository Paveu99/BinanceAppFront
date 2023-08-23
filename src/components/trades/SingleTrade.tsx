import React from "react";
import { WholeTradeEntity } from "types";

interface Props {
    trade: WholeTradeEntity
}

export const SingleTrade = (props: Props) => {

    return (
        <tr>
            <td>{props.trade.symbol}</td>
        </tr>
    )
}