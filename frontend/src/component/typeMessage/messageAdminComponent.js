import { chatConstant } from 'constant';
import React from 'react'
const MessageAdminComponent = ({data}) => {
    let name =  'Nhân viên Scb';
    let url =  'https://cloudapi.minerva.vn/cdn/minerva-chat/scb-chat/scb/staff/avatar69f93ec4fe2b0d2341931.png' ;
    let message = ''
    if(Object.keys(data).length != 0  && data.admin_event.action && data.admin_event.staff_info ){
        name =data.admin_event.staff_info.name
        url = data.admin_event.staff_info.avatar_url
        switch (data.admin_event.action) {
            case chatConstant.ADMIN_EVENT_JOIN_ROOM:
                message = 'đã tham gia.'
                break;
            case chatConstant.ADMIN_EVENT_OUT_ROOM:
                message = 'đã rời khỏi.'
                break;
            default:
                // message = ''
                break;
        }
    }
    return (Object.keys(data).length != 0  && data.admin_event.staff_info )? <div className="group-action">
                <div className="message_admin">
                <div className="d-flex justify-content-center w-100 align-items-center flex-column">
                    <figure className="conversation__user--avatar message_admin_img">
                        <span className="wrap d-flex align-items-center justify-content-center">
                           <img src={url}></img>
                        </span>
                    </figure>
                    <div className="message_admin_content">
                        <span>{name}</span>
                        {message}
                    </div>
                </div>
            </div>
            </div>:
            <></>
}
export default MessageAdminComponent