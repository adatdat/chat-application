import React, { useState, useEffect, useRef } from "react";
import { Modal, Spin } from 'antd';
import { chatConstant } from "constant";
import { getTimeVideo, imageUrl } from 'functions/ChatHelper';
import SpinLoading from "components/common/Loading/SpinLoading";


const MediaImageItem = props => {
    const { data, parent } = props
    const [style, setStyle] = useState()
    useEffect(() => {
        if (data) {
            var img = new Image();
            img.src = imageUrl(data.url)
            img.onload = () => {
                const currentWidth = parent.current.clientWidth
                const currentHeight = parent.current.clientHeight
                let w = img.width
                let h = img.height
                w = currentHeight / h * w
                h = currentHeight
                if (h > currentHeight || w > currentWidth) {
                    h = currentWidth / w * h
                    w = currentWidth
                }
                setStyle({ width: w, height: h })
            }
        }
    }, [data])

    return (
        <figure style={{ width: '100%', height: '100%', justifyContent: 'center' }} className="d-flex m-auto align-items-center">
            <img style={style} src={imageUrl(data.url)} />
        </figure>
    )
}
const MediaVideoItem = props => {
    const { data } = props
    return (
        <figure style={{ width: '100%', height: '100%' }} className="d-flex m-auto">
            <video className="video" src={data.url} alt="video" autoPlay={true} muted={false} controls />
        </figure>
    )
}
const DialogShowMediaList = (props) => {
    const { attachmentData, close, visible, loadMore } = props
    const [currentIndex, setCurrent] = useState(0)
    const [mediaList, setMediaList] = useState([])
    const [totalMedia, setTotalMedia] = useState(0)
    const [itemShow, setItemShow] = useState()
    const listMediaRef = useRef()
    const [keyPress, setPressed] = useState();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (attachmentData) {
            if (attachmentData.data) {
                setMediaList(attachmentData.data)
                setTotalMedia(attachmentData.totalRecord > 0 ? attachmentData.totalRecord : attachmentData.data.length)
            }
            setCurrent(attachmentData.currentIndex)
            setLoading(false)
        }
    }, [attachmentData])

    useEffect(() => {
        if (currentIndex >= 0 && totalMedia > 0 && currentIndex < totalMedia) {
            if (currentIndex == mediaList.length - 1 && mediaList.length < totalMedia) {
                loadMore(attachmentData.page);
                setLoading(true)
            }
            else {
                setItemShow(mediaList[currentIndex])
            }
        }


    }, [currentIndex, mediaList])

    useEffect(() => {
        let total = totalMedia > 0 ? totalMedia : mediaList.length
        if (keyPress == 37) {
            if (total > 0 && currentIndex > 0) {
                setCurrent(currentIndex - 1)
            }
        } else if (keyPress == 39) {
            if (total > 0 && currentIndex < total - 1) {
                setCurrent(currentIndex + 1)
            }
        }
        setPressed()
    }, [keyPress])

    const keydownFunction = (event) => {
        setPressed(event.keyCode)
    }
    useEffect(() => {
        document.addEventListener("keydown", keydownFunction, false);
        return () => document.removeEventListener("keydown", keydownFunction, false);
    }, [])

    return (
        <Modal visible={visible} onCancel={close}  footer={null} header={null}>
            <div className="btn_change_img  d-flex">
                {
                    totalMedia > 0 && currentIndex > 0 &&
                    <span className="btn_prev left d-flex" onClick={() => setCurrent(currentIndex - 1)} >
                        <i className="las la-arrow-left" />
                    </span>
                }
                {
                    totalMedia > 0 && currentIndex < totalMedia - 1 &&
                    <span className="btn_next right d-flex ml-auto" >
                        <SpinLoading spinning={isLoading} className="loading_full loading_content t-0 l-0">
                            <div onClick={() => setCurrent(currentIndex + 1)}>
                                <i className="las la-arrow-right" />
                            </div>
                        </SpinLoading>
                    </span>
                }
            </div>
            <div className="list_img" ref={listMediaRef} >
                {itemShow &&
                    (itemShow.type === 'image' ?
                        <MediaImageItem data={itemShow} parent={listMediaRef} /> :
                        itemShow.type === 'video'?
                            <MediaVideoItem data={itemShow} /> : null)
                           
                }
            </div>
        </Modal>)
}
export default DialogShowMediaList