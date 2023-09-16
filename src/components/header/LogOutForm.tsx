import React from "react";
import {NavLink} from "react-router-dom";

export const LogOutForm = () => {

    const logout = () => {
        localStorage.clear()
        window.location.replace("http://localhost:3000");
    }

    return (<>
            <h1>Are you sure about that?</h1>
            <div className='decision'>
                <button className='submitbutton' onClick={logout}>Yes</button>
                <NavLink to="/">
                    <button className='submitbutton'>No</button>
                </NavLink>
            </div>
        </>
    )
}
