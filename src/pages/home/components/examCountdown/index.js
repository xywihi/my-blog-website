import React,{useEffect, useState,useRef} from "react";
import styles from './styles.module.less';
import {IonIcon} from "@ionic/react";
import LocalStorage from '@/util/local_storage';
import {openBox} from '@/util/tools.ts';
const newLocalStorage = new LocalStorage()
import { bookOutline, colorWand, calendar, checkmarkCircle } from 'ionicons/icons';
const ExamCountdown = (props) => {
    const ref = useRef();
    const boxRef = useRef();
    const [edit,setEdit] = useState(false)
    const [showExams,setShowExams] = useState(false)
    const [date,setDate] = useState('2024-10-28')
    useEffect(() => {
        // throwError()
        let boxElement = boxRef.current;
        let boxParentElement = boxElement.parentElement;
        let parentWidth = boxParentElement.offsetWidth;
        let parentHeight = boxParentElement.offsetHeight;
        newLocalStorage.get('exam_date') && setDate(newLocalStorage.get('exam_date'))
        console.log('exam_page')
        boxElement.style.position = 'absolute';
        boxElement.style.width = `${parentWidth}px`;
        boxElement.style.height = `${parentHeight}px`;
        // 监听元素之外的点击事件
        document.addEventListener('click', e => openBox(e,boxRef.current,true));
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

        setDate(old=>{
            newLocalStorage.set('exam_date',event.target.value)
            return event.target.value
        })
        // setDate(event.target.value.replace(/-/g,'/'))
      }
    return (
        <div style={{position:'relative',width:'100%',height:'100%'}} >
            <div ref={boxRef} className={ `cardBox bg1 pa24 borderR12 ${styles.item2_inner2}`} onMouseEnter={()=>setShowExams(true)} onMouseLeave={()=>setShowExams(false)} onTouchStart={()=>setShowExams(true)} onTouchEnd={()=>setShowExams(false)}>
                <div className={`${styles.editIcon} flexB widthFull pa24`}>
                    {edit ? <span>{ '编辑内容'}</span> :
                    <div style={{width:'16px',height:'16px'}} onClick={e=>openBox(e,boxRef.current)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon class="svg-fill" points="68 10 90 10 90 27 100 27 100 0 68 0 68 10"/><polygon class="svg-fill" points="10 27 10 10 32 10 32 0 0 0 0 27 10 27"/><polygon class="svg-fill" points="90 63 90 90 68 90 68 100 100 100 100 63 90 63"/><polygon class="svg-fill" points="32 90 10 90 10 63 0 63 0 100 32 100 32 90"/><rect class="svg-fill" x="26" y="26" width="48" height="48"/></svg>
                    </div>
                    }
                    <IonIcon icon={edit ? checkmarkCircle : colorWand} size="36px" onClick={handleEdit}></IonIcon>
                </div>
                
                {!edit ? 
                    <div className={`${styles.item2_inner2_inner1} maB24 flexB column`}>
                        <div className="fontB">{Math.ceil((new Date(date)-new Date())/(1000*60*60*24))}</div>
                        <span className="fontSmall gray">{date.replace(/-/g,'/')}</span>
                    </div> :
                    <div className={`${styles.editBox}  widthFull`}>
                        <IonIcon className={`${styles.dateIcon} maH12`} icon={calendar} size="36px"></IonIcon>
                        <input className="widthFull opacity0" value={date} ref={ref} onChange={changeDate} type="date"/>
                        <div className={`${styles.dateInput} paH12 borderR12 bg3`}>{date}</div>
                    </div>
                }
                <div className={`flexB column`} >
                    {
                        !showExams ?
                        <>
                            <IonIcon className="maB12" icon={bookOutline} size="36px"></IonIcon>
                            <div>考试倒计时</div>
                        </> :
                        <ul className={styles.examsBox}>
                            <li className="fontSmall">C++程序设计</li>
                            <li className="fontSmall">计算机网络原理</li>
                        </ul>
                    }
                    
                </div>
            </div>
        </div>
    )
}


export default ExamCountdown;