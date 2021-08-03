import {put, takeLatest, all, fork} from "redux-saga/effects";
import {chatRealtimeAction} from "store/action";
import {activeChatService} from "../../services";

export function* handleRabbitResponse(payload) {
    let {key_message, body} = payload.params;
    yield put({
        type: key_message,
        response: body,
    });
}

export function* handleRabbitResponseWatcher() {
    yield takeLatest(chatRealtimeAction.RABBIT_RESPONSE, handleRabbitResponse);
}

export function* getBrokerInfo(params) {

    try {
        const response = yield activeChatService.getBrokerInfo(params);
        const {detail} = response;
        if (response.success) {
            yield put({type: chatRealtimeAction.GET_BROKER_INFO_SUCCESS, response: detail});
        } else {
            yield put({type: chatRealtimeAction.GET_BROKER_INFO_FAILURE, err: response});
        }
    } catch (err) {
        yield put({type: chatRealtimeAction.GET_BROKER_INFO_FAILURE, err: null});
    }
}

export function* getBrokerInfoWatcher() {
    yield takeLatest(chatRealtimeAction.GET_BROKER_INFO_REQUEST, getBrokerInfo);
}

export default function* rootSaga() {
    yield all([
        fork(handleRabbitResponseWatcher),
        fork(getBrokerInfoWatcher),
    ]);
}
