import React, { useState } from 'react';
import { Modal, message } from 'antd';
import style from './style.scss';
interface ImgBoxProps {
    url: string
    errorImgUrl: string,
    initImgUrl?: string,
    width?: number
}

function ImgBox(props: ImgBoxProps) {
    const [useUrl, setUrl] = useState(props.initImgUrl || props.url)
    const [useModalOpenStatus, setModalOpenStatus] = useState(false)
    function openModal() {
        if (!!props.initImgUrl && useUrl === props.initImgUrl) {
            message.info('图片加载中，请稍后')
            return
        }
        if (useUrl !== props.url) {
            message.error('图片加载失败，无法放大图片')
            return
        }
        setModalOpenStatus(true)
    }
    function onCancel() {
        setModalOpenStatus(false)
    }
    const width = props.width || 60
    return <div className={style.imgBox}  style={{width, height: width}}>
        <div className={style.backImg} style={{ backgroundImage: `url(${useUrl})` }} onClick={openModal}>
        <img style={{display:'none'}}  src={props.url}  onLoadedData={setUrl.bind(null, props.url)} onError={setUrl.bind(null, props.errorImgUrl)} />
        </div>
        <Modal
            onCancel={onCancel}
            visible={useModalOpenStatus}
            footer={null}
            destroyOnClose={true}
        >
            <img className={style.img} src={useUrl} onError={setUrl.bind(null, props.errorImgUrl)} />
        </Modal>
    </div>
}


export default ImgBox