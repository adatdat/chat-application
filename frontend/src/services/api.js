import {
    getHeader, getUrl, authHeader, handleRequest, handleRequestBinary, postWithFormData, handleDownloadFile,
    // postWithFormDataTest,
    CONTENT_TYPE
} from './lib.js';
import {MODE_ENV} from '../../env/env'

let DOMAIN = '';
if (process.env.TARGET_ENV === 'prod') {
    DOMAIN = MODE_ENV.prod;
    DOMAIN.api = MODE_ENV.prod.api
} else if (process.env.TARGET_ENV === 'dev') {
    DOMAIN = MODE_ENV.dev;
    DOMAIN.api = MODE_ENV.dev.api

} else if (process.env.TARGET_ENV === 'sta') {
    DOMAIN = MODE_ENV.sta;
    DOMAIN.api = MODE_ENV.sta.api
} else {
    DOMAIN = MODE_ENV.local;
    DOMAIN.api = MODE_ENV.local.api
    DOMAIN.cloudapi = ""
}

let CHAT_API = '/chat_api/v1';
export default {

    GET_ROOM_CLIENT: DOMAIN.api + CHAT_API + "/client/get_room", //Lấy room chat

    CHAT_ROOM_LOG_CHAT: DOMAIN.api + CHAT_API + "/client/log_chat", //Lấy log_chat room

    CHAT_FILE_UPLOAD: DOMAIN.api + CHAT_API + "/client/upload_file", //Tải tập tin lên server

    CHAT_CONNECT_TO_STAFF: DOMAIN.api + CHAT_API + "/client/connect", //Chuyển sang trạng thái staff có thể join vào phòng chat

    GET_POLL_LIST: DOMAIN.api + CHAT_API + "/client/poll_list",

    API_BROKER_INFO: DOMAIN.api + CHAT_API + "/client/broker_info",

    getHeader, getUrl, authHeader, handleRequest, handleDownloadFile, handleRequestBinary, postWithFormData,
    // postWithFormDataTest,
    CONTENT_TYPE,



}