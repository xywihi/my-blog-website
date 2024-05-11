import React, { useEffect,useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './style.module.less';
import {IonIcon} from "@ionic/react";
import { play, pause,shuffle, playBack, playForward, repeatOutline, returnDownBackOutline, volumeHighOutline, volumeMuteOutline } from 'ionicons/icons';
import musicsData from '@/api/data/musics.json';
const AudioPlayerTwo = ({music,time,pauseCurrent,playMusic,pauseMusic,setMusicTime,handleRadomMusic},ref) => {
    const ownRef = useRef();
    const [playType,setPlayType] = useState('normal')
    const [volume,setVolume] = useState(true)
    useEffect(()=>{
        // ownRef.current && ownRef.current?.addEventListener('pause',()=>{
        //     console.log('pause')
        //     pauseMusic(true)
        // });
        // ownRef.current && ownRef.current?.addEventListener('play',()=>{
        //     console.log('play')
        //     pauseCurrent && pauseMusic(false)
        // });
        debugger;
    },[])
    useEffect(()=>{
        if(time.duration>0 && time.currentTime===time.duration){
            handleRadomMusic(playType);
        }
        
    },[time])

    useEffect(()=>{
        if(music){
            handlePlayMusic(music)
        }
    },[music])
    useEffect(()=>{
        let audio = ownRef.current;
        if(audio){
            if(pauseCurrent){
                audio.pause()
            }else{
                try {
                    audio.play().catch(error=>{
                    })
                } catch (error) {
                    
                }
            }
        }
    },[pauseCurrent])
    useImperativeHandle(
        ref,
        () => ({ play,el:ownRef.current })
      );
    
    const handlePlayMusic = (currentData) => {
        let audio = ownRef.current;
        audio.src = currentData.resource;
        audio.currentTime = 0;
        audio.play().catch(error=>{
            // console.log('error',error)
        });
    }
    const getTime = (e)=>{
        setMusicTime({currentTime:e.target.currentTime ,duration:e.target.duration})
    }
    
    const handleError = (e)=>{
        pauseMusic(false)
        playMusic(null)
    }
    const handleChangePlayType = (e)=>{
        let type = playType;
        switch (playType) {
            case 'normal':
                type='single'
                break;
            case 'single':
                type='radom'
                break;
            default:
                type='normal'
                break;
        }
        setPlayType(type)
    }
    const handleChangeVolume = (e)=>{
        setVolume(!volume)
    }
    const handleToBeforeNextMusic = (beforeOrNext)=>{
        let index = musicsData.findIndex(item=>item.id===music.id);
        let newMusic = beforeOrNext ==='before' ? (!index ? musicsData[musicsData.length-1] : musicsData[index-1]) : (index === (musicsData.length-1) ? musicsData[0] : musicsData[index+1]);
        playMusic(newMusic)
    }
    
    
    return (
        <div style={{width:"100%"}}>
            <div className={[styles.audioPlayerBox]}>
                {
                    <audio id='bigAudio' muted={!volume} onErrorCapture={handleError} onPause={getTime} onTimeUpdate={getTime} ref={ownRef} className="widthFull opacity0" controls>
                        <source src={music ? music.resource : null} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                }

                <div className="cursor maH6" onClick={handleChangeVolume}>
                    <IonIcon icon={volume ? volumeHighOutline: volumeMuteOutline} size="36px" ></IonIcon>
                </div> 
                <div className={styles.audioPlayerControl}>
                    <div className="cursor" onClick={()=>handleToBeforeNextMusic('before')}>
                        {music && <IonIcon icon={ playBack } size="36px"></IonIcon>}
                    </div>
                    <div className="cursor font36" onClick={()=>pauseMusic(!pauseCurrent)}>
                        {music && <IonIcon icon={ !pauseCurrent ? pause : play } size="36px" ></IonIcon>}
                    </div>
                    <div className="cursor" aria-disabled={musicsData.findIndex(item=>item.id===music?.id)===(musicsData.length-1)} onClick={handleToBeforeNextMusic}>
                        {music && <IonIcon icon={ playForward } size="36px"></IonIcon>}
                    </div>
                </div>
                <div onClick={handleChangePlayType}>
                    {
                        <div className="cursor maH6" >
                            <IonIcon icon={playType === 'normal' ? repeatOutline : playType === 'single' ? returnDownBackOutline : shuffle} size="36px" ></IonIcon>
                        </div>
                    }
                </div>
                
            </div>

            
        </div>
    );
}


export default forwardRef(AudioPlayerTwo);
