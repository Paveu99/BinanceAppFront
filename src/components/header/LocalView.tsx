import React from "react";
import {NavLink} from "react-router-dom";

export const LocalView = () => {
    const name = localStorage.getItem('token')
    return (
        <div>
            <b style={{padding: '0 10px 0 0'}}>{name}</b>
            <NavLink to="/user/logout">Logout</NavLink>
        </div>
    )
}