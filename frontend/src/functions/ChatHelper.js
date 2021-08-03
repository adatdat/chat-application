import {getLocalStorage, translate} from "./Utils"
import moment from 'moment'
import {chatConstant} from 'constant'
import {notification} from 'antd';

const default_avatar = '../../images/icon_logo.png'
const default_save_message = '../../images/ic_save_message.png'
import {FILE_CONTENT_TYPE} from 'constant'
import {chatRealtimeAction} from "store/action";

const self_user = getLocalStorage('user')

export const getTimeVideo = (valueTime) => {
    let time = moment(valueTime * 1000)
    if (valueTime < 60 * 60) {
        return time.format('mm:ss')
    } else {
        return time.format('HH:mm:ss')
    }
}

export const getClientMessageId = () => {
    var ret = moment().valueOf();
    var value = Math.floor(Math.random() * 4294967295);
    var str = ("0000000000000000000000" + value.toString(2)).slice(-22);
    var msgs = ret.toString(2) + str;
    return {
        client_mid: binaryToDecimal(msgs),
        timestamp: ret
    };
}

export const imageUrl = (url) => {
    if (url && url.name) {
        return URL.createObjectURL(url)
    }
    return url != null && url.includes('http') ? url : url == default_save_message ? url : default_avatar
}

export const searchAllRoomMapper = (listRoom, listSearchMessage) => {
    let list = []
    if (listRoom && listRoom.length > 0) {
        list.push({typeHeader: 1})
        list = list.concat(listRoom)
    }
    if (listSearchMessage && listSearchMessage.length > 0) {
        list.push({typeHeader: 2})
        list = list.concat(listSearchMessage)
    }
    return list
}

const createSenderModel = (sender_id, customerInfo, staff_list) => {
    if (sender_id == customerInfo.user_id) {
        return createCustomerModel(customerInfo)
    } else {
        return createStaffModel(staff_list, sender_id)
    }
}

const createCustomerModel = (data) => {
    return {
        "user_id": data.user_id,
        "name": data.name,
        "avatar_url": data? data.avatar_url :null,
    }
}
const createStaffModel = (staff_list, staff_id) => {
    var staff = staff_list[staff_id] ? staff_list[staff_id] : false;
    return {
        "user_id": staff_id,
        "name": staff ? staff.name : staff_id,
        "avatar_url": staff ? staff.avatar_url : null,
    }
}

const passerMessageWithAdminEvent = (adminEvent, sender, translate) => {
    let senderName = sender.user_id == self_user.user_id ? translate('you') : sender.username
    let message = ""
    if (adminEvent && adminEvent.action) {
        switch (adminEvent.action) {
            case chatConstant.ADMIN_EVENT_JOIN_ROOM:
                message = `${senderName} đã tham gia. `
                break;

            case chatConstant.ADMIN_EVENT_OUT_ROOM:
                message = `${senderName} đã rời khỏi. `
                break;
        }
    }
    return {message}
}


export const timestampToDate = (millisecondData) => {
    return moment(millisecondData).format('DD/MM/YYYY')
}

export const convertTimeToText = (millisecondData, t) => {
    try {
        var relationTimeStr = ""
        var millisecondToday = moment().startOf('day').valueOf()
        var millisecondDiff = millisecondData - millisecondToday
        if (millisecondDiff > 0) {
            relationTimeStr = moment(millisecondData).locale('en').format('h:mm A')
        } else {
            relationTimeStr = moment(millisecondData).format('DD/MM/YYYY')
        }
        return relationTimeStr
    } catch (e) {
        return moment(millisecondData).format('DD/MM/YYYY')
    }
}


export const convertTimeMessage = (millisecondData) => {
    let timer = millisecondData > 0 ? millisecondData : moment().valueOf()
    let time = moment(timer).locale('en')
    return time.format('h:mm A')
}

const binaryToDecimal = (data) => {
    var ret = "";
    while (data !== "0") {
        var end = 0;
        var fullNum = "";
        var i = 0;
        for (; i < data.length; i++) {
            end = 2 * end + parseInt(data[i], 10);
            if (end >= 10) {
                fullNum += "1";
                end -= 10;
            } else {
                fullNum += "0";
            }
        }
        ret = end.toString() + ret;
        data = fullNum.slice(fullNum.indexOf("1"));
    }
    return ret;

}

export const updateListMessage = (message, staffList, listMessage, roomData, translate) => {
    let new_log = createModelMessageItem(message, roomData, staffList, translate)
    let isResultMessage = false
    //kiểm tra message nhận về để update trạng thái
    if (new_log && new_log.length > 0 && new_log[0].timestamp) {
        let listMessageOld = listMessage.filter((item) => item.clientMid === new_log[0].clientMid && !item.serverMid)
        if (listMessageOld.length > 0) {
            for (var i = 0; i < listMessageOld.length; i++) {
                listMessageOld[i].serverMid = new_log[0].serverMid
                listMessageOld[i].timestamp = new_log[0].timestamp
                listMessageOld[i].status = chatContant.STATUS_READ
            }
            isResultMessage = true
        }
    }
    //không phải message nhận về sau khi send
    if (!isResultMessage) {
        // let endMessage = listMessage[listMessage.length - 1]
        // let timeMessage = getTimeMessage(endMessage, new_log, translate)
        // if (timeMessage) {
        //     listMessage.push(timeMessage)
        // }
        listMessage = listMessage.concat(new_log)
    }
    return listMessage
}


