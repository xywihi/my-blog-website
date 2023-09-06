import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.less';

const AudioPlayer = ({data,activeOther}) => {
    const ref = useRef();
    const [audioData,setAudioData] = useState({currentTime:"--:--",totalDuration:"--:--"})
    const [playAudio,setPlayAudio] = useState("stop")
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
       
        
        
        setTimeout(() => {
            ref.current.duration && setAudioData({currentTime:Math.ceil(ref.current.currentTime/60),totalDuration: Math.ceil(ref.current.duration/60) + ":"+Math.ceil(ref.current.duration%60)})
            }, 200);
        // setAudioData(oldV=>{
        //     console.log('---------',oldV,ref.current.duration)
        //     return {currentTime:Math.ceil(ref.current.currentTime/60),totalDuration: 198.791837}
        // })
    }

    return (
        <div className={styles.audioPlayerBox}>
            {
                data && 
                <audio ref={ref} className="widthFull opacity0" controls>
                    <source src={data.resource} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            }
            
            <div className={`${styles.audioPlayer} maR16 ${styles[`${data ? activeOther ? 'active' : data.pause ? playAudio : 'pause' : playAudio }Audio`]}`}>
                <img src='https://tse4-mm.cn.bing.net/th/id/OIF-C.a8xSz4omfgM1xB6n3UVwig?pid=ImgDet&rs=1' />
            </div>
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
