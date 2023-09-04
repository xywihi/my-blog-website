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
function HeaderNav({changeTheme, direction}){
    const navigate = useNavigate();
    const logout = () => {
        newLocalStorage.delete("token")
        navigate(location.hash)
    }
    return (
        <nav className={direction=="vertical" ? 'flexSC heightFull' : 'flexB heightFull'} >
            
            <ul className={direction=="vertical" ? 'flexSC' : 'flexB'}>
                {
                    routes.map(item=>(
                        <li key={item.text} className="navBtn paH12 borderR6">
                            <Link to={item.path}><div className={direction=="vertical" ? "maV12 font18" : "maH12 font18"}>{item.text}</div></Link>
                        </li>
                    ))
                }
                
            </ul>
            <div className={direction=="vertical" ? "maV12" : "maH12"} title="退出"><IonIcon icon={exit} size="36px" onClick={logout}></IonIcon></div>
        </nav>
    )
}

export default HeaderNav