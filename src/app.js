import React,{ Suspense, useEffect, useState }  from "react";
import {  HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import util from './util'
import HeaderNav from "./components/HeaderNav";
import './global.css'
import './style.less'
import themestyle from "./styles/theme.less"
// import "./styles/ioniccss.css"
import ThemeSwitch from "./components/themeSwitch"
import config from './config'
import { handleHiddeNotices } from "./store/actions";
import {connect} from 'react-redux'
import { IonIcon } from "@ionic/react";
import { notifications, shuffle, pause , play } from 'ionicons/icons';
import socket from "./http/socke"
import SmallMusicPlayer from "./components/smallMusicPlayer"
// import Notices from "./components/notices"
const Notices = React.lazy(() => import('./components/notices'))
const Home = React.lazy(() => import('./pages/home'))
const News = React.lazy(() => import('./pages/news'))
const User = React.lazy(() => import('./pages/user'))
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary'))
const newLocalStorage = new util.LocalStorage;
const test_notices = [
    // {text:'郑爽和吴亦凡的百度百科都已修改，郑爽介绍内容中却还有作品名单',id:1,unmont:false}
]
const App = ({notices,handleHiddeNotices,music}) =>{
    const [theme,setTheme] = useState('light');
    const [showNotice,setShowNotice] = useState(false);
    const [noticesNum,setNoticesNum] = useState(0);
    useEffect(() => {
        newLocalStorage.set("token",'Ber sddjjkwjfhiheh87687212ihr2khfjk')
        return () => {
            console.log('销毁当前项目')
        }
    }, [])
    
    // useEffect(() => {
    //     setShowNotice(notices.every(it=>it.unmont))
    // }, [notices])
    const changeTheme = (e) => {
        setTheme(()=>{
            let value = !e.target.checked?"light":'dark'
            config.set(value)
            return value
        })
    }
   
    

    return (
        
        <HashRouter basename="/">
            <ErrorBoundary>
                <div  className={theme}>
                    <div className="bg2_blue project textColor">
                        <header className="flexB pa12 bg1">
                            <span className="logo maH24">LOGO-{notices.length}</span>
                                <div className="flexB">
                                    {/* <HeaderNav  theme={theme}/> */}
                                    <div className={`flexB relative maR48`}>
                                        <SmallMusicPlayer/>
                                        {/* <div>
                                            <div className="icon_hover cursor">
                                                <IonIcon icon={shuffle} size="36px" ></IonIcon>
                                            </div>
                                            <div className="icon_hover cursor" >
                                            <IonIcon icon={ play } size="36px" ></IonIcon>
                                            </div>
                                        </div> */}
                                    </div>
                                <ThemeSwitch changeTheme={changeTheme}/>
                                <div className="noticeBtn_after paH6 maH12 borderR50 bg3" onClick={()=>handleHiddeNotices()}><IonIcon className="icon_hover" icon={notifications}></IonIcon></div>
                            </div>
                        </header>
                        <main className="flexBS pa24 bg2_blue">
                            <aside className="maR24 paH12 paV24 bg1 borderR12">
                                <HeaderNav changeTheme={changeTheme} direction="vertical" theme={theme}/>
                            </aside>
                            <div className="contentBox flexFull">
                                <Notices manageNotices={notices.hidde} />
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Routes>
                                        <Route exact path="/"  Component={()=><Home key="home"/>}></Route>
                                        <Route  path="/news/*" Component={()=>util.RouteGuard(<News key="news"/>)} ></Route>
                                        <Route path="/user" Component={()=><User key="user"/>}></Route>
                                        <Route path="/*" Component={()=><Navigate to="/"/>}></Route>
                                    </Routes> 
                                </Suspense>
                            </div>
                        </main>
                    </div>
                </div>
                
            </ErrorBoundary>
           
        </HashRouter>
    )
}


const mapStateToProps = (state) => ({
    notices: state.reducer.notices,
    music: state.home.music,
  });
const mapDispatchToProps = {
    handleHiddeNotices,
};


export default connect(mapStateToProps,mapDispatchToProps)(App)