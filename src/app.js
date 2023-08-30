import React,{ Suspense }  from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter, Route, Routes,Link } from 'react-router-dom'
import ErrorBoundary from "./components/ErrorBoundary"
// import Home from "./pages/home"
// import News from "./pages/news"
// import User from "./pages/user"
const Home = React.lazy(() => import('./pages/home'))
const News = React.lazy(() => import('./pages/news'))
const User = React.lazy(() => import('./pages/user'))
export default function App(){
    return (
        <>
            
        <HashRouter basename="/">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
                <li>
                    <Link to="/user">User</Link>
                </li>
            </ul>
        </nav>
            <Suspense fallback={<div>Loading...</div>} >
            <Routes>
                
                <Route exact path="/" element={<Home/>}></Route>
                <Route  path="/news" element={<News/>}></Route>
                <Route  path="/user" element={<User/>}></Route>
            </Routes> 
                    <ErrorBoundary>
                </ErrorBoundary>  
            </Suspense>
            
        </HashRouter>
        </>
        
    )
}
