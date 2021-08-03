import {chatRealtimeAction} from 'store/action'

// import actions from "../action/chat";
const initialState = {
    rabbitInfo: null,
    receive_topic: null,
    send_topic: null,

    newMessage: null,

    typingMessage: null,
    sendingFileMessage: null,
    readMessage: null,
    draftMessage: null,
    // editRoom: null,
    requestRoom:null,
    joinRoom:null,
    outRoom: null,
    newRoom: null,
    closeRoom:null,

    errorMessage: null,
    //Send event
    eventRabbit: [],
    eventReconnect: false,
    isConnected: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case chatRealtimeAction.NEW_MESSAGE:
            return {...state, newMessage: action.response};
        case chatRealtimeAction.EDIT_MEMBER:
            return {...state, editMember: action.response};

        case chatRealtimeAction.REQUEST_ROOM:
            return {...state, requestRoom: action.response};
        case chatRealtimeAction.OUT_ROOM:
            return {...state, outRoom: action.response};
        case chatRealtimeAction.CLOSE_ROOM:
            return {...state, closeRoom: action.response};
        case chatRealtimeAction.NEW_ROOM:
            return {...state, newRoom: action.response};

        case chatRealtimeAction.SENDING_FILE_MESSAGE:
            return {...state, sendingFileMessage: action.response};
        case chatRealtimeAction.TYPING_MESSAGE:
            return {...state, typingMessage: action.response};
        case chatRealtimeAction.READ_MESSAGE:
            return {...state, readMessage: action.response};
        case chatRealtimeAction.DRAFT_MESSAGE:
            return {...state, draftMessage: action.response};
        case chatRealtimeAction.ERROR_MESSAGE:
            return {...state, errorMessage: action.response};
        case chatRealtimeAction.SEND_RECONNECT:
            return {...state, eventReconnect: action.params}
        case chatRealtimeAction.SEND_EVENT:
            return {...state, eventRabbit: [...state.eventRabbit, action.params]};
        case chatRealtimeAction.CLEAR_SEND_DATA:
            return {...state, eventRabbit: []};
        case chatRealtimeAction.CHAT_CONNENCTED:
            return {...state, isConnected: action.params.isConnected}
        case chatRealtimeAction.INIT_BROKER:
            return {...state, ...action.params}


        case chatRealtimeAction.GET_BROKER_INFO_REQUEST:
            return {
                ...state,
                isFetching: true,
                rabbitInfo: null,
                success: false,
                error: false,
            }
        case chatRealtimeAction.GET_BROKER_INFO_SUCCESS:
            return {
                ...state,
                isFetching: false,
                rabbitInfo: action.response,
                success: true,
                error: false,
            }
        case chatRealtimeAction.GET_BROKER_INFO_FAILURE:
            return {
                ...state,
                isFetching: false,
                rabbitInfo: null,
                success: false,
                error: true,
            }

        case chatRealtimeAction.CLEAR_DATA:
            return {
                ...state,
                sendMessage: null,
                newMessage: null,
                seenMessage: null,
                typingMessage: null,
                readMessage: null,
                draftMessage: null,
                outMember: null,
                newRoom: null,
                rabbitInfo: null
            };
        default:
            return state;
    }
}