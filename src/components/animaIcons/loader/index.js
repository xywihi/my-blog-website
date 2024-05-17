import React from "react";
import "./style.less"
const Loader = (props)=> {
    return (
        <div className="loader loader-3" {...props}>
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
        </div>
    )
}


export default Loader;