import React, { useEffect, useState, useRef,useMemo } from "react"
import styles from'./style.module.less'
import {IonIcon} from "@ionic/react"
import { close } from 'ionicons/icons';
import {connect} from 'react-redux'
const NoticesItem =({data,index,notices,stopUpdateNotice}) => {
    const [length]=useState(notices.filter(it=>!it.unmont).length)
    const countRef = useRef(stopUpdateNotice);
    
    useEffect(()=>{
        if(!stopUpdateNotice){
            // updateNotice(false,data)
        }else{
            return
        }
        return ()=>{
        }
    },[])
    return (
        
        <div className={[styles.box+' '+`pa24 maB12 bg3 borderR12 ${(data.unmont ? styles.toUnmont:"")}`]}>
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