import React, {useState} from "react";
import {EditNameSurnameForm} from "./EditNameSurnameForm";
import {DeleteUserForm} from "./DeleteUserForm";
import {EditEmailForm} from "./EditEmailForm";

interface Props {
    action: string
    refresh: () => void
}

export const EditView = (props: Props) => {

    if (props.action === 'name') {
        return <EditNameSurnameForm refresh={props.refresh}/>
    }
    if (props.action === 'email') {
        return <EditEmailForm refresh={props.refresh}/>
    }
    if (props.action === 'delete') {
        return <DeleteUserForm id={localStorage.getItem('token2') as string}/>
    }

    return <>
    </>
}