import React, {useState} from 'react';
import './App.css';
import { SearchContext } from './components/search/SearchContext';
import { SearchComponent } from './components/search/SearchComponent';
import {AllTradesList} from "./components/trades/AllTradesList";
import {RegForm} from "./components/logreg/RegForm";
import {LogForm} from "./components/logreg/LogForm";

export const App = () => {

    const [search, setSearch] = useState('')

    const refreshMath = () => {
        window.location.replace("http://localhost:3000");
    }

    return (
        <div>
            <SearchContext.Provider value={{search, setSearch}}>
                {/*<AllTradesList/>*/}
                {/*<RegForm/>*/}
                <LogForm refresh={refreshMath}/>
            </SearchContext.Provider>
        </div>
    )
}