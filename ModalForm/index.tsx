import React, { useState } from 'react';
import { Modal, message, notification } from 'antd'
import Form from '../Form'
import { FormItemParam } from '../Form/interface'
import { FetchHeaderParamAndResponse, FecthRequest } from '../Http';

interface ModalFormProps   {
    title: string,
    visible: boolean,
    cancel: () => void,
    list: FormItemParam[],
    url: string,
    fetchHeaderParam?: FetchHeaderParamAndResponse,
    isModalForm: (res: any, success: string) => { status: boolean, info: string },
    successMessgeText: string,
    successHandle?: () => void,
    otherParam?: object
    handleAjaxParam?: (data: object) => {
        DATA: object,
        isOk: boolean
    },
    modalElement?: JSX.Element,
    footer?:object | null
}

function handleParam(param: FormItemParam[]) {
    let errorInfo = '';
    const data = {}
    param.map(item => {
        if (item.type === 'timeRangePicker') {
            data[item.endTimeParamName || 'endTime'] = item.endTime
            data[item.startTimeParamName || 'endTime'] = item.startTime
        } else {
            data[item.paramName] = item.value
            if (item.required && (item.value === '' || typeof item.value === 'undefined')) {
                errorInfo += `${item.label}必填;`
            }
            if (item.verificationsFunc) {
                errorInfo += item.verificationsFunc(item.value)
            }
        }
    })
    return {
        data,
        errorInfo
    }
}

/**
 * 如果需要提交前处理参数的话，那么可以将这个处理放在 handleParam 里面
 */
function ModalForm(props: ModalFormProps) {
    const [loading, setLoading] = useState(false)
    const { ...resProps } = props
    async function onOk(param: FormItemParam[]) {
        const { errorInfo } = handleParam(param)
        let { data } = handleParam(param)
        if (errorInfo) {
            message.error(errorInfo)
            return
        }
        if (props.handleAjaxParam) {
            const { DATA, isOk } = props.handleAjaxParam(data)
            if (isOk) {
                data = DATA
            } else {
                return
            }
        }

        const obj = Array.isArray(data) ? data : { ...data, ...props.otherParam }
        setLoading(true)
        const res = await FecthRequest(props.url, obj, props.fetchHeaderParam)
        const { status, info } = props.isModalForm(res, props.successMessgeText)
        if (!status) {
            notification.error({
                message: info
            })
        } else {
            notification.success({
                message: info
            })
            if (props.successHandle) {
                props.successHandle()
            }
            props.cancel()
        }
        setLoading(false)
    }

    return <Modal
        title={props.title}
        bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
        visible={props.visible}
        onOk={onOk.bind(null, props.list)}
        confirmLoading={loading}
        destroyOnClose={true}
        {...resProps}
        onCancel={props.cancel}>
        <Form list={props.list} />
        {props.modalElement}
    </Modal>
}


export default ModalForm
