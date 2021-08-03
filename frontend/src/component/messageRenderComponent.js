import React, {useState, useEffect, useRef} from "react";
import TimeMessageComponent from "./typeMessage/messageTimeComponent";
import FileMessageComponent from "./typeMessage/attachmentFileMessage";
import ImageMessageComponent from './typeMessage/attachmentImageMessage.js'
import VideoMessageComponent from "./typeMessage/attachmentVideoMessage.js";
import {chatConstant} from "constant";
import TopicComponent from "component/typeMessage/topicComponent";
import {chatRealtimeAction} from "store/action";
import * as hepler from "functions/ChatHelper";
import {useDispatch} from "react-redux";
import TextMessageComponent from "./typeMessage/stringMessage";
import MessageBotComponent from "component/typeMessage/messageBotComponent";
import MessageAdminComponent from "component/typeMessage/messageAdminComponent";

const MessageRenderComponent = ({data, isSelfUser, index, lengList, state}) => {
    const dispatch = useDispatch()
    const style_image = {};
    const leng = data.attachments && data.attachments.length > 0 ? data.attachments.length : 0
    const mediaType = [chatConstant.ATTACHMENT_TYPE_VIDEO, chatConstant.ATTACHMENT_TYPE_IMAGE]

    const renderAttachment = (attachment) => {
        switch (attachment["attachment_type"]) {
            case chatConstant.ATTACHMENT_TYPE_FILE:
                return <FileMessageComponent data={attachment} isSelfUser={false}/>;
            case chatConstant.ATTACHMENT_TYPE_IMAGE:
                return <ImageMessageComponent data={attachment}/>;
            case chatConstant.ATTACHMENT_TYPE_VIDEO:
                return <VideoMessageComponent data={attachment}/>;
            default:
                return <></>;
        }
    };
    switch (leng) {
        case 0:
            break;
        case 1:
            style_image.width = "100%"
            style_image.maxHeight = "350px"
            break;

        default:
            style_image.width = "48%"
            style_image.height = "100px"
            style_image.marginLeft = "5px"
            style_image.marginBottom = "5px"
            style_image.background = "#ffffff"
            break;
    }

    const createSendMessagePollObject = (room_id, client_mid, attachments, review_url, body, select_option) => {
        return {room_id, client_mid, attachments, review_url, body, select_option}
    }

    const sendSelectOption = (option) => {
        let select_option = {id: option.id, key: option.id}
        let message_option = option.text
        const clientMessage = hepler.getClientMessageId()
        let data = createSendMessagePollObject(state.roomInfo.roomId, clientMessage.client_mid, [], "", message_option, select_option)
        dispatch(chatRealtimeAction.sendRabbitEvent({key_message: chatRealtimeAction.SEND_MESSAGE, data}))
    }
    const renderMessage = (data) => {
        switch (data.messageType) {
            case chatConstant.MESSAGE_TYPE_USER:
                if (data.attachments && data.attachments.length > 0) {
                    return <div className="message_attachments">
                        {
                            data.attachments.map((item, index) => {
                                if (mediaType.includes(parseInt(item["attachment_type"]))) {
                                    return (
                                        <div key={item.attachment_id} style={style_image}>
                                            {renderAttachment(item)}
                                        </div>
                                    );
                                } else return <div key={index}>{renderAttachment(item)}</div>;
                            })
                        }
                    </div>
                } else {
                    return <TextMessageComponent data={data} isSelfUser={isSelfUser}/>
                }

            case chatConstant.MESSAGE_TYPE_POLL :
                return <MessageBotComponent state={state}/>;

            case chatConstant.MESSAGE_TYPE_SELECT :
                let option = data.select_list
                return (<div className={`messages${isSelfUser ? "_right" : "_left"}_group_box`}>
                        <div className={`messages${isSelfUser ? "_right" : "_left"}_group_box_content`}>
                            <div className="message_container_message_ele">{data.message}</div>
                        </div>
                        {option && option.map((item, index) =>
                            <p key={item['question_id']}
                               className={`choose `}
                               onClick={() => sendSelectOption(item)}
                            >
                                {index + 1}. {item.text}
                            </p>)}
                    </div>
                )
            default:
                break;
        }

    }
    return (
        <div className={`messages${isSelfUser ? "_right" : "_left"}_group_empty`}>
            {renderMessage(data)}
            {
                lengList == index + 1 && <TimeMessageComponent isSelfUser={isSelfUser} data={data}/>
            }
        </div>
    );
};
export default MessageRenderComponent;
