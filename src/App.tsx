import React, {useState} from 'react';
import './App.css';
import { SearchContext } from './components/search/SearchContext';
import { SearchComponent } from './components/search/SearchComponent';
import {AllTradesList} from "./components/trades/AllTradesList";

export const App = () => {

    const [search, setSearch] = useState('')

    return (
        <div>
            <SearchContext.Provider value={{search, setSearch}}>
                <AllTradesList/>
            </SearchContext.Provider>
        </div>
    )
}