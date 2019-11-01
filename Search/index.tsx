import React, { useState } from 'react'
import MForm from '../Form'
import style from './style.scss'
import { Button, Icon } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import { SearchPropsParam } from './interface'


function Search(props: SearchPropsParam) {
    const [useOpenStatus, setOpenStatus] = useState(props.list.length > 5 ? false : true)
    const [useList, setList] = useState(props.list.length > 5 ? props.list.slice(0, 2) : props.list)
    const button = <div className={style.searchButton + ` ${useOpenStatus ? (props.list.length > 5 ? style.searchOpen : style.searchOpen2) : ''}`}>
        <Button type="primary" className={style.searchButton} onClick={onOk}>确定</Button>
        <Button className={style.searchButton} onClick={clearList}>重置</Button>
        {
            props.list.length > 5 ? <a onClick={setSearchOpen.bind(null)}>
                <span style={{ marginRight: 4 }} >{useOpenStatus ? '收起' : '展开'}</span>
                <Icon type={useOpenStatus ? 'up' : "down"} />
            </a> : ''
        }
    </div>

    function setSearchOpen() {
        if (useOpenStatus) {
            props.list.map((item, index) => {
                if (index > 1) {
                    if (item.type === 'timeRangePicker') {
                        item.endTime = ''
                        item.startTime = ''
                    } else {
                        item.value = ''
                    }
                }
            })
        }
        setList(!useOpenStatus ? props.list : props.list.slice(0, 2))
        setOpenStatus(!useOpenStatus)

    }

    function onOk() {
        const obj = {}
        useList.map(item => {
            if (item.type === 'timeRangePicker') {
                obj[item.endTimeParamName || 'endTime'] = item.endTime
                obj[item.startTimeParamName || 'startTime'] = item.startTime
            } else {
                if (typeof item.value !== "undefined") {
                    obj[item.paramName] = item.value
                }
            }
        })
        props.onOk(obj)
    }

    function clearList() {
        props.list.map(item => {
            if (item.type === 'timeRangePicker') {
                item.endTime = ''
                item.startTime = ''
            } else {
                item.value = ''

            }
        })

        setList(useOpenStatus ? JSON.parse(JSON.stringify(props.list)) : JSON.parse(JSON.stringify(props.list.slice(0, 2))))
    }

    const FormButton = useOpenStatus ? button : <FormItem>{button}</FormItem>
    return <div className={style.search}>
        <MForm list={useList} className={style.searchItem} button={FormButton} />
    </div>
}


export default Search