import React from 'react';
import { Table, Pagination } from 'antd'
import { TableProps } from 'antd/lib/table/interface'
import style from './style.scss'

interface MTableProps extends TableProps<any> {
    onChangePageIndex: ((page: number, pageSize?: number | undefined) => void)
    totalPage: number
    showSizeChange?: (current: number, size: number) => void,
    pageIndex: number
}

function MTable(props: MTableProps) {
    const { columns, ...restProps } = props
    function showSizeChange(current: number, size: number) {
        localStorage.setItem('paginationSize', String(size))
        props.onChangePageIndex(current, size)
    }
    const PageSize = Number(localStorage.getItem('paginationSize')) || 10

    return <div>
        <Table columns={columns} pagination={false} {...restProps} />
        <div className={style.pageBox}>
            <Pagination total={PageSize * props.totalPage}
                pageSize={PageSize}
                showSizeChanger={true}
                current={props.pageIndex}
                onShowSizeChange={props.showSizeChange || showSizeChange}
                onChange={props.onChangePageIndex} />
        </div>
    </div>
}


export default MTable