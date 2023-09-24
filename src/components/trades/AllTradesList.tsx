import React, {useContext, useEffect, useRef, useState} from "react";
import {TradeEntity, WholeTradeEntity} from "../../../../BinanceAppBack/types/trade/trade.entity";
import {Spinner} from "../spinner/Spinner";
import {SearchContext} from "../search/SearchContext";
import {Pagination} from "./Pagination";
import {AllTradesTable} from "./AllTradesTable";
import {SearchComponent} from "../search/SearchComponent";
import { FavouriteTrades } from "./FavouriteTrades";
import '../styles/Filters.css'
import down from "../styles/toppng.com-up-arrow-top-image-png-white-392x241.png";
import { DownloadBttn } from "../download/DownloadBttn";

export const AllTradesList = () => {

    const ref1 = useRef<null | HTMLHeadingElement>(null);
    const ref2 = useRef<null | HTMLHeadingElement>(null);
    const handleClick = () => {
        ref1.current?.scrollIntoView({behavior: 'smooth'});
    };

    const handleClick2 = () => {
        ref2.current?.scrollIntoView({behavior: 'smooth'});
    };
    const {search} = useContext(SearchContext)

    const [option, setOption] = useState<string>('includes')
    const [option2, setOption2] = useState<string>('A-Z')
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(21);
    const [tradeList, setTradeList] = useState<WholeTradeEntity[] | null>(null);
    const [favoutireTradeList, setFavouriteTradeList] = useState <TradeEntity[] | null>(null)
    
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
        console.log(data.favourite)
        setFavouriteTradeList(data.favourite.filter(function (el: TradeEntity) {
            return el.userId === localStorage.getItem('token2')
        }))
    }


    useEffect(() => {
        refreshList()
        refreshFavouriteList()
    }, [])

    if (tradeList === null) {
        return <div style={{textAlign: "center", margin: "100px"}}>
            <Spinner/>
        </div>
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

    if (option2 === "A-Z") {
        filteredTrades = filteredTrades.sort(function (a: WholeTradeEntity, b: WholeTradeEntity) {
            if (a.symbol < b.symbol) {
                return -1;
            }
            if (a.symbol > b.symbol) {
                return 1;
            }
            return 0;
        })
    } else if (option2 === 'Z-A') {
        filteredTrades = filteredTrades.sort(function (a: WholeTradeEntity, b: WholeTradeEntity) {
            if (a.symbol < b.symbol) {
                return 1;
            }
            if (a.symbol > b.symbol) {
                return -1;
            }
            return 0;
        })
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

    const allTrades = <AllTradesTable refresh={refreshFavouriteList} trades={currentPosts} favsLen={favoutireTradeList?.length as number}/>

    return <div style={{textAlign: "center", marginTop: "20px", justifyContent: "center"}}>
        <h2 ref={ref2}>
            Your favourite trades
            <img className="arrowDown" onClick={handleClick} src={down} style={{marginLeft: "10px", width: '30px', transform: 'rotate(180deg)'}} title="Go to All Trades" />
        </h2>
        {!favoutireTradeList ? <Spinner/> : <div><FavouriteTrades refresh = {refreshFavouriteList} faves={favoutireTradeList}/></div>}
        <br/>
        <h2 ref={ref1}>
            All trades
            <img className="arrowUp" onClick={handleClick2} src={down} style={{marginLeft: "10px", width: '30px'}} title="Go to Your Favourite Trades" />
        </h2>
        <SearchComponent page={() => setCurrentPage(1)}/>
        <div className="label">Filters:</div>
        <div className="select">
                <select className="select1" onChange={(e) => setOption(e.target.value)}>
                    <option value='includes'>Includes</option>
                    <option value='startsWith'>Starts with</option>
                    <option value='endsWith'>Ends with</option>
                </select>
                <select className="select2" onChange={(e) => setOption2(e.target.value)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
        </div>
        <DownloadBttn trades={filteredTrades}/>
        {filteredTrades.length === 0 ? noRseults : allTrades}
        <Pagination
            paginate={paginate}
            totalPosts={filteredTrades.length}
            postsPerPage={postsPerPage}
            page = {currentPage}
        />
    </div>

}