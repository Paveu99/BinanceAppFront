import React, {useEffect, useState} from "react";
import { LocalView } from "./LocalView";
import {Link, NavLink} from "react-router-dom";
import '../styles/Header.css'

export const Header = () => {
    const [test, setTest] = useState<boolean>(false);

    const styleOfLink = ({isActive}: {
        isActive: boolean
    }
    ) => (
        {
            color: isActive ? "#a61b19" : '',
            backgroundColor: isActive ? "#fff" : '',
            padding: isActive ? "0px 150px" : "0px 100px",
        }
        )

    useEffect(() => {
        (async () => {
            if (await localStorage.getItem('token')) {
                setTest(true)
            }
        })()
    }, [])

    const login = <Link className="link" style={{textDecoration: "none"}} to="/user">Log in</Link>

    const user = <LocalView/>

    return (
        <header className='header'>
            <div className='subdiv'>
                <h1 className="title">BINANCE APP</h1>
                <div className="info">
                    {test ? user : login}
                </div>
            </div>
            <hr/>
            <div className="subdiv2">
                <NavLink className="link2" style={styleOfLink} to="/">Main page</NavLink>
                <NavLink className="link2" style={styleOfLink} to="/info">Instruction</NavLink>
                <NavLink className="link2" style={styleOfLink} to="/infoCreator">Creator</NavLink>
                {test && <NavLink className="link2" style={styleOfLink} to="/trades">Trades</NavLink>}
            </div>
            <hr/>
        </header>
    )
}