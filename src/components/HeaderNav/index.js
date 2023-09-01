import React, {useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import util from '../../util'
import './styles.less'
import {IonIcon} from "@ionic/react"
import { exit } from 'ionicons/icons';
const routes = [
    {path:"/",text:"Home"},
    {path:"/news",text:"News"},
    {path:"/user",text:"User"},
]
const newLocalStorage = new util.LocalStorage;
function HeaderNav({changeTheme, theme}){
    const navigate = useNavigate();
    const logout = () => {
        newLocalStorage.delete("token")
        navigate(location.hash)
    }
    return (
        <nav className="pa12 flexB">
            <span className="logo">LOGO</span>
            <ul className="flexB">
                {
                    routes.map(item=>(
                        <li key={item.text} className="maH12 font18 fontB">
                            <Link to={item.path}>{item.text}</Link>
                        </li>
                    ))
                }
                <li className="maH12" title="退出"><IonIcon icon={exit} size="36px" onClick={logout}></IonIcon></li>
                <li className="flexB maH12">
                    <div className="testswitch">
                        <input className="testswitch-checkbox" onClick={changeTheme} id="onoffswitch" type="checkbox"/>
                        <label className="testswitch-label" htmlFor="onoffswitch">
                            <span className="testswitch-inner" data-on="Light" data-off="Dark"></span>
                            <span className="testswitch-switch"></span>
                        </label>
                    </div>
                    
                </li>
            </ul>
        </nav>
    )
}

export default HeaderNav