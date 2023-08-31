import React, {useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import util from '../../util'
const routes = [
    {path:"/",text:"Home"},
    {path:"/news",text:"News"},
    {path:"/user",text:"User"},
]
const newLocalStorage = new util.LocalStorage;
function HeaderNav(){
    const navigate = useNavigate();
    const logout = () => {
        newLocalStorage.delete("token")
        navigate(location.hash)
    }
    return (
        <nav>
            <ul>
                {
                    routes.map(item=>(
                        <li key={item.text}>
                            <Link to={item.path}>{item.text}</Link>
                        </li>
                    ))
                }
                <li>
                    <span onClick={logout}>退出</span>
                </li>
            </ul>
        </nav>
    )
}

export default HeaderNav