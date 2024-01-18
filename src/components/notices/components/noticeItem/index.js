import React, { useEffect, useState, useRef,useMemo } from "react"
import styles from'./style.module.less'
import {IonIcon} from "@ionic/react"
import { close } from 'ionicons/icons';
import {connect} from 'react-redux'
const NoticesItem =({data,index,notices,updateNotice,stopUpdateNotice}) => {
    const [length]=useState(notices.filter(it=>!it.unmont).length)
    const countRef = useRef(stopUpdateNotice);
    const timerRef = useRef(null);
    useEffect(()=>{
        // setLength(notices.filter(it=>!it.unmont).length)
        // stopUpdateNotice && clearTimeout(timer)
        if(!stopUpdateNotice){
            console.log('!!!!!!!!',length)
            
            // timerRef.current = setTimeout(() => {
                
            //     console.log('data------------',data)
                updateNotice(false,data)
            //     // setToUnmont(true)
            // }, 3000);
        }else{
            // console.log('timer',timerRef.current)
            // clearTimeout(timerRef.current)
            return
        }
        return ()=>{
        }
    },[])
    // useEffect(()=>{
    //     console.log("stopUpdateNotice",stopUpdateNotice)
    //     if(length){
    //         countRef.current = stopUpdateNotice;
    //         let unmontLength = notices.filter(it=>it.unmont).length
    //         // if(!stopUpdateNotice){
    //         //     console.log('!!!!!!!!',countRef.current,length)
                
    //         //     timerRef.current = setTimeout(() => {
    //         //         console.log(',,,,,,,,,,,,,',countRef.current,length)
                    
    //         //         if(countRef.current)  {
                        
    //         //             return
    //         //         };
    //         //         console.log('data------------',data)
    //         //         updateNotice(data)
    //         //         // setToUnmont(true)
    //         //     }, (stopUpdateNotice ? (length-unmontLength) : length) * 6000);
    //         console.log('???????',index)
            
    //     }
    //     // stopUpdateNotice && clearTimeout(timer)
    // },[stopUpdateNotice])
    return (
        !data.unmont && 
        <div className={[styles.box+' '+"box pa24 maB12 bg3 borderR12"]}>
            {
                !data.unmont && 
                <>
                    <span>
                        {data.text}
                    </span>
                    <div className={[styles.closeBtn]}>
                        <IonIcon className={ "closeBtn bg1 pa6 borderR50"} icon={close} size="18px"></IonIcon>
                    </div>
                </>
            }
        </div>
    )
}

export default NoticesItem