import LocalStorage from  './local_storage'
import RouteGuard from './route_guard';
import {
    debounce,
    handleTime,
    handleTimeToNumber,
    enterFullScreen,
    exitFullScreen,
    openBox,
} from './tools';
import {ListenScroll} from './domFuncs';
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
    ListenScroll
}