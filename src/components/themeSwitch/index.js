import React, {useEffect, useRef} from "react";
import { Link, useNavigate } from 'react-router-dom'
import LocalStorage from '@/util/local_storage'
import './styles.less'
import {IonIcon} from "@ionic/react"
import { exit } from 'ionicons/icons';
const routes = [
    {path:"/",text:"Home"},
    {path:"/news",text:"News"},
    {path:"/user",text:"User"},
]
const newLocalStorage = new LocalStorage;
function ThemeSwitch({changeTheme,theme}){
    const ref = useRef(null);
    useEffect(()=>{
        ref.current.style.transform = theme==='dark' ? "rotate(0deg) scale(0.9)" : "rotate(180deg) scale(0.9)";
    },[theme])
    return (
        <div className="testswitch">
            {/* <input className="testswitch-checkbox" onClick={changeTheme} id="onoffswitch" type="checkbox"/> */}
            {/* <label className="testswitch-label" htmlFor="onoffswitch">
                <span className="testswitch-inner" data-on="Light" data-off="Dark"></span>
                <span className="testswitch-switch"></span>
            </label> */}
            <label onClick={()=>changeTheme(theme=='light' ? 'dark' : 'light')} className={`moonsunBox ${theme==='light' ? "lightBg" : "blackBg"}`} >
                <img ref={ref} src="./moonsun.png" alt='' />
            </label>
            
        </div>
    )
}

export default ThemeSwitch;