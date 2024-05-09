import React, { useEffect,useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './style.module.less';
import {IonIcon} from "@ionic/react";
import { play, pause,shuffle, playBack, playForward, repeatOutline, returnDownBackOutline, volumeHighOutline, volumeMuteOutline } from 'ionicons/icons';
import musicsData from '@/api/data/musics.json';
const r = [
    '0b368fe8fd8c4dd6b7d438dd52d46517', 
    'c44fcb6d5b26c0ca959900bd44a28c0f', 
    'd3cbfa9181638bfb3fce57ad465f6f34', 
    'a4d8daef1e667c94cc0ba809ad431c85', 
    '5a3eb430dfccaf6009ee71f639777b93',
    '563030d1b8404cfdc47722a518e965ea', 
    '024b3e2370264bb184a9a3de82f49efe', 
    '2b44e0f601be6726a7dd30f52cb9b15f', 
    '8b4d15db171121c3b42381be625338ca', 
    'fd4e02f1434868f91c1ceefcfeb516d1',
    '69a5b4760d157cf53a493ea0a5ae67c3',
    'a46b97a67ec59c0f060e6387cfb1c244',
    '83305e9e1a3591b3fb56b497456a6b18',
    'a9e931e3e10ed43f0ca2a15b96453e86',
    '9f02ab453797f2d13104ef8e2bbaac6d',
    'acb5458baa3ca85aaf7dc75b1c8440ee',
    'a4d8daef1e667c94cc0ba809ad431c85',
    'cf3a18fb9b1634e0db7872258cd82bbb',
    'cf3a18fb9b1634e0db7872258cd82bbb',
]
const AudioPlayer = ({music,time,pauseCurrent,playMusic,pauseMusic,setMusicTime,handleRadomMusic},ref) => {
    const ownRef = useRef();
    const [playType,setPlayType] = useState('normal')
    const [volume,setVolume] = useState(true)
    
    useEffect(()=>{
        if(time.duration>0 && time.currentTime===time.duration)handleRadomMusic(playType)
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
                {/* <div className='flex'>
                    <div className={`${styles.audioPlayer} maR12 ${styles[`${music ?  'active' :  'stop' }Audio`]}`}>
                        <img className={!pauseCurrent ? 'running' : 'paused'} src='https://tse4-mm.cn.bing.net/th/id/OIF-C.yMIHLghWfARYn23xKJFeZgHaG1?pid=ImgDet&rs=1' />
                    </div>
                    <div className={styles.audioPlayerInfo}>
                        <div className='font14 maB6 textSingeLine'>{music ? music.name : "-"}</div>
                        <div className='fontSmall gray'>
                            {`${handleTime(time.currentTime)}/${handleTime (time.currentTime-time.duration)}`}
                        </div>
                    </div>
                </div> */}

                <div className="cursor maH6" onClick={handleChangeVolume}>
                    <IonIcon icon={volume ? volumeHighOutline: volumeMuteOutline} size="36px" ></IonIcon>
                </div> 
                <div className={styles.audioPlayerControl}>
                    <div className="cursor" onClick={()=>handleToBeforeNextMusic('before')}>
                        {music && <IonIcon icon={ playBack } size="36px"></IonIcon>}
                    </div>
                    <div className="cursor font36" onClick={()=>handlePlayMusic(music,false)}>
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


export default forwardRef(AudioPlayer);
