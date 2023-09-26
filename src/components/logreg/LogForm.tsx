import React, {FormEvent, useState} from "react";
import {Spinner} from "../spinner/Spinner";
import {RegForm} from "./RegForm";

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
                    className="input"
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
                    className="input"
                    value={form.password}
                    onChange={e => change('password', e.target.value)}
                />
                <button type="reset" className="download4" onMouseDown={showPassword} onMouseUp={hidePassword} onMouseOut={hidePassword}>
                    {'👁'}
                </button>
            </label>
        </p>
        <button type="submit" className="download2">Log in</button>
    </form>

    return <div className="editView">
        <div className="guidePanel">
            <button className="download" onClick={() => setFormType('logowanie')}>Login</button> | <button
            className="download" onClick={() => setFormType('rejestracja')}>Registration</button>
        </div>
        <div className="name">
            {formType === 'rejestracja' ? <h1>Registration</h1> : <h1>Login</h1>}
        </div>
        <div className="form">
            {formType === 'logowanie' ? formik : <RegForm/>}
        </div>
    </div>

}