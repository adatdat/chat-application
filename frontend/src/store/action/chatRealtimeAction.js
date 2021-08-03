const name = "CHAT_";

const actions = {
    //Action chat
    SEND_MESSAGE: "SEND_MESSAGE", //Client send message, chỉ phát sinh từ phía client.
    NEW_MESSAGE: "NEW_MESSAGE", // - server send message cho user trong room, chỉ phát sinh từ phía server.
    TYPING_MESSAGE: "TYPING_MESSAGE",//- User đang chat hoặc ngừng chat tại 1 room, phát sinh từ cả server và client.
    SENDING_FILE_MESSAGE: "SENDING_FILE_MESSAGE",//- User đang chat hoặc ngừng chat tại 1 room, phát sinh từ cả server và client.
    SEEN_MESSAGE: "SEEN_MESSAGE", //- Đánh dấu đã đọc, chỉ phát sinh ở client.
    READ_MESSAGE: "READ_MESSAGE", //- Đánh dấu đã đọc, Chỉ phát sinh ở server.
    DRAFT_MESSAGE: "DRAFT_MESSAGE", //- lưu/xoá bản nháp ở room. Phát sinh ở cả client và server.
    EDIT_MEMBER: "EDIT_MEMBER", //- Admin edit member của room, chỉ phát sinh từ phía server.

    REQUEST_ROOM: "REQUEST_ROOM",
    CLOSE_ROOM: "CLOSE_ROOM",
    OUT_ROOM: "OUT_ROOM", //- user out group hoặc bị kick khỏi group, chỉ phát sinh từ phía server.
    NEW_ROOM: "NEW_ROOM", //- User tạo room, hoặc được add vào room, chỉ phát sinh từ phía server.

    ERROR_MESSAGE: "ERROR_MESSAGE", //- server báo message bị lỗi , chỉ phát sinh từ phía server.

    SEND_EVENT: name + "SEND_EVENT",
    SEND_RECONNECT: name + "SEND_RECONNECT",
    CLEAR_SEND_DATA: name + "CLEAR_SEND_DATA",
    RABBIT_RESPONSE: name + "RABBIT_RESPONSE",
    CLEAR_DATA: name + "CLEAR_DATA",
    CHAT_CONNENCTED: name + "CHAT_CONNENCTED",

    INIT_BROKER: "INIT_BROKER",

    GET_BROKER_INFO_REQUEST: "GET_BROKER_INFO_REQUEST",
    GET_BROKER_INFO_SUCCESS: "GET_BROKER_INFO_SUCCESS",
    GET_BROKER_INFO_FAILURE: "GET_BROKER_INFO_FAILURE",
    //Action room chat
    //params: {key_message,data}

    brokerInfo: (params) => ({
        type: actions.GET_BROKER_INFO_REQUEST,
        params: params
    }),

    initBroker: (params) => ({
        type: actions.INIT_BROKER,
        params: params
    }),

    sendReconnectRabbit: (params) => ({
        type: actions.SEND_RECONNECT,
        params: params
    }),
    //params: {key_message,data}
    sendRabbitEvent: (params) => ({
        type: actions.SEND_EVENT,
        params: params
    }),
    handleRabbitResponse: (params) => ({
        type: actions.RABBIT_RESPONSE,
        params: params
    }),

    clearData: () => ({
        type: actions.CLEAR_DATA
    }),

    clearSendRabbitData: (params) => ({
        type: actions.CLEAR_SEND_DATA,
        params: params
    }),

    sendConnectedStatus: (params) => ({
        type: actions.CHAT_CONNENCTED,
        params: params
    })
}

export default actions;