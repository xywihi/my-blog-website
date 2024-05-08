import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './style.module.less';
import UpDown from "../../../animaIcons/upDown";
import {IonIcon} from "@ionic/react"
import { play, pause, shuffle } from 'ionicons/icons';
import { handleTime, handleTimeToNumber } from '@/util/tools.ts';
const AudioPlayer = ({time,pauseCurrent,pauseMusic,showArea,handleRadomMusic,handleShowArea,music},ref) => {
    let ownTimer=null;
    const ownRef = useRef()
    const [currentLyric,setCurrentLyric] = useState([])
    const [currentSingleLyric,setCurrentSingleLyric] = useState('')
    useEffect(()=>{
        return ()=>{
            clearInterval(ownTimer)
        }
    },[])
    useEffect(() => {
        let newStrArr = music?.lyric ? music.lyric.split("|").map((item,index)=>{
            let newItem = item.split("-")
            return ({
                lineLyric:newItem[1],
                time:handleTimeToNumber(newItem[0])})
        }) : [];
        setCurrentLyric(newStrArr)
    }, [music])

    useEffect(() => {
        if(!music?.lyric) return;
        currentLyric.some((item,index)=>{
            let toMove = time.currentTime>=item.time&&time.currentTime<=(currentLyric[index+1]?currentLyric[index+1].time:time.duration);
            if(toMove){
                setCurrentSingleLyric(currentLyric[index].lineLyric)
            };
            return toMove;
        })
    }, [time])
    
    useImperativeHandle(
        ref,
        () => ({ play,ownRef })
      );
      const handlePlayMusic = (currentData,isOther) => {
        let audio = ownRef.current;
        if(isOther){
            audio.src = currentData.resource;
            audio.currentTime = 0;
            audio.play();
            
        }else{
            clearInterval(ownTimer)
            pauseMusic(!pauseCurrent)
        }
    }
    return (
        <div className='flexB'>
            <div className={[styles.audioPlayerBox]} style={{ gridTemplateColumns:music?"auto 1fr":"0 1fr"}}>
            {
                <div className={`${styles.imgBox} maR12 ${styles[`${music ?  'active' :  "stop" }Audio`]}`}>
                    <img onClick={()=>handleShowArea(!showArea)} className={!pauseCurrent ? 'running' : 'paused'} src={music?.imgUrl} />
                </div>
            }
            <div className={styles.audioPlayerInfo}>
                <div className='flexS'>
                    <div className='musicName maR12 font14 fontB'>{music ? music.name : "-"}</div>
                    <div className='fontSmall gray'>
                        {`${handleTime(time.currentTime)}/${handleTime (time.currentTime-time.duration)}`}
                    </div>
                </div>
                <div className={styles.lyricBox}>
                    {
                        currentLyric.length===0 ? <div className={styles.noLyric}>暂无歌词</div> :
                        <div>
                            {currentSingleLyric}
                        </div>
                    }
                </div>
            </div>
        </div>

        <div className='flexB'>
            <div className="icon_hover cursor maR6" onClick={handleRadomMusic}>
                <IonIcon icon={shuffle} size="36px" ></IonIcon>
            </div>
            <div className="icon_hover cursor" onClick={()=>handlePlayMusic(music,false)}>
                {music && <IonIcon icon={ !pauseCurrent ? pause : play } size="36px" ></IonIcon>}
            </div>
        </div>
        </div>
    );
}



export default forwardRef(AudioPlayer);