export const createNewLogs = (new_logs, customerInfo, staffList) => {
    let listResult = []
    let message = null
    new_logs = new_logs.sort((a, b) => b.server_mid < a.server_mid ? 1 : -1)
    for (var i = 0; i < new_logs.length; i++) {
        message = createModelMessageItem(new_logs[i], customerInfo, staffList)
        listResult = listResult.concat(message)
    }

    return listResult
}

const createModelMessageItem = (message, customerInfo, staffList, translate) => {
    const {
        sender_id, message_type, server_mid,
        timestamp, body, attachments,
        preview, client_mid,
        admin_event, select_list, select_option
    } = message
    const sender = createSenderModel(sender_id, customerInfo, staffList)
    let isStaffUser = sender_id ? sender_id == customerInfo.user_id : false
    let status = server_mid ? chatConstant.STATUS_SENT : chatConstant.STATUS_SENDING

    let text = null
    switch (message_type) {
        case chatConstant.MESSAGE_TYPE_USER:
        case chatConstant.MESSAGE_TYPE_SELECT:
        case chatConstant.MESSAGE_TYPE_POLL:
            text = body
            break
        case chatConstant.MESSAGE_TYPE_ADMIN:
            text = passerMessageWithAdminEvent(admin_event, sender, translate)
            break
    }

    let view_type = chatConstant.VIEW_MESSAGE
    let previewData = null
    if (preview) {
        const {website_url: url, title, description, image, host} = preview
        previewData = {url, title, description, image, host}
    }

    if (attachments.length > 0) {
        switch (attachments[0].attachment_type) {
            case chatConstant.ATTACHMENT_TYPE_IMAGE:
                view_type = chatConstant.VIEW_IMAGE
                break;
            case chatConstant.ATTACHMENT_TYPE_VIDEO:
                view_type = chatConstant.VIEW_IMAGE
                break;
            case chatConstant.ATTACHMENT_TYPE_FILE:
                view_type = chatConstant.VIEW_FILE
                break;
        }
    }

    return {
        serverMid: server_mid, clientMid: client_mid, messageType: message_type, view: view_type, message: text,
        isStaffUser: isStaffUser, admin_event: admin_event, sender: sender,
        timestamp: timestamp, status: status, preview: previewData, attachments: attachments,
        select_list: select_list, select_option: select_option,
    }
}

export const updateReadInLogs = (logList, roomInfo) => {

    for (var i = 0; i < logList.length; i++) {
        //FIXME: roomInfo chua co last_read
        // if (logList[i].timeStamp <= roomInfo.customer_lastread && logList[i].status === chatConstant.STATUS_SENT) {
            logList[i].status = chatConstant.STATUS_READ
        // }
    }

    return logList
}


export const showMessageNotification = ({key, name, message, duration = 4.5}) => {
    notification['info']({
        key, message: name, description: message, duration: duration
    })
    console.log('info', message);
}


export const checkHaveLinkMessage = (message) => {
    if (message) {
        var list = message.split(' ')
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (isURL(list[i])) return true
            }
        }
    }
    return false
}

export const isURL = (str) => {
    const pattern = new RegExp('^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi')
    return pattern.test(str);
}

export const mapperErrorMessageWithMessage = (listMessage, clientMid) => {
    let list = listMessage.filter((item) => item.clientMid == clientMid)
    if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            list[i].status = chatConstant.STATUS_ERROR
        }
    }
    return listMessage
}

export const getListFileAndOutSize = (files) => {
    let results = []
    let listOutSize = []
    let listSizeEmpty = []
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            const size = Math.round((files[i].size / 1024));
            if (size >= chatConstant.MAX_SIZE_IMAGE) {
                listOutSize.push(files[i])
            } else if (size > 0) {
                results.push(files[i])
            } else {
                listSizeEmpty.push(files[i])
            }
        }
    }
    return {results, listOutSize, listSizeEmpty}
}


export function isValidImageType(type) {
    return type === FILE_CONTENT_TYPE.PNG
        || type === FILE_CONTENT_TYPE.JPEG
        || type === FILE_CONTENT_TYPE.JPG
        || type === FILE_CONTENT_TYPE.GIF
        || type === FILE_CONTENT_TYPE.DWG;
}

export const mappingProjectListFilter = (data) => {
    if (data && data.length > 0) {
        let arr = [{id: 0, label: "All", value: 0}];
        for (let i = 0; i < data.length; i++) {
            let item = {
                id: data[i]['project_id'] ? data[i]['project_id'] : '',
                label: data[i]['project_name'] ? data[i]['project_name'] : '',
                value: data[i]['project_id'] ? data[i]['project_id'] : '',
            }
            arr.push(item)
        }
        return arr;
    }
}

export const last = (array) => {
    if (array) {
        return array[array.length - 1];
    }
    return null;
}