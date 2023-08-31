import React, {FormEvent, useState} from "react";
import { UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";
import {RegForm} from "./RegForm";
import { NavLink } from "react-router-dom";

interface Props {
    refresh: () => void
}

export const LogForm = (props: Props) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [correct, setCorrect] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [inputType, setInputType] = useState<string>('password')
    const [formType, setFormType] = useState<string>('logowanie')
    const [loading, setLoading] = useState<boolean>(false);

    const showPassword = (e: FormEvent) => {
        e.preventDefault()
        setInputType('text')
    }

    const hidePassword = (e: FormEvent) => {
        e.preventDefault()
        setInputType('password')
    }

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()
        if (form.email.includes('@') && form.password.length > 0) {
            try {
                const res = await fetch(`http://localhost:3001/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (data.answer === 'OK') {
                    setCorrect(true)
                    props.refresh()
                    localStorage.setItem('token', data.user.name)
                    localStorage.setItem('token2', data.user.id as string)
                    localStorage.setItem('token3', data.user.email as string)
                } else {
                    setSubmitted(true)
                    setCorrect(false)
                }
            } finally {
                setLoading(false);
                setSubmitted(true)
            }
        } else {
            setSubmitted(true)
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
            !correct && 'Try again email/password is incorrect!'
        }
    </p>

    const formik = <form autoComplete='off' className="form" onSubmit={checkInput}>
        {submitted && box}
        <p>
            <label>
                e-mail: <br/>
                <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={e => change('email', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Password: <br/>
                <input
                    type={inputType}
                    name="password"
                    value={form.password}
                    onChange={e => change('password', e.target.value)}
                />
                <button type="reset" onMouseDown={showPassword} onMouseUp={hidePassword} onMouseOut={hidePassword}
                        style={{height: '26px'}}>
                    {inputType === 'password' ? '👁' : '🧿'}
                </button>
            </label>
        </p>
        <button type="submit" className="submitbutton">Zaloguj</button>
    </form>

    return <div className="wholeThing">
        <div className="guidePanel">
            <a className="LoginBttn" href="#" onClick={() => setFormType('logowanie')}>Login</a> | <a
            className="RegBttn" href="#" onClick={() => setFormType('rejestracja')}>Registration</a>
        </div>
        <div className="name">
            {formType === 'rejestracja' ? <h1>Registration</h1> : <h1>Login</h1>}
        </div>
        <div className="form">
            {formType === 'logowanie' ? formik : <RegForm/>}
        </div>
    </div>

}