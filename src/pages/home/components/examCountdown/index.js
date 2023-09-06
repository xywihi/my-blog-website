import React,{useEffect, useState,useRef} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import { bookOutline, colorWand, calendar, checkmarkCircle } from 'ionicons/icons';
const ExamCountdown = (props) => {
    const ref = useRef()
    const [edit,setEdit] = useState(false)
    const [showExams,setShowExams] = useState(false)
    const [date,setDate] = useState('2023/10/28')
    useEffect(() => {
        // throwError()
        
        return ()=>{
            // clearTimeout(timer)
        }
    }, [])
    const handleEdit =() => {
        setEdit(!edit)
        if(edit){

        }
      }
    const changeDate =(event) => {
        setDate(event.target.value.replace(/-/g,'/'))
      }
    return (
        <div  className={styles.item2_inner2}  onMouseEnter={()=>setShowExams(!showExams)} onMouseLeave={()=>setShowExams(!showExams)}>
            <div className={`${styles.editIcon} flexB widthFull`}>
                <span>{edit && '编辑内容'}</span>
                <IonIcon icon={edit ? checkmarkCircle : colorWand} size="36px" onClick={handleEdit}></IonIcon>
            </div>
            {!edit ? 
                <div className={`${styles.item2_inner2_inner1} maB24 flexB column`}>
                    <div className="fontB">{Math.ceil((new Date(date)-new Date())/(1000*60*60*24))}</div>
                    <span className="fontSmall gray">{date}</span>
                </div> :
                <div className={`${styles.editBox}  widthFull`}>
                    <IonIcon className={`${styles.dateIcon} maH12`} icon={calendar} size="36px"></IonIcon>
                    <input className="widthFull opacity0" value={date} ref={ref} onChange={changeDate} type="date"/>
                    <div className={`${styles.dateInput} paH12 borderR12 bg3`} onClick={()=>SelectDate()}>{date}</div>
                </div>
            }
            <div className="flexB column">
                {
                    !showExams ?
                    <>
                        <IonIcon className="maB12" icon={bookOutline} size="36px"></IonIcon>
                        <div>自考倒计时</div>
                    </> :
                    <ul className={styles.examsBox}>
                        <li className="fontSmall">C++程序设计</li>
                        <li className="fontSmall">计算机网络原理</li>
                    </ul>
                }
                
            </div>
        </div>
    )
}


export default ExamCountdown;