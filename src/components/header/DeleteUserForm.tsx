import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
    id: string
}

export const DeleteUserForm = (props: Props) => {

    const logout = async () => {

        if (!window.confirm(`Are you sure you want to remove this account?`)) {
            return;
        }

        const res = await fetch(`http://localhost:3001/user/${props.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occured: ${error.message}`);
            return
        }
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
