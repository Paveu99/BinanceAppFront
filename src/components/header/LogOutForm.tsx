import React from "react";
import {NavLink} from "react-router-dom";
import '../styles/DownloadBttn.css'

export const LogOutForm = () => {

    const logout = () => {
        localStorage.clear()
        window.location.replace("http://localhost:3000");
    }

    return (<div style={{textAlign: 'center'}}>
            <h2>Are you sure about that?</h2>
            <div className='decision'>
                <button className='download' onClick={logout}>Yes</button>
                <NavLink to="/">
                    <button className='download3'>No</button>
                </NavLink>
            </div>
        </div>
    )
}
