import React, {useEffect, useState} from "react";
import {TradeEntity} from "types";
import {SingleFavTrade} from "./SingleFavTrade";
import {Spinner} from "../spinner/Spinner";

interface Props {
    faves: TradeEntity[]
}

export const FavouriteTrades = (props: Props) => {
 //TODO: UMIEŚCIĆ W TYM MIEJSCU PODOBNY KOD JEDNAKŻE Z DOSTĘPEM DO TOKENA FILTRUJĄCEGO

    //TODO NALEZY ZBUDOWAC KOMPONENT I UMIESCIC NA NIM ODPOWIEDNIE ELEMENTY TAKIE JAK ADD TO FAVOURITE BUTTON
    // A MOŻE ZROBIĆ JEDEN WIELKI ELEMENT KTORYM BEDZIE CALA JAKBY LISTA TO POMOZE W ODSWIERZANIU ale NP OSOBNY ELEMENT
    // TO ODSWIERZANIA KAZDEJ Z RZECZY BO NIE MA SENSU PO KLIKNIECIU ODSWIERZAC TEZ GLOWNEJ LISTY ALE TO JESZCZE SIE ZOBACZY NA NECIE JAK ONI TO ROBIA
    // DAC LIMITER JEZELI CHODZI O ILOSC ULUBIONYCH DLA DANEJ OSOBY

    //SPROBOWAC ZLACZYC OBA KOMPONENTY A NASTEPNIE DO W HEADEREZ JEST POKAZANE JAK PO ZALOGOWANIU MA SIE POKAZA WIECEJ RZECZY NIZ DLA NIEZALOGOWANEGO UZYTKOWNIKA
    //MEMO MOZE BYC PRZYDATNE DLA PAGINUJACYCH ELEMENTOW I OGOLNIE DO LISTY TRADOW
    // const [favoutireTradeList, setFavouriteTradeList] = useState <TradeEntity[] | null>(null)
    //
    // const refreshFavouriteList = async () => {
    //     setFavouriteTradeList(null)
    //     const res = await fetch('http://localhost:3001/trades');
    //     const data = await res.json()
    //     setFavouriteTradeList(data.favouriteData)
    // }
    //
    // useEffect(() => {
    //     refreshFavouriteList()
    // }, [])

    // if (favoutireTradeList === null) {
    //     return <Spinner/>
    // }

    const componentWithFavTrades = <div>
        {props.faves
            .map((el: TradeEntity) => {
                return (<SingleFavTrade trade={el} key={el.id}/>)
            })}
    </div>

    const favTrades = <div>
        <div>
            No to tutaj są ulubione trady
        </div>
        {props.faves.length === 0 ? <div>Add favourite components</div> : componentWithFavTrades}
    </div>

    return (favTrades)
}