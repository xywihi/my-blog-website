import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './style.module.less';

const AudioPlayer = ({data,activeOther,handleRadomMusic},ref) => {
    let ownTimer=null;
    const [audioData,setAudioData] = useState({currentTime:"--:--",totalDuration:"--:--"})
    const [playAudio,setPlayAudio] = useState("stop")
    const ownRef = useRef()
    useEffect(()=>{
        ownRef.current.addEventListener('ended',()=>handleRadomMusic(play));
        return ()=>{
            clearInterval(ownTimer)
        }
    },[])
    useImperativeHandle(
        ref,
        () => ({ play,ownRef })
      );
    const play = (currentData,isOther) => {
        let audio = ownRef.current;
        audio.pause();
        if(isOther){
            
            audio.src = currentData.resource;
            audio.currentTime = 0;
            audio.play();
            
        }else{
            if(currentData.pause) {
                audio.play()
            };
        }
        ownTimer = setInterval(() => {
            setAudioData({currentTime:handleTime(ownRef.current.currentTime) ,totalDuration:handleTime(ownRef.current.duration)})
        }, 1000);  
    }
    const handleTime=(time)=>{
        if(!time) return "00:00"
        let issingleNum = (num)=>{
            return `${num.toString().length>1 ? num : '0'+num}`
        }
        let is60 = (num)=>{
            return num==60 ? '00' : issingleNum(num)
        }
        return issingleNum(Math.floor(time/60)) + ":"+is60(Math.ceil(time%60))
    }
    return (
        <div className={[styles.audioPlayerBox]} style={{ gridTemplateColumns:data?"auto 1fr":"0 1fr"}}>
            {
                <audio ref={ownRef} className="widthFull opacity0" controls>
                    <source src={data ? data.resource : null} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            }
            {
                <div className={`${styles.audioPlayer} maR12 ${styles[`${data ?  'active' :  playAudio }Audio`]}`}>
                    <img className={(data ? data.pause : activeOther) ? 'running' : 'paused'} src='https://tse4-mm.cn.bing.net/th/id/OIF-C.a8xSz4omfgM1xB6n3UVwig?pid=ImgDet&rs=1' />
                </div>
            }
            <div className={styles.audioPlayerInfo}>
                <div className='font14 maB6 textSingeLine'>{data ? data.name : "-"}</div>
                <div className='fontSmall gray'>
                    {`${audioData.currentTime}/${audioData.totalDuration}`}
                </div>
            </div>
        </div>
    );
}



export default forwardRef(AudioPlayer);