import React, {FormEvent, useState} from "react";
import {CreateUserReq, UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";
import { NavLink } from "react-router-dom";
import { EditNameSurnameForm } from "./EditNameSurnameForm";
import { EditEmailForm } from "./EditEmailForm";
import {EditView} from "./EditView";

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

    return <div>
        <p>What would you like to edit?</p>
        <button style={{margin: '10px'}} onClick={() => change('form', 'name')}>Name and surname</button>
        <button style={{margin: '10px'}} onClick={() => change('form', 'email')}>Email</button>
        <button style={{margin: '10px'}} onClick={() => change('form', 'delete')}>Delete account</button>
        <EditView refresh={props.refresh} action={action.form}></EditView>
    </div>
}