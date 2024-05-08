import React, {useEffect} from "react";
import { Route, Routes } from 'react-router-dom'

const Person = React.lazy(() => import('./pages/person'))
const Community = React.lazy(() => import('./pages/community'))
function News(){
    useEffect(() => {
        return () => {
            console.log('我被销毁了')
        }
    }, [])
    return (
        <Routes>
            <Route  path="community" Component={()=><Community key="community"/>}></Route>
            <Route  path="person" Component={()=><Person key="person"/>}></Route>
        </Routes>
    )
}

export default News
