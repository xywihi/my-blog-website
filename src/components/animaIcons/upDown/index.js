import React from "react";
import "./style.less"
const UpDown = ({active,length=0})=> {
    
    return (
        
        <div className="upDown">
            {(new Array(length).fill(undefined)).map((item,index)=><div key={index} className={`dot ${active ? `dot${Math.floor(Math.random() * 3)+1}` : ''}`}></div>)}
        </div>
    )
}


export default UpDown;