import React from "react";
import {Link, NavLink} from "react-router-dom";
import '../styles/Header.css'

export const LocalView = () => {
    const name = localStorage.getItem('token')
    return (
        <div>
            <b>
                <Link className="link" style={{textDecoration: "none"}} to="/user/edit">{name}</Link>
            </b>
            |
            <b>
                <Link className="link" style={{textDecoration: "none"}} to="/user/logout">Log out</Link>
            </b>
        </div>
    )
}