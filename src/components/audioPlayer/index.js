import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.less';

const AudioPlayer = ({data,activeOther}) => {
    const ref = useRef();
    const timer=null;
    const [audioData,setAudioData] = useState({currentTime:"--:--",totalDuration:"--:--"})
    const [playAudio,setPlayAudio] = useState("stop")
    useEffect(()=>{
        if(ref.current){
            ref.current.addEventListener('ended', () => {
                play()
              });
        }
        return ()=>{
            clearInterval(timer)
        }
    },[])
    useEffect(()=>{
        if(data){
            setPlayAudio("active")
            play()
        }
        
    },[data])
    const play = () => {
        let audio = ref.current;
        console.log('resource----8888',activeOther)
        audio.pause();
        if(activeOther){
            audio.currentTime = 0;
            audio.src = data.resource;
            audio.play()
        }else{
            if(data.pause) {
                audio.play()
            };
        }
       
        
        
        let timer = setInterval(() => {
            console.log('-----------',ref.current.currentTime)
            setAudioData({currentTime:handleTime(ref.current.currentTime) ,totalDuration:handleTime(ref.current.duration)})
        }, 1000);  
    }
    const handleTime=(time)=>{
        let issingleNum = (num)=>{
            return `${num.toString().length>1 ? num : '0'+num}`
        }
        let is60 = (num)=>{
            return num==60 ? '00' : issingleNum(num)
        }
        
        return issingleNum(Math.ceil(time/60)) + ":"+is60(Math.ceil(time%60))
    }
    return (
        <div className={`${styles.audioPlayerBox} flexS`}>
            {
                data && 
                <audio ref={ref} className="widthFull opacity0" controls>
                    <source src={data.resource} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            }
            
            {
                playAudio!="stop" &&
                <div className={`${styles.audioPlayer} maR16 ${styles[`${data ? activeOther ? 'active' : data.pause ? playAudio : 'pause' : playAudio }Audio`]}`}>
                    <img src='https://tse4-mm.cn.bing.net/th/id/OIF-C.a8xSz4omfgM1xB6n3UVwig?pid=ImgDet&rs=1' />
                </div>
            }
            <div className={styles.audioPlayerInfo}>
                <div className='font18 maB6 textSingeLine'>{data ? data.name : "-"}</div>
                <div className='fontSmall gray'>
                    {`${audioData.currentTime}/${audioData.totalDuration}`}
                </div>
            </div>
        </div>
    );
}



export default AudioPlayer;
