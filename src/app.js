import React,{ Suspense, useEffect, useState }  from "react";
import {  HashRouter, Route, Routes } from 'react-router-dom'
import util from './util'
import HeaderNav from "./components/HeaderNav";
import './global.css'
import themestyle from "./styles/theme.less"
import ThemeSwitch from "./components/themeSwitch"
import config from './config'
const Home = React.lazy(() => import('./pages/home'))
const News = React.lazy(() => import('./pages/news'))
const User = React.lazy(() => import('./pages/user'))
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary'))
const newLocalStorage = new util.LocalStorage;
export default function App(){
    const [theme,setTheme] = useState('light')
    useEffect(() => {
        newLocalStorage.set("token",'Ber sddjjkwjfhiheh87687212ihr2khfjk')

        return () => {
            console.log('销毁当前项目')
        }
    }, [])
    useEffect(() => {
        console.log('777777777777777777777',config)
    }, [config])
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
                    <div className="bg1 project textColor">
                        <header className="flexB pa24">
                            <span className="logo maH24">LOGO</span>
                            <div className="flexB">
                                {/* <HeaderNav  theme={theme}/> */}
                                <ThemeSwitch changeTheme={changeTheme}/>
                            </div>
                        </header>
                        <main className="flexB paH24">
                            <aside className="paH12 paV12 bg2 borderR12">
                                <HeaderNav changeTheme={changeTheme} direction="vertical" theme={theme}/>
                            </aside>
                            <div className="paH24 paV12 flexFull">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Routes>
                                        <Route exact path="/" Component={()=><Home key="home"/>}></Route>
                                        <Route path="/news" Component={()=>util.RouteGuard(<News key="news"/>)}></Route>
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
