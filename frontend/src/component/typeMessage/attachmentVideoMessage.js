import React, {useState, useEffect, useRef} from "react";
import TimeMessageComponent from "./messageTimeComponent";
import IconTypeMedia from '../MediaIcon/IconTypeMedia'
const VideoMessageComponent = ({data}) =>{
    const isLoading = true
    const currentTime = '00:00'

    return  <div className="message_container_message ">
                <div className="message_container_message_video">
                        <video  autoPlay ={true}
                                controls
                                src={data.thumbnail_url}
                                width='100%'
                                height='100%'
                                >
                        </video>
                </div>
        </div>

}
export default VideoMessageComponent