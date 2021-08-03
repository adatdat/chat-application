import React, {useState, useEffect, useRef} from "react";
import MessageRenderComponent from "./messageRenderComponent";
import {useSelector} from "react-redux";


const MessageListRenderComponent = ({data, isStaffUser, state, messages_user}) => {

    let info = data[0]
    return (
        <div className={`messages${isStaffUser ? '_right' : '_left'}`}>
            <div className={`messages${isStaffUser ? '_right' : '_left'}_group`}>

                    {
                        data && data.length > 0 &&
                        data.map((item,index) => <MessageRenderComponent
                                                        key={item.key}
                                                        isSelfUser={item.isStaffUser}
                                                        data={item}
                                                        lengList = {data.length}
                                                        index = {index}
                                                        state={state}
                                                        />
                        )
                    }
            </div>
            <div className={`messages${isStaffUser ? '_right' : '_left'}_avatar`}>
                <div>
                    <img src={info.sender && info.sender.avatar_url } alt=""/>
                </div>
            </div>
        </div>
    )
}
export default MessageListRenderComponent