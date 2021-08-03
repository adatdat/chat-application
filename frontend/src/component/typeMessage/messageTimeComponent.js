import React, {useState, useEffect, useRef} from "react";
import {convertTimeMessage} from "functions/ChatHelper";

const TimeMessageComponent = ({data, isSelfUser}) =>{
    const status  = 2
    return  <div className={`message_container_time ${isSelfUser ? 'align_right' : 'align_left'}`} >
                        {status == 1 &&  <i className="far fa-clock"></i> }
                        {
                           data && convertTimeMessage(data.timestamp)
                        }
                        <span className="message_container_time_sending">
                            {
                                status &&
                                status == 1 ? <i className="icon_readfail fas fa-exclamation-triangle"></i> :
                                    status == 2 ? <i className=" icon_check las la-check"></i> :
                                                     <i className=" icon fab fa-telegram-plane"></i>
                            }

                        </span>
            </div>
}
export default TimeMessageComponent
