import React, {useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import util from '@/util'
import './styles.less'
import {IonIcon} from "@ionic/react"
import { exit } from 'ionicons/icons';
const routes = [
    {path:"/",text:"Home"},
    {path:"/news",text:"News"},
    {path:"/user",text:"User"},
]
const newLocalStorage = new util.LocalStorage;
function ThemeSwitch({changeTheme}){
    return (
        <div className="testswitch">
            <input className="testswitch-checkbox" onClick={changeTheme} id="onoffswitch" type="checkbox"/>
            <label className="testswitch-label" htmlFor="onoffswitch">
                <span className="testswitch-inner" data-on="Light" data-off="Dark"></span>
                <span className="testswitch-switch"></span>
            </label>
        </div>
    )
}

export default ThemeSwitch;