import React, {useState, useEffect, useRef} from "react";
import TopicComponent from "./topicComponent";
import activeChatAction from "store/action/activeChatAction";
import {useDispatch} from "react-redux";
import TextMessageComponent from "./stringMessage";

const MessageBotComponent = ({state}) => {
    const {username, roomInfo} = state
    const dispatch = useDispatch()

    const handlerConnectStaff = () => {
        dispatch(activeChatAction.connectToStaffRequest({
            username: username, room_id:roomInfo.roomId,
        }))
    }
    return <>
                    <TextMessageComponent data={{message: 'Xin chào tôi là chatbot của ngân hàng SCB'}} isSelfUser={false}/>
                    <TextMessageComponent data={{message: 'Bạn vui lòng chọn menu dưới đây hoặc gõ nội dung để được tư vấn', message_type: 1}} isSelfUser={false}/>
                    <TopicComponent state={state}/>
                    <div className={`messages_left_group_box`}>
                        <div className={`messages_left_group_box_content d-flex align-items-center pointer`} onClick={handlerConnectStaff}>
                            <img className='pl-2' src='../../images/icon_advisory.png'/>
                            <div className="message_container_message_ele">Chat với nhân viên tư vấn</div>
                        </div>
                    </div>
    </>
}
export default MessageBotComponent