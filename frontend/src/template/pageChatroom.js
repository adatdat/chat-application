import { useEffect, useState } from 'react';
import LayoutLeftChatroom from './layout/chatroom/layoutLeftChatroom/LayoutLeftChatroom'
function PageChatroom() {
    const [listData, setListData] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => setListData(json) );
    }, [])

    return (
        <div className="PageChatroom" >
            <div class="container-fluid h-100">
                <div class="row justify-content-center h-100">
                    <LayoutLeftChatroom  listData={listData} />
                    <div class="col-md-8 col-xl-6 chat">
                        <div class="card">
                            <div class="card-header msg_head">
                                <div class="d-flex bd-highlight">
                                    <div class="img_cont">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img" />
                                        <span class="online_icon"></span>
                                    </div>
                                    <div class="user_info">
                                        <span>Chat with Khalid</span>
                                        <p>1767 Messages</p>
                                    </div>
                                    <div class="video_cam">
                                        <span><i class="fas fa-video"></i></span>
                                        <span><i class="fas fa-phone"></i></span>
                                    </div>
                                </div>
                                <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
                                <div class="action_menu">
                                    <ul>
                                        <li><i class="fas fa-user-circle"></i> View profile</li>
                                        <li><i class="fas fa-users"></i> Add to close friends</li>
                                        <li><i class="fas fa-plus"></i> Add to group</li>
                                        <li><i class="fas fa-ban"></i> Block</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body msg_card_body">
                                <div class="d-flex justify-content-start mb-4">
                                    <div class="img_cont_msg">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
                                    </div>
                                    <div class="msg_cotainer">
                                        Hi, how are you samim?
                                        <span class="msg_time">8:40 AM, Today</span>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-start mb-4">
                                    <div class="img_cont_msg">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
                                    </div>
                                    <div class="msg_cotainer">
                                        Bye, see you
                                        <span class="msg_time">9:12 AM, Today</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="input-group">
                                    <div class="input-group-append">
                                        <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                                    </div>
                                    <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
                                    <div class="input-group-append">
                                        <span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageChatroom;
