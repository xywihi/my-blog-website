import React,{ Suspense, useEffect }  from "react";
import {  HashRouter, Route, Routes } from 'react-router-dom'
import util from './util'
import HeaderNav from "./components/HeaderNav";
const Home = React.lazy(() => import('./pages/home'))
const News = React.lazy(() => import('./pages/news'))
const User = React.lazy(() => import('./pages/user'))
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary'))
const newLocalStorage = new util.LocalStorage;
export default function App(){
    useEffect(() => {
        newLocalStorage.set("token",'Ber sddjjkwjfhiheh87687212ihr2khfjk')
        return () => {
            console.log('销毁当前项目')
        }
    }, [])
    return (
        <HashRouter basename="/">
            <HeaderNav/>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" Component={()=><Home key="home"/>}></Route>
                    <Route path="/news" Component={()=>util.RouteGuard(<News key="news"/>)}></Route>
                    <Route path="/user" Component={()=><User key="user"/>}></Route>
                </Routes> 
                <ErrorBoundary/>
            </Suspense>
        </HashRouter>
    )
}
