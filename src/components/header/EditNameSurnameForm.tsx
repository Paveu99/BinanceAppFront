import React, {FormEvent, useState} from "react";
import {CreateUserReq, UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";
import { NavLink } from "react-router-dom";
import {UpdateEmailType, UpdateNameSurnameType} from "../../../../BinanceAppBack/types/user/user";
import '../styles/Edit.css'

interface Props {
    refresh: () => void
}

export const EditNameSurnameForm = (props: Props) => {

    const [form, setForm] = useState<UpdateNameSurnameType>({
        name: "",
        surname: "",
    })

    const [correct, setCorrect] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        if (!window.confirm(`Are you sure you want to edit details about this account?`)) {
            return;
        }
        if (form.name.length >= 3 && form.surname.length >= 3) {
            setCorrect(true)
            try {
                const res = await fetch(`http://localhost:3001/user/name/${localStorage.getItem('token2')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                const data = await res.json()
                if (data.answer === 'OK') {
                    localStorage.setItem('token', data.name)
                    props.refresh()
                } else {
                    setResultInfo(data.answer)
                }
            } finally {
                setLoading(false);
            }
        } else {
            setCorrect(false)
        }
    }

    if (loading) return <Spinner/>

    const box = <p className="checkAnswer"
                   style={
                       {
                           backgroundColor: `${correct ? 'green' : 'red'}`,
                       }}>
        {
            correct
                ? 'All good now'
                : 'Edit form does not meet requirements'
        }
    </p>

    function refreshPage() {
        window.location.reload();
    }

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={refreshPage}>Try again</button>
        </div>
    }

    return <form autoComplete='off' className="form" onSubmit={checkInput}>
        {submitted && box}
        <p>
            <label>
                Name: <br/>
                <em style={{fontSize: 'x-small'}}>must be at least 3 characters long</em>
                <br/>
                <input
                    type="text"
                    name="name"
                    className="input"
                    value={form.name}
                    onChange={e => change('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Surname: <br/>
                <em style={{fontSize: 'x-small'}}>must be at least 3 characters long</em>
                <br/>
                <input
                    type="text"
                    name="surname"
                    className="input"
                    value={form.surname}
                    onChange={e => change('surname', e.target.value)}
                />
            </label>
        </p>
        <p><button type="submit" className="download2">Change</button></p>
    </form>
}