import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import util from '@/util'
import './styles.less'
import {IonIcon} from "@ionic/react"
import { exit,play,home,newspaper, person } from 'ionicons/icons';
const allRoutes = [
    {path:"/",text:"主页",icon:home},
    {path:"/news",text:"新闻",icon:newspaper,children:[{path:"/news/community",text:"社区"},{path:"/news/person",text:"个人"},]},
    {path:"/user",text:"用户",icon:person},
]
const newLocalStorage = new util.LocalStorage;
function HeaderNav({changeTheme, direction,routes}){
    const navigate = useNavigate();
    const [activeNavIndex,setActiveNavIndex]=useState(null)
    const [currentRoute,setCurrentRoute]=useState('/')
    useEffect(()=>{
        
    },[])
    const logout = () => {
        newLocalStorage.delete("token")
        navigate(location.hash)
    }
    const activeNav = (index) => {
        setActiveNavIndex(index)
    }
    return (
        <nav className={direction=="vertical" ? 'navBox flexSC heightFull' : 'navBox flexB heightFull'} >
            
            <ul className={direction=="vertical" ? 'flexSC' : 'flexB'}>
                {
                    allRoutes.map((item,index)=>(
                        <li key={item.path} onMouseEnter={()=>activeNav(index)} onMouseLeave={()=>activeNav(null)} 
                        className={`navBtn pa12  borderR6 ${(!item.children) ? 'activeNav' : 'activeNavFartherBox'} ${((currentRoute.indexOf(item.path)!=-1 && item.path != '/' && !item.children) || item.path == currentRoute) ? 'activeNavOld' : (currentRoute.indexOf(item.path)!=-1 && item.children) ? 'activeNavOldNoB' : ''}`}>
                            {
                                !item.children ? 
                                <Link to={item.path} className="flexS" onClick={()=>setCurrentRoute(item.path)}>
                                    <IonIcon icon={item.icon} size="36px"></IonIcon>
                                    <span className="maL12">{item.text}</span>
                                </Link> :
                                <div className="flexB">
                                    <div className="flexS">
                                        <IonIcon  icon={item.icon} size="36px"></IonIcon>
                                        <span className="maL12">{item.text}</span>
                                    </div>
                                     {item.children &&<IonIcon className="moreIcon" icon={play} size="36px" onClick={logout}></IonIcon>}</div>
                            }
                            {
                                item.children && activeNavIndex==index && 
                                <ul className="maL12">{item.children.map(it=>
                                        <li  key={it.path} className={`pa12 borderR6 activeNav ${(currentRoute==it.path) ? 'activeNavOld' : ''}`}>
                                            <Link to={it.path} className="flexB" onClick={()=>setCurrentRoute(it.path)}>
                                                <span >{it.text}</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            }
                        </li>
                    ))
                }
                
            </ul>
            <div className={direction=="vertical" ? "logout borderR6" : "logout borderR6 maV12"} title="退出"><IonIcon icon={exit} size="36px" onClick={logout}></IonIcon></div>
        </nav>
    )
}

export default HeaderNav