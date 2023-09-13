import React, {useEffect, useState} from "react";
import { LocalView } from "./LocalView";
import {Link, NavLink} from "react-router-dom";
import '../styles/Header.css'

export const Header = () => {
    const [test, setTest] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (await localStorage.getItem('token')) {
                setTest(true)
            }
        })()
    }, [])

    const login = <Link className="link" style={{textDecoration: "none"}} to="/user">Login</Link>

    const user = <LocalView/>

    return (
        <header className='header'>
            <div className='subdiv'>
                <h1 className="title">Binance App</h1>
                {test ? user : login}
            </div>
            <hr/>
            <div className="subdiv2">
                <Link className="link2" style={{textDecoration: "none"}} to="/">Main page</Link>
                <Link className="link2" style={{textDecoration: "none"}} to="/info">Instruction</Link>
                <Link className="link2" style={{textDecoration: "none"}} to="/infoCreator">Creator</Link>
                {test && <Link className="link2" style={{textDecoration: "none"}} to="/trades">Trades</Link>}
            </div>
            <hr/>
        </header>
    )
}