import {activeChatAction, chatRealtimeAction} from 'store/action'


const initialState = {
    listLogMessage: null,
    userAttachmentList: null,
    attachmentFiles: null,
    attachmentMedia: null,
    uploadFile: null,
    uploadError: false,

    roomInfo: {
        roomId: null,
        queueInfo: null,
        isNewRoom: false,
    },
    roomStatus: null,
    actionFlag: false,

    customerInfo: null,
    staffList: {},
    pollList: null,

    error: false,
    success: false,

    isLoading: false,
    isLoadMore: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case activeChatAction.GET_ROOM_CLIENT_REQUEST:
            return {
                ...state,
                error: false,
                success: false,

                roomInfo: {
                    roomId: null,
                    queueInfo: null,
                    isNewRoom: false,
                },
                staffList: {},
            }
        case activeChatAction.GET_ROOM_CLIENT_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,

                roomInfo: {
                    roomId: null,
                    queueInfo: null,
                    isNewRoom: false,
                },
                staffList: {},
            }
        case activeChatAction.GET_ROOM_CLIENT_SUCCESS:
            var staff_list = {}
            'staff_list' in action.response && action.response['staff_list'].map(staff => {
                staff_list[staff.user_id] = {
                    name: staff.name,
                    avatar_url: staff.avatar_url,
                    user_id: String(staff.user_id),
                }
            })

            return {
                ...state,

                error: false,
                success: true,
                roomInfo: {
                    roomId: action.response.room_id,
                    isNewRoom: action.response['is_new'],
                },
                roomStatus: action.response.status,
                staffList: staff_list,
            }
        case activeChatAction.ROOM_LOG_CHAT_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoading: true,
                isLoadMore: true,
                listLogMessage: null
            }
        case activeChatAction.ROOM_LOG_CHAT_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoading: false,
                isLoadMore: false,
                listLogMessage: null
            }
        case activeChatAction.ROOM_LOG_CHAT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadMore: false,
                error: false,
                success: true,
                listLogMessage: action.response,
            }

        case activeChatAction.CHAT_UPLOAD_FILE_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isUploadFile: true,
                uploadFile: null
            }
        case activeChatAction.CHAT_UPLOAD_FILE_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isUploadFile: false,
                uploadFile: null
            }
        case activeChatAction.CHAT_UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                isUploadFile: false,
                error: false,
                success: true,
                uploadFile: action.response,
            }

        case activeChatAction.GET_POLL_LIST_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                pollList: null,
            }
        case activeChatAction.GET_POLL_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                pollList: null,
            }
        case activeChatAction.GET_POLL_LIST_SUCCESS:
            return {
                ...state,
                error: false,
                success: true,
                pollList: action.response,
            }
        case activeChatAction.CHAT_CONNECT_TO_STAFF_REQUEST:
            return {
                ...state,
                error: false,
                actionFlag: false,
                roomStatus: state.roomStatus ? state.roomStatus : null,
            }
        case activeChatAction.CHAT_CONNECT_TO_STAFF_FAILURE:
            return {
                ...state,
                error: action.err,
                actionFlag: false,
                roomStatus: null,
            }
        case activeChatAction.CHAT_CONNECT_TO_STAFF_SUCCESS:
            return {
                ...state,
                error: false,
                actionFlag: true,
                roomStatus: action.response['room_status'],
            }

        case activeChatAction.SET_CUSTOMER_INFO:
            return {...state, customerInfo: action.params};

        case activeChatAction.SET_ROOM_STATUS:
            return {...state, roomStatus: action.params};

        case activeChatAction.UPDATE_STAFF_LIST:
            var staff = action.params
            state.staffList[staff.user_id] = {
                name: staff.name,
                avatar_url: staff.avatar_url,
                user_id: String(staff.user_id),
            }
            return {...state, staffList: state.staffList};
        default:
            return state;
    }
};
