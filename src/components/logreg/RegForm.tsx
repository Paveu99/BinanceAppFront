import React, {FormEvent, useState} from "react";
import { CreateUserReq, UserEntity } from "types";
import {Spinner} from "../spinner/Spinner";

export const RegForm = () => {
    const [form, setForm] = useState<CreateUserReq>({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })

    const [correct, setCorrect] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [inputType1, setInputType1] = useState<string>('password')
    const [inputType2, setInputType2] = useState('password')
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const showPassword1 = (e: FormEvent) => {
        e.preventDefault()
        setInputType1('text')
    }
    const showPassword2 = (e: FormEvent) => {
        e.preventDefault()
        setInputType2('text')
    }

    const hidePassword1 = (e: FormEvent) => {
        e.preventDefault()
        setInputType1('password')
    }
    const hidePassword2 = (e: FormEvent) => {
        e.preventDefault()
        setInputType2('password')
    }


    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        if (form.email.includes('@') && form.password.length >= 8 && form.name.length >= 3 && form.surname.length >= 3 && form.password === form.passwordConfirmation) {
            setCorrect(true)
            try {
                const res = await fetch('http://localhost:3001/user/reg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                const data = await res.json()
                setResultInfo(data.answer)
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
                : 'Registration form does not meet requirements'
        }
    </p>

    //TODO RESULT INFO POPRAWIĆ

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
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
        <p>
            <label>
                Password: <br/>
                <em style={{fontSize: 'x-small'}}>must be at least 8 characters long</em>
                <br/>
                <input
                    type={inputType1}
                    name="password"
                    className="input"
                    value={form.password}
                    onChange={e => change('password', e.target.value)}
                />
                <button type="reset" className="download4" onMouseDown={showPassword1} onMouseUp={hidePassword1} onMouseOut={hidePassword1}>
                    {'👁'}
                </button>
            </label>
        </p>
        <p>
          <label>
            Password - confirmation: <br/>
              <em style={{fontSize: 'x-small'}}>must be the same</em>
              <br/>
            <input
              type={inputType2}
              name="passwordConfirmation"
              className="input"
              value={form.passwordConfirmation}
              onChange={e => change('passwordConfirmation', e.target.value)}
            />
            <button type="reset" className="download4" onMouseDown={showPassword2} onMouseUp={hidePassword2} onMouseOut={hidePassword2}>
              {'👁'}
            </button>
          </label>
        </p>
        <button type="submit" className="download2">Register</button>
    </form>

}