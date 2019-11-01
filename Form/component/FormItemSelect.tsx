import React, { useEffect, useState } from 'react';
import { FormSelectParam } from '../interface'
import { Select } from 'antd'
const Option = Select.Option

function FormItemSelect(props: { param: FormSelectParam }) {
    const [useValue, setValue] = useState(props.param.value)
    const { param } = props
    function onChange(value: string | number | boolean) {
        props.param.value = value
        if (props.param.changeHandleFunction) {
            props.param.changeHandleFunction(value)
        }
        setValue(value)
    }
    useEffect(() => {
        if (useValue !== props.param.value) {
            props.param.value = useValue
        }
    }, [useValue])
    return <Select
        disabled={param.disabled}
        value={props.param.value}
        onChange={onChange.bind(null)} >
        {
            param.options.map((item, index) => <Option key={`${props.param.label}_${new Date().getTime()}`} value={item.value}>{item.key}</Option>)
        }
    </Select >
}


export default FormItemSelect