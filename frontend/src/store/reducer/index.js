import activeChatReducer from "./activeChatReducer";
import chatRealtimeReducer from "./chatRealtimeReducer";
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    chatRealtimeReducer,
    activeChatReducer,

});

export default allReducers;