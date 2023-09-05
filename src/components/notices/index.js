import React, {useEffect, useState} from "react"
import NoticesItem from "./components/noticeItem";
import styles from './style.module.less'
import { connect } from 'react-redux';
import {controllUpdateNotice} from '../../store/actions'
const NoticesBox =({length,notices,stopUpdateNotice,controllUpdateNotice}) => {
    
    useEffect(()=>{
        console.log("oldV11111", length)
        
        return ()=>{
            // clearInterval(timer)
        }
    },[])
    // useEffect(()=>{
    //     let timer
    //     clearInterval(timer)
    //     timer = setInterval(() => {
    //         // setArr(oldV=>{
    //         //     // if (oldV.length==0){
    //         //     //     clearInterval(timer);
    //         //     //     return oldV;
    //         //     // }
    //         //     // let test = JSON.parse(JSON.stringify(oldV))
    //         //     // console.log('ooooo',test)
    //         //     // test.splice(0,1)
    //         //     // console.log(test)
    //         //     // return test
    //         //     return []
    //         // })
    //         console.log("oldV22222", data.length,unmontNoticesNum)
    //         setUnmontNoticesNum(oldV=>{
    //             console.log("oldV",oldV,data.length)
    //             if(data.length>oldV){
    //                 return oldV+1
    //             }else{
    //                 clearInterval(timer)
    //                 return oldV
    //             }
    //         })
            
    //     }, 3000);
    // },[data])
    const handleControllUpdate = () => {
        controllUpdateNotice(!stopUpdateNotice)
    }
    return (
        <div  className={styles.box} onMouseEnter={handleControllUpdate} onMouseLeave={handleControllUpdate}>
            {notices.length>0 && notices.map((item,index)=><NoticesItem key={item.id} data={item}/>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    notices: state.reducer.notices,
    stopUpdateNotice:state.reducer.stopUpdateNotice
  });
const mapDispatchToProps = {
    controllUpdateNotice,
};

export default connect(mapStateToProps,mapDispatchToProps)(NoticesBox)