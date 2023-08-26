import React from "react";
import { WholeTradeEntity } from "types";

interface Props {
    trade: WholeTradeEntity
    refresh: () => void
}

export const SingleTrade = (props: Props) => {

    const cosiek = props.refresh

    return (
        <tr>
            <td><div onClick={cosiek}>{props.trade.symbol}</div></td>
        </tr>
    )
}