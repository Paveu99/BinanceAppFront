import React, {FormEvent, useState} from "react";
import {CreateUserReq, UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";
import { NavLink } from "react-router-dom";
import {UpdateEmailType} from "../../../../BinanceAppBack/types/user/user";
import '../styles/Edit.css'


interface Props {
    refresh: () => void
}

export const EditEmailForm = (props: Props) => {

    const [form, setForm] = useState<UpdateEmailType>({
        email: "",
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
        if (form.email.includes('@')) {
            setCorrect(true)
            try {
                const res = await fetch(`http://localhost:3001/user/email/${localStorage.getItem('token2')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                const data = await res.json()
                if (data.answer === 'OK') {
                    localStorage.setItem('token3', data.email)
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
                e-mail: <br/>
                <em style={{fontSize: 'x-small'}}>must contain "@"</em>
                <br/>
                <input
                    type="text"
                    name="email"
                    className="input"
                    value={form.email}
                    onChange={e => change('email', e.target.value)}
                />
            </label>
        </p>
        <p><button type="submit" className="download2">Change</button></p>
    </form>
}