import React, {useEffect, useState} from "react";
import {TradeEntity} from "types";
import {SingleFavTrade} from "./SingleFavTrade";
import {Spinner} from "../spinner/Spinner";

interface Props {
    faves: TradeEntity[]
    refresh: () => void
}

export const FavouriteTrades = (props: Props) => {

    const componentWithFavTrades = <div>
        {props.faves
            .map((el: TradeEntity) => {
                return (<SingleFavTrade refresh={props.refresh} trade={el} key={el.id}/>)
            })}
    </div>

    const favTrades = <div>
        <h2>
            Favourite trades
        </h2>
        {props.faves.length === 0 ? <div>Add favourite components</div> : componentWithFavTrades}
    </div>

    return (favTrades)
}