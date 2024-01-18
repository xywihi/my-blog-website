import React, {useEffect, useState, useRef} from "react"
import NoticesItem from "./components/noticeItem";
import styles from './style.module.less'
import {IonIcon} from "@ionic/react";
import { close,arrowForward } from 'ionicons/icons';
import socket from "../../http/socke"
const NoticesBox =({manageNotices}) => {
    // const [stopUpdateNotice,setStopUpdateNotice]=useState(false)
    const [notices,setNotices]=useState([])
    const timerRef = useRef(null);
    const stopUpdateNotice = useRef(false);
    useEffect(()=>{
        socket.on('message', (data) => {
            console.log('接收到服务器消息:', data);
            data && setNotices(pre=>{
                return [...pre,data]
            })
        });
        return ()=>{
            clearInterval(timerRef.current)
        }
    },[])
    useEffect(()=>{
        if(notices.length>0){
            let falseArr = notices.filter(item=>!item.unmont)
            falseArr && handleControllUpdate(stopUpdateNotice.current,falseArr[0])
        }
    },[notices])
    const handleControllUpdate = (controllUpdate,item,deleteIt) => {
        stopUpdateNotice.current=controllUpdate;
        if(!stopUpdateNotice.current){
            timerRef.current=setTimeout(() => {
                if(stopUpdateNotice.current){
                    clearInterval(timerRef.current);
                    return;
                }
                handleUpdateNotice(item ? item : notices[0])
            }, 5000);
        }else if(deleteIt){
            handleUpdateNotice(item)
        }
        else{
            console.log("timerRef.current",timerRef.current)
            clearInterval(timerRef.current)
        }
        
    }
    const handleUpdateNotice = (data) => {
          setNotices(pre=>{
            let newNotices = pre.map(item=>{
                if(item.id==data.id){
                  return {...item,unmont:true}
                }else{
                  return item
                }
              })
            return newNotices
        })
    }
    const handleClearNotices = () => {
          setNotices([])
    }
    return (
        <div className={`${manageNotices?styles.hidde:""}`}>
            <div className={styles.box} onMouseEnter={()=>handleControllUpdate(true)} onMouseLeave={()=>handleControllUpdate(false)}>
                <div>
                    <IonIcon className={styles.clear_btn+' '+"bg1 pa6 borderR50 maR12"} icon={close} size="18px" onClick={handleClearNotices}></IonIcon>
                    <IonIcon className={styles.clear_btn+' '+"bg1 pa6 borderR50"} icon={arrowForward} size="18px" onClick={()=>handleHiddeNotices(!hiddeNotices)}></IonIcon>
                </div>
                <div className="scrollbarBox paV12 paL24 heightFull">
                    {notices.map((item,index)=><NoticesItem key={item.id} index={index} stopUpdateNotice={stopUpdateNotice} notices={notices} handleControllUpdate={handleControllUpdate} data={item}/>)}
                </div>
            </div>
        </div>
        
    )
}

// const mapStateToProps = (state) => ({
//     manageNotices: state.reducer.notices,
//     // stopUpdateNotice:state.reducer.stopUpdateNotice
//   });
// const mapDispatchToProps = {
//     handleHiddeNotices,
//     updateNoticeNum
// };

// export default connect(mapStateToProps,mapDispatchToProps)(NoticesBox)
export default NoticesBox