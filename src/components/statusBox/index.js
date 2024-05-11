import React, {useEffect, useRef} from "react"
import styles from './style.module.less'
import OwnError from "./components/OwnError";
import OwnWarning from "./components/OwnWarning";
import OwnSucceed from "./components/OwnSucceed";
const StatusBox =({statusBoxData,devastateEl}) => {
    const ref= useRef(null);
    let timer=null;
    useEffect(()=>{
        // const elementStyle = window.getComputedStyle(ref.current)
        const element = ref.current.getBoundingClientRect()
        ref.current.style.left = `${window.innerWidth/2-element.width/2}px`;
        timer = setTimeout(() => {
            devastateEl({...statusBoxData,show:false})
        }, 8000);
        return ()=>{
            clearInterval(timer)
        }
    },[])
    
    return (
        <div ref={ref} className={`${styles.statusBoxBox}`}>
            {statusBoxData.status==='error' ? <OwnError {...statusBoxData}/>:statusBoxData.status==='warning'?<OwnWarning {...statusBoxData}/>:<OwnSucceed {...statusBoxData}/>}
        </div>
    )
}
export default StatusBox