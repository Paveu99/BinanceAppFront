import React from "react";
import {NavLink} from "react-router-dom";

export const LocalView = () => {
    const name = localStorage.getItem('token')
    return (
        <div>
            <b style={{padding: '0 10px 0 10px'}}>
                <NavLink to="/user/edit">{name}</NavLink>
            </b>
            |
            <b style={{padding: '0 10px 0 10px'}}>
                <NavLink to="/user/logout">Logout</NavLink>
            </b>
        </div>
    )
}