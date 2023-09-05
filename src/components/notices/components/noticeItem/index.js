import React, { useEffect, useState, useRef } from "react"
import styles from'./style.module.less'
import {IonIcon} from "@ionic/react"
import { close } from 'ionicons/icons';
import {connect} from 'react-redux'
import {updateNotice,} from '../../../../store/actions'
const NoticesItem =({data,notices,updateNotice,stopUpdateNotice}) => {
    const [toUnmont,setToUnmont]=useState(false)
    const [length]=useState(notices.filter(it=>!it.unmont).length)
    const countRef = useRef(stopUpdateNotice);
    const timerRef = useRef(null);
    useEffect(()=>{
        // setLength(notices.filter(it=>!it.unmont).length)
        // stopUpdateNotice && clearTimeout(timer)

        return ()=>{
            clearTimeout(timerRef.current)
        }
    },[])
    useEffect(()=>{
        if(length){
            countRef.current = stopUpdateNotice;
            let unmontLength = notices.filter(it=>it.unmont).length
            if(!stopUpdateNotice){
                console.log('!!!!!!!!',countRef.current,length)
                
                timerRef.current = setTimeout(() => {
                    console.log(',,,,,,,,,,,,,',countRef.current,length)
                    
                    if(countRef.current)  {
                        
                        return
                    };
                    updateNotice(data)
                    // setToUnmont(true)
                }, (stopUpdateNotice ? (length-unmontLength) : length) * 3000);
                console.log('timer111',timerRef.current)
            }else{
                console.log('timer',timerRef.current)
                clearTimeout(timerRef.current)
                
            }
        }
        // stopUpdateNotice && clearTimeout(timer)
    },[stopUpdateNotice])
    return (
        <div className={[styles.box+' '+"box pa24 maB12 bg3 borderR12" + ' ' + (data.unmont ? styles.toUnmont : '')]}>
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

const mapStateToProps = (state) => ({
    notices: state.reducer.notices,
    stopUpdateNotice: state.reducer.stopUpdateNotice,
  });
const mapDispatchToProps = {
    updateNotice,
    
};


export default connect(mapStateToProps,mapDispatchToProps)(NoticesItem)