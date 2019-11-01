
/**
 * @param list 放置生成form表单的参数
 * 
 */
export interface FormParam {
    list: FormItemParam[],
    className?: string,
    button?: JSX.Element
}

export type FormItemParam = FormIuputParam | FormSelectParam | FormItemRangePickerParam | FormItemUpImgParam | FormDatePicker


export interface FormIuputParam extends FormItemAllParam {
    inputType?: string,
    type: 'input'
}

export interface FormSelectParam extends FormItemAllParam {
    type: 'select',
    options: Array<{
        key: string,
        value: boolean | number | string
    }>
}

export interface FormCustomizeParam {
    type: 'customize',
    element: JSX.Element
}

export interface FormItemRangePickerParam extends FormItemTimeParam {
    format?: string,
    type: 'timeRangePicker',
    parentPort?: [string, string]
}

export interface FormItemTimeParam {
    label: string,
    startTimeParamName?: string,
    endTimeParamName?: string,
    required?: boolean,
    disabled?: boolean,
    startTime?: string,
    endTime?: string,
    value: string,
    paramName: string
}

/**
 * @param label表单名
 */
interface FormItemAllParam {
    label: string,
    paramName: string,
    value: any,
    required?: boolean,
    disabled?: boolean,
    placeholder?: string,
    changeHandleFunction?: (data: FormItemAllParam["value"]) => void,
    verificationsFunc?: (data: FormItemAllParam["value"]) => string,
}


export interface FormItemUpImgParam {
    label: string,
    paramName: string,
    value: string,
    data?: object,
    beforeUpload?: () => Promise<any>,
    type: 'img',
    required?: boolean,
    verificationsFunc?: (data: FormItemAllParam["value"]) => string
    disabled?: boolean,
    httpUrl: string,
    imgListLength?:number
}


export interface FormDatePicker extends FormItemAllParam {
    type: "datePicker"
}