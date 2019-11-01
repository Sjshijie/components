import React, { useState } from 'react';
import { Upload, Icon } from 'antd'
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'
import { FormItemUpImgParam } from '../interface'

function FormItemUpImg(props: { param: FormItemUpImgParam }) {
    const [useLoading, setLoading] = useState(false)
    const { param } = props
    const fileList: UploadFile[] = param.value ? [{
        uid: '-1',
        name: param.label,
        status: 'done',
        url: param.value || '',
        size: 80,
        type: ''
    }] : []
    const [useFileList, setFileList] = useState(fileList)
    const imgListLength = param.imgListLength || 1
    async function beforeUpload() {
        if (param.beforeUpload) {
            const res = await param.beforeUpload()
            param.data = { ...param.data, ...res }
        }
    }

    function onChange(info: UploadChangeParam<UploadFile>) {
        if (info.file.status === 'uploading') {
            setFileList(info.fileList)
            setLoading(true)
            return;
        }

        if (info.file.status === 'removed') {
            param.value=""
            setFileList(info.fileList)
        }

        if (info.file.status === 'done') {
            setLoading(false)
        }
    }
    function getData() {
        return param.data
    }

    return <Upload
        action={param.httpUrl}
        listType="picture-card"
        fileList={useFileList}
        beforeUpload={beforeUpload}
        data={getData}
        onChange={onChange}
    >
        {
            useFileList.length < imgListLength ? <div>
                <div style={{ height: "40px", width: "80px", margin: '0 auto' }}>
                    <Icon style={{ fontSize: 30, color: '#1890ff' }} type={useLoading ? 'loading' : 'plus'} />
                    <div style={{ marginTop: 8, color: '#1890ff' }}>上传</div>
                </div>
            </div> : ''
        }
    </Upload>
}


export default FormItemUpImg