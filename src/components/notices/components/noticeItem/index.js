import React, { useEffect, useState, useRef,useMemo } from "react"
import styles from'./style.module.less'
import {IonIcon} from "@ionic/react"
import { close } from 'ionicons/icons';
import {connect} from 'react-redux'
const NoticesItem =({data,index,notices,handleControllUpdate,stopUpdateNotice}) => {
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
        
        <div className={[styles.box+' '+`pa12 maB12 bg3 borderR12 ${(data.unmont ? styles.toUnmont:"")}`]}>
            {
                !data.unmont && 
                <>
                    <div>
                        <p className="maB6 fontSmall flexB textColorGgray2">
                           <span> {data.type}</span>
                           <span> {data.time}</span>
                        </p>
                    <span>
                        {data.text}
                    </span>
                    </div>
                    <div className={[styles.closeBtn]} onClick={()=>handleControllUpdate(true,data,true)}>
                        <IonIcon className={ "closeBtn bg1 pa6 borderR50"} icon={close} size="18px" ></IonIcon>
                    </div>
                </>
            }
        </div>
    )
}

export default NoticesItem