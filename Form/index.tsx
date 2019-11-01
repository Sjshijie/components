import React, { useState, useEffect } from 'react';
import { FormParam } from './interface'
import { Form } from 'antd'
import style from './style.scss';
import FormItemRangePicker from './component/FormItemRangePicker'
import FormItemInput from './component/FormItemInput'
import FormItemSelect from './component/FormItemSelect'
import FormItemUpImg from './component/FormItemUpImg'
import FormItemDatePicker from './component/FormItemDatePicker'

const FormItem = Form.Item


function FormItemElement(param: { list: FormParam["list"] }) {
    const useElement = param.list.map(item => {
        item.paramName = item.paramName || item.label
        let element: JSX.Element = <> </>
        switch (item.type) {
            case 'input': element = <FormItemInput key={`${item.paramName}_${(new Date()).getTime()}`} param={item} />
                break;
            case 'select': element = <FormItemSelect key={`${item.paramName}_${(new Date()).getTime()}`} param={item} />
                break;
            case 'timeRangePicker': element = <FormItemRangePicker key={`${(new Date()).getTime()}`} param={item} />
                break;
            case 'img': element = <FormItemUpImg key={`${(new Date()).getTime()}`} param={item} />
                break;
            case 'datePicker': element = <FormItemDatePicker key={`${(new Date()).getTime()}`} param={item} />
                break;
        }
        return element
    })
    return <React.Fragment>
        {param.list.map((item, index) => {
            const key = `${index}_${(new Date()).getTime()}`
            return (
                <FormItem key={key} label={<span>{item.required ? <span style={{ color: 'red' }}>*</span> : ''}{item.label}</span>}>
                    {useElement[index]}
                </FormItem>
            )
        })}
    </React.Fragment>
}


function MForm(param: FormParam) {
    const [useList, setlist] = useState(param.list)
    useEffect(() => {
        setlist(param.list)
    }, [param.list, param.list.length])
    const button = param.button || null
    return <div className={style.form + ` ${param.className}`} >
        <FormItemElement list={useList} />
        {button}
    </div>
}




export default MForm