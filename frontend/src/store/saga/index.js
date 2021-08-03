// export default allSaga;
import { all } from "redux-saga/effects";
import activeChatSaga from "./activeChatSaga";
import chatRealtimeSaga from "./chatRealtimeSaga";


function* allSaga() {
  yield all([
    activeChatSaga(),
    chatRealtimeSaga(),
  ]);
}

export default allSaga;