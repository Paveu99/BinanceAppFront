import React, {useContext, useEffect, useState} from "react";
import {TradeEntity, WholeTradeEntity} from "../../../../BinanceAppBack/types/trade/trade.entity";
import {Spinner} from "../spinner/Spinner";
import {SearchContext} from "../search/SearchContext";
import {Pagination} from "./Pagination";
import {AllTradesTable} from "./AllTradesTable";
import {SearchComponent} from "../search/SearchComponent";
import { FavouriteTrades } from "./FavouriteTrades";

export const AllTradesList = () => {

    const {search} = useContext(SearchContext)

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(20);
    const [tradeList, setTradeList] = useState<WholeTradeEntity[] | null>(null);
    const [favoutireTradeList, setFavouriteTradeList] = useState <TradeEntity[] | null>(null)

    const refreshList = async () => {
        setTradeList(null)
        const res = await fetch('http://localhost:3001/trades');
        const data = await res.json();
        setTradeList(data.trades)
    };

    const refreshFavouriteList = async () => {
        setFavouriteTradeList(null)
        const res = await fetch('http://localhost:3001/trades');
        const data = await res.json()
        setFavouriteTradeList(data.favouriteData)
    }


    useEffect(() => {
        refreshList()
        refreshFavouriteList()
    }, [])

    if (tradeList === null) {
        return <Spinner/>
    }

    const filteredTrades = tradeList.filter(
        trade => {
            return (
                trade
                    .symbol
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }
    );


    const noRseults = <div className="failureres">
        No results
    </div>

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredTrades.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const allTrades = <AllTradesTable refresh={refreshFavouriteList} trades={currentPosts}/>

    return <div>
        {!favoutireTradeList ? <Spinner/> : <FavouriteTrades faves={favoutireTradeList}/>}
        <SearchComponent page={() => setCurrentPage(1)}/>
        {filteredTrades.length === 0 ? noRseults : allTrades}
        <Pagination
            paginate={paginate}
            totalPosts={filteredTrades.length}
            postsPerPage={postsPerPage}
            page = {currentPage}
        />
    </div>

}