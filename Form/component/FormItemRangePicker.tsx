import React, { useEffect, useState } from 'react';
import { RangePickerProps } from 'antd/lib/date-picker/interface'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import { FormItemRangePickerParam } from '../interface'
import { DatePicker } from 'antd'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;
function FormItemRangePicker(props: { param: FormItemRangePickerParam }) {
    const [usStartTime, setStartTime] = useState(props.param.startTime)
    const [usEndTime, setEndTime] = useState(props.param.endTime)
    const { param } = props
    function onChange(dates: RangePickerProps["value"], dateStrings: [string, string]) {
        param.endTime = dateStrings[1] ? `${dateStrings[1]} 23:59:59` : dateStrings[1]
        param.startTime = dateStrings[0] ? `${dateStrings[0]} 00:00:00` : dateStrings[0]
        setStartTime(param.startTime)
        setEndTime(param.endTime)
    }
    useEffect(() => {
        if (param.endTime !== usEndTime || param.startTime !== usStartTime) {
            param.endTime = usEndTime
            param.startTime = usStartTime
        }
    }, [usStartTime, usEndTime])

    const [startTime, endTime] = [moment(usStartTime), moment(usEndTime)]
    return <RangePicker size='default' locale={locale} onChange={onChange} value={usStartTime ? [startTime, endTime] : [undefined, undefined]} />
}


export default FormItemRangePicker
