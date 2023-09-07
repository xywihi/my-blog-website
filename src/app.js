import React,{ Suspense, useEffect, useState }  from "react";
import {  HashRouter, Route, Routes } from 'react-router-dom'
import util from './util'
import HeaderNav from "./components/HeaderNav";
import './global.css'
import './style.less'
import themestyle from "./styles/theme.less"
// import "./styles/ioniccss.css"
import ThemeSwitch from "./components/themeSwitch"
import config from './config'
import { addNotice } from "./store/actions";
import {connect} from 'react-redux'
import { IonIcon } from "@ionic/react";
import { notifications } from 'ionicons/icons';
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
const App = ({notices,addNotice}) =>{
    const [theme,setTheme] = useState('light');
    const [showNotice,setShowNotice] = useState(false);
    useEffect(() => {
        newLocalStorage.set("token",'Ber sddjjkwjfhiheh87687212ihr2khfjk')
        addNotice(test_notices)
        return () => {
            console.log('销毁当前项目')
        }
    }, [])
    useEffect(() => {
        console.log('777777777777777777777',config)
    }, [config])
    useEffect(() => {
        setShowNotice(notices.every(it=>it.unmont))
    }, [notices])
    const changeTheme = (e) => {
        setTheme(()=>{
            let value = !e.target.checked?"light":'dark'
            config.set(value)
            return value
        })
    }
    const addNotices = () => {
        addNotice(notices.concat({text:'郑爽和吴亦凡的百度百科都已修改，郑爽介绍内容中却还有作品名单',id:notices.length+1,unmont:false}))
    }
   
    console.log('notices',showNotice)

    return (
        
        <HashRouter basename="/">
            <ErrorBoundary>
                <div  className={theme}>
                    <div className="bg2_blue project textColor">
                        <header className="flexB pa24 bg1">
                            <span className="logo maH24">LOGO-{notices.length}</span>
                            <div className="flexB">
                                {/* <HeaderNav  theme={theme}/> */}
                                <ThemeSwitch changeTheme={changeTheme}/>
                                <div className="noticeBtn_after paH6 maH12 borderR50 bg3" onClick={addNotices}><IonIcon className="icon_hover" icon={notifications}></IonIcon></div>
                            </div>
                        </header>
                        <main className="flexBS pa24">
                            <aside className="paH12 paV24 bg1 borderR12">
                                <HeaderNav changeTheme={changeTheme} direction="vertical" theme={theme}/>
                            </aside>
                            <div className="paH24 flexFull">
                                {!showNotice && <Notices data={notices} length={notices.length}/>}
                                <Suspense fallback={<div>Loading...</div>}>
                                    
                                    <Routes>
                                        <Route exact path="/"  Component={()=><Home key="home"/>}></Route>
                                        <Route  path="/news/*" Component={()=>util.RouteGuard(<News key="news"/>)} ></Route>
                                        <Route path="/user" Component={()=><User key="user"/>}></Route>
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
  });
const mapDispatchToProps = {
    addNotice,
};


export default connect(mapStateToProps,mapDispatchToProps)(App)