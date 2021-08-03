import React, {useState, useEffect, useRef} from "react";
import IconTypeMedia from '../MediaIcon/IconTypeMedia'
const FileMessageComponent = ({data,isSelfUser}) =>{

    return <div className={`messages${isSelfUser ? "_right" : "_left"}_group_box_content`}>
        <div className="message_container_message ">
                        <div className="message_container_message_ele">
                                <a className="message_container_message_ele_file" download href={data.file_url}>
                                        <IconTypeMedia type={data.title && data.title.split('.').pop()} style={{ width: "25px",paddingRight : '5px' }} />
                                        <span>{data.title}</span>
                                </a>
                        </div>
                </div>
        </div>

}
export default FileMessageComponent