import React from "react";

const TextMessageComponent = ({data,isSelfUser}) =>{
    return  <div className={`messages${isSelfUser ? "_right" : "_left"}_group_box`}>
        <div className={`messages${isSelfUser ? "_right" : "_left"}_group_box_content`}>
            <div className="message_container_message_ele">{data.message}</div>
        </div>
    </div>
}
export default TextMessageComponent
