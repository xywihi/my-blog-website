import LocalStorage from  './local_storage'
import RouteGuard from './route_guard';
import {
    debounce,
    handleTime,
    handleTimeToNumber,
    enterFullScreen,
    exitFullScreen,
    openBox,
    getTimeText,
    speak,
    handleCopyText,
    getTimeText2
} from './tools';
import {ListenScroll,scrollToTop,addNum} from './domFuncs';
import {exportToExcel} from "./downFile"
// module.exports = {LocalStorage,RouteGuard,debounce,handleTime}
// export default {LocalStorage,RouteGuard,debounce,handleTime}
export {
    LocalStorage,
    RouteGuard,
    debounce,
    handleTime,
    handleTimeToNumber,
    enterFullScreen,
    exitFullScreen,
    openBox,
    scrollToTop,
    addNum,
    getTimeText,
    ListenScroll,
    speak,
    handleCopyText,
    getTimeText2,
    exportToExcel
}