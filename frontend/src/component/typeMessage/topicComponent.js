import React, {useState, useEffect, useRef} from "react";
import Carousel from "react-elastic-carousel";
import {useDispatch, useSelector} from "react-redux";
import { chatRealtimeAction } from "store/action";
import * as hepler from "functions/ChatHelper";
import {LIST_CHATBOT_TOPIC} from "../../constant";

const TopicComponent = (props) => {
    const breakPoints = [
        {width: 1, itemsToShow: 3},
        {width: 550, itemsToShow: 4},
        {width: 768, itemsToShow: 6},
        {width: 1200, itemsToShow: 8},
    ];
    const breakPoints_sub = [
        {width: 1, itemsToShow: 2},
        {width: 550, itemsToShow: 3},
        {width: 768, itemsToShow: 5},
        {width: 1200, itemsToShow: 6},
    ];
    const activeChatReducer = useSelector(state => state.activeChatReducer)
    const {pollList, roomInfo} = activeChatReducer
    const [idTopic, setIdTopic] = useState(null)
    const [subTopic, setSubTopic] = useState(null)
    const [questList, setQuestList] = useState(null)
    const [questNonSubList, setQuestNonSubList] = useState(null)
    const [idSubTopic, setIdSubTopic] = useState(null)
    const [item_show, setItem_show] = useState(3)
    const dispatch = useDispatch()

    const showmore = () => {
        if (questList.length === item_show) {
            setItem_show(3)
        } else {
            setItem_show(questList.length)
        }
    }
    const handleClickTopic = (topicId) => {
        setIdTopic(topicId)
        let topicList = pollList.filter(item => item['topic_id'] === topicId)[0]['sub_topic_list']
        setSubTopic(topicList)
        setQuestList(null)
        setIdSubTopic(null)
        let questionNonSub = pollList.filter(item => item['topic_id'] === topicId)[0]['question_nonsub_list']
        setQuestNonSubList(questionNonSub)
    }

    const handleClickSubTopic = (id) => {
        setIdSubTopic(id)
        let questionList = subTopic.filter(item => item['sub_topic_id'] === id)[0]['question_list']
        setQuestList(questionList)
        setItem_show(3)
    }

    const createSendMessagePollObject = (room_id, client_mid, attachments, review_url, body, select_option) => {
        return {room_id, client_mid, attachments, review_url, body, select_option}
    }
    const sendSelectOption = (option) =>{
        let select_option ={ id : option.id,key : option.id}
        let message_option = option.text
        const clientMessage = hepler.getClientMessageId()
        let data = createSendMessagePollObject(roomInfo.roomId, clientMessage.client_mid, [], "",  message_option, select_option)
        dispatch(chatRealtimeAction.sendRabbitEvent({key_message: chatRealtimeAction.SEND_MESSAGE, data}))
    }
    return pollList && pollList.length > 0 &&
        <div className="topic">
            <div className="topic_wrap">
                <div className="topic_wrap_list">
                    <Carousel breakPoints={breakPoints}
                              showArrows={false}
                              pagination={false}
                              itemPosition="flex-start"
                              itemPadding={[5, 0, 5, 5]}>
                        {pollList.map((item) =>
                            <div key={"TOPIC"+item['topic_id']}
                                 onClick={() => handleClickTopic(item['topic_id'])}
                                 className={`topic_wrap_list_ele ${item['topic_id'] === idTopic ? 'activeTopic' : ''}`}>
                                {/*topic_icon*/}
                                <img src={LIST_CHATBOT_TOPIC[item.topic_icon].url} alt=""/>
                                <p>{item.topic_name}</p>
                            </div>)
                        }
                    </Carousel>
                </div>
            </div>
            <div className="topic_sub">
                {subTopic &&
                <Carousel breakPoints={breakPoints_sub}
                          showArrows={false}
                          pagination={false}
                          itemPadding={[5, 0, 5, 5]}
                          itemPosition="flex-start">
                    {
                        subTopic.map((item, index) =>
                            <div onClick={() => handleClickSubTopic(item['sub_topic_id'])}
                                 key={"SUB"+item['sub_topic_id']}
                                 className={`topic_sub_ele ${item['sub_topic_id'] === idSubTopic ? 'activeSub' : ''}`}>
                                <p>{index + 1}. {item['sub_topic_name']}</p>
                            </div>
                        )
                    }
                </Carousel>}
            </div>

            {idSubTopic
                ? (questList && questList.map((item, index) => index < item_show &&
                    <p key={"QUEST"+item['id']}
                       className={`choose ${(index + 1 == item_show && item_show < 4) ? 'no_border' : ''}`}
                       onClick={()=>sendSelectOption(item)}
                       >{index + 1}. {item.text}
                    </p>))

                : (questNonSubList && questNonSubList.map((item, index) => index < item_show &&
                    <p key={"NON"+item['id']}
                       className={`choose`}
                       onClick={()=>sendSelectOption(item)}
                       >{index + 1}. {item.text}
                    </p>))
            }
            {
                questList && questList.length > 3 &&
                <div className="d-flex justify-content-center position-relative backtop_button">
                    <button onClick={showmore} className="backtop ">
                        <i className={`backtop_icon fas fa-angle-double-left ${item_show == 3 ? '' : 'rotate'}`}></i>
                    </button>
                </div>
            }
        </div>

}


export default TopicComponent