import React from "react";
import {NavLink} from "react-router-dom";
import '../styles/Edit.css'


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
            <h3>Are you sure you want to delete your account about that?</h3>
            <p>(this action will permanently delete your data)</p>
            <div className='decision'>
                <button className='download' onClick={logout}>Yes</button>
                <NavLink to="/">
                    <button className='download3'>No</button>
                </NavLink>
            </div>
        </>
    )
}
