// eslint-disable-next-line
import {put, takeLatest, all, fork, call} from "redux-saga/effects";
import {activeChatService} from "services";
import {activeChatAction, chatRealtimeAction} from 'store/action';


export function* getRoomLogChat(payload) {
    try {
        const {room_id, order_flag, searchMsg, timestamp} = payload.params
        const response = yield activeChatService.getRoomLogChat(payload.params);
        if (response.success) {
            yield put({type: activeChatAction.ROOM_LOG_CHAT_SUCCESS, response: {...response, room_id, order_flag, searchMsg, timestamp}})
        } else {
            yield put({type: activeChatAction.ROOM_LOG_CHAT_FAILURE, err: {...response, room_id, order_flag}});
        }
    } catch (err) {
        yield put({type: activeChatAction.ROOM_LOG_CHAT_FAILURE, err: {err}});
    }
}

export function* getRoomLogChatWatcher() {
    yield takeLatest(activeChatAction.ROOM_LOG_CHAT_REQUEST, getRoomLogChat);
}

export function* uploadFile(payload) {
    try {
        const {fileLists, room_id, username} = payload.params
        let responses = yield call(() => new Promise((resolve) => {
            Promise.all(fileLists.map((upload_file, index) => activeChatService.uploadFile({upload_file, username}, index + 1)))
                .then((_result) => {
                    resolve(_result)
                })
        }))
        let success = true
        let responseError = null
        let listFile = []
        responses = responses.sort((a, b) => a.index_request > b.index_request ? 1 : -1)

        for (var i = 0; i < responses.length; i++) {
            if (!responses[i].success) {
                success = false
                responseError = responses[i]
                break
            } else {
                listFile.push(responses[i].detail)
            }
        }
        const response = {listFile, room_id}
        success ? yield put({type: activeChatAction.CHAT_UPLOAD_FILE_SUCCESS, response: response})
            : yield put({type: activeChatAction.CHAT_UPLOAD_FILE_FAILURE, err: responseError});
    } catch (err) {
        yield put({type: activeChatAction.CHAT_UPLOAD_FILE_FAILURE, err: {err}});
    }
}

export function* uploadFileWatcher() {
    yield takeLatest(activeChatAction.CHAT_UPLOAD_FILE_REQUEST, uploadFile);
}

export function* getRoomClient(payload) {
    try {
        const response = yield activeChatService.getRoomClient(payload.params);

        const { room_info } = response.detail;
        if (response.success) {
            yield put({ type: activeChatAction.GET_ROOM_CLIENT_SUCCESS, response: room_info });
        }
        else {
            yield put({ type: activeChatAction.GET_ROOM_CLIENT_FAILURE ,err: response });
        }
    } catch (err) {
        yield put({ type: activeChatAction.GET_ROOM_CLIENT_FAILURE, err: null });
    }
}
export function* getRoomClientWatcher() {
    yield takeLatest(activeChatAction.GET_ROOM_CLIENT_REQUEST, getRoomClient);
}

export function* getPollList(payload) {
    try {
        const response = yield activeChatService.getPollList(payload.params);

        const { detail } = response;
        if (response.success) {
            yield put({ type: activeChatAction.GET_POLL_LIST_SUCCESS, response: detail });
        }
        else {
            yield put({ type: activeChatAction.GET_POLL_LIST_FAILURE ,err: response });
        }
    } catch (err) {
        yield put({ type: activeChatAction.GET_POLL_LIST_FAILURE, err: null });
    }
}
export function* getPollListWatcher() {
    yield takeLatest(activeChatAction.GET_POLL_LIST_REQUEST, getPollList);
}

export function* connectToStaff(params) {

    try {
        const response = yield activeChatService.connectToStaff(params);
        const {detail} = response;
        if (response.success) {
            yield put({type: activeChatAction.CHAT_CONNECT_TO_STAFF_SUCCESS, response: detail});
        } else {
            yield put({type: activeChatAction.CHAT_CONNECT_TO_STAFF_FAILURE, err: response});
        }
    } catch (err) {
        yield put({type: activeChatAction.CHAT_CONNECT_TO_STAFF_FAILURE, err: null});
    }
}

export function* connectToStaffWatcher() {
  yield takeLatest(activeChatAction.CHAT_CONNECT_TO_STAFF_REQUEST, connectToStaff);
}

export default function* rootSaga() {
    yield all([
        fork(getRoomClientWatcher),
        fork(getRoomLogChatWatcher),
        fork(uploadFileWatcher),
        fork(getPollListWatcher),
        fork(connectToStaffWatcher),
    ]);
}