import React from 'react'
import { Spin } from 'antd'
import style from './style.scss'
function Loading(props: { loading: boolean }) {
    return <div className={props.loading ? style.loading : ''}> <Spin spinning={props.loading} size="large" /></div>
}


export default Loading