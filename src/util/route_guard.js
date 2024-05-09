import React from "react";
import LocalStorage from "./local_storage";

const RouteGuard = (components) => {
    let newLocalStorage =  new LocalStorage()
    let token = newLocalStorage.get('token')
    // console.log("LocalStorage",token,components)
    return !token ? <>当前未登录，无权访问</> : <>{components}</>
}

export default RouteGuard