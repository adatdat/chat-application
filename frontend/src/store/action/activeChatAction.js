const name = "CHAT_"

const actions = {

    GET_ROOM_CLIENT_REQUEST: name + "GET_ROOM_CLIENT_REQUEST",
    GET_ROOM_CLIENT_SUCCESS: name + "GET_ROOM_CLIENT_SUCCESS",
    GET_ROOM_CLIENT_FAILURE: name + "GET_ROOM_CLIENT_FAILURE",

    ROOM_LOG_CHAT_REQUEST: name + "ROOM_LOG_CHAT_REQUEST",
    ROOM_LOG_CHAT_SUCCESS: name + "ROOM_LOG_CHAT_SUCCESS",
    ROOM_LOG_CHAT_FAILURE: name + "ROOM_LOG_CHAT_FAILURE",

    CHAT_UPLOAD_FILE_REQUEST: name + "CHAT_UPLOAD_FILE_REQUEST",
    CHAT_UPLOAD_FILE_SUCCESS: name + "CHAT_UPLOAD_FILE_SUCCESS",
    CHAT_UPLOAD_FILE_FAILURE: name + "CHAT_UPLOAD_FILE_FAILURE",

    GET_POLL_LIST_REQUEST: name + "GET_POLL_LIST_REQUEST",
    GET_POLL_LIST_SUCCESS: name + "GET_POLL_LIST_SUCCESS",
    GET_POLL_LIST_FAILURE: name + "GET_POLL_LIST_FAILURE",

    CHAT_CONNECT_TO_STAFF_REQUEST: name + "CHAT_CONNECT_TO_STAFF_REQUEST",
    CHAT_CONNECT_TO_STAFF_SUCCESS: name + "CHAT_CONNECT_TO_STAFF_SUCCESS",
    CHAT_CONNECT_TO_STAFF_FAILURE: name + "CHAT_CONNECT_TO_STAFF_FAILURE",

    SET_ROOM_STATUS: name + "STATUS_ROOM",

    SET_CUSTOMER_INFO: name + "SET_CUSTOMER_INFO",

    UPDATE_STAFF_LIST: name + "UPDATE_STAFF_LIST",

    setRoomStatus: (params) => ({
        type: actions.SET_ROOM_STATUS,
        params: params
    }),

    getRoomLogChatRequest: (params) => ({
        type: actions.ROOM_LOG_CHAT_REQUEST,
        params: params
    }),

    setCustomerInfo: (params) => ({
        type: actions.SET_CUSTOMER_INFO,
        params: params
    }),

    updateStaffList: (params) => ({
        type: actions.UPDATE_STAFF_LIST,
        params: params
    }),


    getRoomClientRequest: (params) => ({
        type: actions.GET_ROOM_CLIENT_REQUEST,
        params: params
    }),

    uploadFile: (params) => ({
        type: actions.CHAT_UPLOAD_FILE_REQUEST,
        params: params
    }),

    getPollListRequest: (params) => ({
        type: actions.GET_POLL_LIST_REQUEST,
        params: params
    }),

    connectToStaffRequest: (params) => ({
        type: actions.CHAT_CONNECT_TO_STAFF_REQUEST,
        params: params
    }),

}

export default actions;