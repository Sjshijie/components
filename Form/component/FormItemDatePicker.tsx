import React, { useState, useEffect } from 'react';
import { DatePicker  } from 'antd'
import { FormDatePicker } from '../interface'
import moment from 'moment'

function FormItemDatePicker(props: { param: FormDatePicker }) {
    const [useValue, setValue] = useState(props.param.value)
    const { param } = props

    function onChangeDatePicker(time: moment.Moment, timeString: string) {
        param.value = timeString
        setValue(timeString)
    }

    useEffect(() => {
        if (useValue !== props.param.value) {
            props.param.value = useValue
        }
    }, [useValue])

    return <DatePicker  placeholder={param.label}
        disabled={param.disabled}
        onChange={onChangeDatePicker}
        value={param.value ? moment(param.value, 'YYYY/MM/DD') : undefined}
    />
}

export default FormItemDatePicker