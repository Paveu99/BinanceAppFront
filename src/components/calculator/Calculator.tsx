import React, {FormEvent, useState} from "react";
import {MathEntity} from "types";
import {Spinner} from "../spinner/Spinner";

interface Props {
    val: string,
}

export const AddExpression = (props: Props) => {

    const [form, setForm] = useState<MathEntity>({
        entryNum: 0,
        operatorVal: props.val,
        solution: 0,
    })

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
            solution: Number(value) * Number(form.operatorVal)
        }))
    };

    const checkTheResult = (e: FormEvent) => {
        e.preventDefault()
    }

    const addAnotherOneFromScratch = () => {
        setForm({
            entryNum: 0,
            operatorVal: props.val,
            solution: 0,
        })
    }

    return (
        <>
            <form className="formik" onSubmit={checkTheResult}>
                <p>
                    <label>
                        Input value:<br/>
                        <input
                            type="number"
                            value={form.entryNum as number}
                            onChange={e => updateForm('entryNum', e.target.value)}
                        />
                        <input type="reset" value='Reset' onClick={addAnotherOneFromScratch}/>
                    </label>
                </p>
                <p>Weighted average value: {props.val}</p>
                <h4>You can get: <strong>{form.solution}</strong></h4>
            </form>
        </>

    )
}