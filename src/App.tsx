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
import {LogOutForm} from "./components/header/LogOutForm";
import {DeleteUserForm} from "./components/header/DeleteUserForm";
import {EditUserView} from "./components/header/EditUserForm";

export const App = () => {

    const [search, setSearch] = useState('')

    const refresh = () => {
        window.location.replace("http://localhost:3000/user/edit");
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
                    <Route path='/user/logout' element={<LogOutForm/>}/>
                    <Route path='/user/edit' element={<EditUserView refresh={refresh}/>}/>
                    <Route path='/user/delete' element={<DeleteUserForm id={localStorage.getItem('token2') as string}/>}/>
                    <Route path='*' element={<NotFoundView/>}/>
                </Routes>
            </SearchContext.Provider>
        </div>
    )
}