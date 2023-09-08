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

    const [option, setOption] = useState<string>('includes')
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(20);
    const [tradeList, setTradeList] = useState<WholeTradeEntity[] | null>(null);
    const [favoutireTradeList, setFavouriteTradeList] = useState <TradeEntity[] | null>(null)

    const colorOfLink = ({isActive}: {
        isActive: boolean
    }) => ({color: isActive ? 'green' : 'red'})
    
    const refreshList = async () => {
        setTradeList(null)
        const res = await fetch('http://localhost:3001/trades');
        const data = await res.json();
        setTradeList(data.filteredTrades)
    };

    const refreshFavouriteList = async () => {
        setFavouriteTradeList(null)
        const res = await fetch('http://localhost:3001/trades');
        const data = await res.json()
        setFavouriteTradeList(data.favourite.filter(function (el: TradeEntity) {
            return el.userId === localStorage.getItem('token2')
        }))
    }


    useEffect(() => {
        refreshList()
        refreshFavouriteList()
    }, [])

    if (tradeList === null) {
        return <Spinner/>
    }

    let filteredTrades: WholeTradeEntity[] = []

    if (option === 'startsWith') {
        filteredTrades = tradeList.filter(
            trade => {
                return (
                    trade
                        .symbol
                        .toLowerCase()
                        .startsWith(search.toLowerCase())
                );
            }
        );
    } else if (option === 'includes') {
        filteredTrades = tradeList.filter(
            trade => {
                return (
                    trade
                        .symbol
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );
            }
        );
    } else if (option === 'endsWith') {
        filteredTrades = tradeList.filter(
            trade => {
                return (
                    trade
                        .symbol
                        .toLowerCase()
                        .endsWith(search.toLowerCase())
                );
            }
        );
    }


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
        {!favoutireTradeList ? <Spinner/> : <FavouriteTrades refresh = {refreshFavouriteList} faves={favoutireTradeList}/>}
        <SearchComponent page={() => setCurrentPage(1)}/>
        <label>Filter</label>
        <select onChange={(e) => setOption(e.target.value)}>
            <option value='includes'>Includes</option>
            <option value='startsWith'>Starts with</option>
            <option value='endsWith'>Ends with</option>
        </select>
        {filteredTrades.length === 0 ? noRseults : allTrades}
        <Pagination
            paginate={paginate}
            totalPosts={filteredTrades.length}
            postsPerPage={postsPerPage}
            page = {currentPage}
        />
    </div>

}