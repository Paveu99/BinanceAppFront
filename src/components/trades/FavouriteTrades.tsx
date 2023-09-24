import React from "react";
import {TradeEntity} from "types";
import {SingleFavTrade} from "./SingleFavTrade";

interface Props {
    faves: TradeEntity[]
    refresh: () => void
}

export const FavouriteTrades = (props: Props) => {

    const componentWithFavTrades = <div className="rootek2">
        {props.faves
            .map((el: TradeEntity) => {
                return (<SingleFavTrade refresh={props.refresh} trade={el} key={el.id}/>)
            })}
    </div>

    const favTrades = <div>
        {props.faves.length === 0 ? <div>Add favourite components</div> : componentWithFavTrades}
    </div>

    return (favTrades)
}