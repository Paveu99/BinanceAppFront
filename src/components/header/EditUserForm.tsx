import React, {FormEvent, useState} from "react";
import {CreateUserReq, UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";
import { NavLink } from "react-router-dom";
import { EditNameSurnameForm } from "./EditNameSurnameForm";
import { EditEmailForm } from "./EditEmailForm";
import {EditView} from "./EditView";
import '../styles/Edit.css'
import '../styles/DownloadBttn.css'

interface Props {
    refresh: () => void
}

export const EditUserView = (props: Props) => {

    const [action, setAction] = useState({
        form:'',
    })

    const change = (key: string, value: any) => {
        setAction(prevState => ({
            ...prevState,
            [key]: value
        }))
    };

    return <div className="editView">
        <h2>What would you like to edit?</h2>
        <button className="download" style={{margin: '10px'}} onClick={() => change('form', 'name')}>Name and surname</button>
        <button className="download" style={{margin: '10px'}} onClick={() => change('form', 'email')}>Email</button>
        <button className="download" style={{margin: '10px'}} onClick={() => change('form', 'delete')}>Delete account</button>
        <EditView refresh={props.refresh} action={action.form}></EditView>
    </div>
}