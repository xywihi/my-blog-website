import React, {useEffect, useState} from "react"
import NoticesItem from "./components/noticeItem";
import styles from './style.module.less'
import { connect } from 'react-redux';
import {controllUpdateNotice} from '@/store/actions';
import {IonIcon} from "@ionic/react";
import { close } from 'ionicons/icons';
import socket from "../../http/socke"
const NoticesBox =() => {
    const [stopUpdateNotice,setStopUpdateNotice]=useState(false)
    const [notices,setNotices]=useState([])
    useEffect(()=>{
        socket.on('message', (data) => {
            console.log('接收到服务器消息:', data);
            data && setNotices(pre=>{
                return [...pre,data]
            })
        });
        return ()=>{
            // clearInterval(timer)
        }
    },[])
    const handleControllUpdate = (controllUpdate,item) => {
        // controllUpdateNotice(!stopUpdateNotice)
        setStopUpdateNotice(controllUpdate)
        setTimeout(() => {
            // setToUnmont(true)
            handleUpdateNotice(item ? item : notices[0])
        }, 3000);
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
            console.log("vvvvvvvvvvvvvv",pre,data)
            return newNotices
        })
    }
    const handleClearNotices = () => {
          setNotices([])
    }
    return (
        notices.length>0 && 
        <div className={styles.box} onMouseEnter={()=>handleControllUpdate(true)} onMouseLeave={()=>handleControllUpdate(false)}>
            <IonIcon className={styles.clear_btn+' '+"maB12 bg1 pa6 borderR50 "} icon={close} size="18px" onClick={handleClearNotices}></IonIcon>
            <div>
                {notices.map((item,index)=><NoticesItem key={item.id} index={index} stopUpdateNotice={stopUpdateNotice} notices={notices} updateNotice={handleControllUpdate} data={item}/>)}
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     notices: state.reducer.notices,
//     // stopUpdateNotice:state.reducer.stopUpdateNotice
//   });
// const mapDispatchToProps = {
//     controllUpdateNotice,
// };

// export default connect(mapStateToProps,mapDispatchToProps)(NoticesBox)
export default NoticesBox