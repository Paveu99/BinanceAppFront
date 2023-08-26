import React, {useEffect, useState} from "react";
import { LocalView } from "./LocalView";
import { NavLink } from "react-router-dom";

export const Header = () => {
    const [test, setTest] = useState<boolean>(false);
    const colorOfLink = ({isActive}: {
        isActive: boolean
    }) => ({color: isActive ? 'green' : 'red'})


    useEffect(() => {
        (async () => {
            if (await localStorage.getItem('token')) {
                setTest(true)
            }
        })()
    }, [])

    const login = <NavLink style={colorOfLink} to="/user">Login</NavLink>

    const user = <LocalView/>

    return (
        <div className='header'>
            <div className='subdiv'>
                <h1>Binance App</h1>
                {test ? user : login}
            </div>
            <div>
                <NavLink className='link1' style={colorOfLink} to="/">Main page</NavLink>
                | <NavLink className='link2' style={colorOfLink} to="/info">Instruction</NavLink>
                {test && <>
                    | <NavLink className='link3' style={colorOfLink} to="/trades">Trades</NavLink>
                </>}
                <hr/>
            </div>
        </div>
    )
}