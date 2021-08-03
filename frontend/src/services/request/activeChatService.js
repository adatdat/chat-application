import api from '../api';
import {TOKEN} from '../../functions/Utils';
import {CONTENT_TYPE} from "services/lib";

export const activeChatService = {

    getRoomLogChat(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/client/log_chat
        //Lấy danh message từ trong room
        const {username, room_id, limit, page, order_flag, message_id, timestamp} = data
        const params = {username, room_id, limit, page, order_flag, message_id, timestamp};
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(),
        };
        const url = api.getUrl(api.CHAT_ROOM_LOG_CHAT, params);
        return api.handleRequest(url, requestOptions);
    },

    getRoomClient(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/client/get_room
        //Lấy room chat
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(),
            body: data
        };

        const url = api.getUrl(api.GET_ROOM_CLIENT);
        return api.handleRequest(url, requestOptions);
    },

    uploadFile(params, index) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/attachment/upload_file
        //Tải tập tin lên server
        return api.postWithFormData(params, TOKEN, api.CHAT_FILE_UPLOAD, null, index)
    },

    getPollList(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/client/poll_list
        //Lấy danh sach ý định chatbot
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(),
        };
        const url = api.getUrl(api.GET_POLL_LIST);
        return api.handleRequest(url, requestOptions);
    },

    getBrokerInfo(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/client/poll_list
        //Lấy danh sach ý định chatbot
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(),
            body: data.params
        };
        const url = api.getUrl(api.API_BROKER_INFO);
        return api.handleRequest(url, requestOptions);
    },

    connectToStaff(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/client/connect_to_staff
        //Chuyển trạng thái sang waiting
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(),
            body: data.params
        };
        const url = api.getUrl(api.CHAT_CONNECT_TO_STAFF);
        return api.handleRequest(url, requestOptions);
    },
}