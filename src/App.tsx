import React, {useState} from 'react';
import './App.css';
import { SearchContext } from './components/search/SearchContext';
import { SearchComponent } from './components/search/SearchComponent';
import {AllTradesList} from "./components/trades/AllTradesList";
import {RegForm} from "./components/logreg/RegForm";
import {LogForm} from "./components/logreg/LogForm";
import {FavouriteTrades} from "./components/trades/FavouriteTrades";
import { Header } from './components/header/Header';
import {Route, Routes } from 'react-router-dom';
import {HomePage} from "./views/HomePage";
import {InfoPage} from "./views/InfoPage";
import {TradePage} from "./views/TradePage";
import {LogRegPage} from "./views/LogRegPage";
import {NotFoundView} from "./views/NotFoundView";

export const App = () => {

    const [search, setSearch] = useState('')

    const refreshMath = () => {
        window.location.replace("http://localhost:3000");
    }

    return (
        <div>
            <SearchContext.Provider value={{search, setSearch}}>
                <Header/>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/info' element={<InfoPage/>}/>
                    <Route path='/trades' element={<TradePage/>}/>
                    <Route path='/user' element={<LogRegPage/>}/>
                    <Route path='/user/logout'/>
                    <Route path='*' element={<NotFoundView/>}/>
                </Routes>
                {/*<FavouriteTrades/>*/}
                {/*<AllTradesList/>*/}
                {/*<LogForm refresh={refreshMath}/>*/}
            </SearchContext.Provider>
        </div>
    )
}