import React, { useState, useEffect } from 'react';
import { Input } from 'antd'
import { FormIuputParam } from '../interface'

function FormItemInput(props: { param: FormIuputParam }) {
    const [useValue, setValue] = useState(props.param.value)
    const { param } = props
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (props.param.changeHandleFunction) {
            props.param.changeHandleFunction(e.target.value)
        }
        props.param.value = e.target.value
        setValue(e.target.value)
    }
    useEffect(() => {
        if (useValue !== props.param.value) {
            props.param.value = useValue
        }
    }, [useValue])
    return <Input
        disabled={param.disabled}
        type={param.inputType || 'text'}
        placeholder={param.placeholder}
        value={props.param.value}
        onChange={onChange.bind(null)} />
}

export default FormItemInput
