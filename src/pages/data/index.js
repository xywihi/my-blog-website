import React, {useEffect} from "react";
import { Route, Routes } from 'react-router-dom'

const Overview = React.lazy(() => import('./pages/overview'))
const Orders = React.lazy(() => import('./pages/orders'))
const Customers = React.lazy(() => import('./pages/customers'))
const Articles = React.lazy(() => import('./pages/articles'))
function News(){
    useEffect(() => {
        return () => {
            // console.log('我被销毁了')
        }
    }, [])
    return (
        <Routes>
            <Route  path="/overview" Component={()=><Overview key="overview"/>}></Route>
            <Route  path="/orders" Component={()=><Orders key="orders"/>}></Route>
            <Route  path="/customers" Component={()=><Customers key="customers"/>}></Route>
            <Route  path="/articles" Component={()=><Articles key="articles"/>}></Route>
        </Routes>
    )
}

export default News
