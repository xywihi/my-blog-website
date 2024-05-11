import React,{useEffect,createRef} from "react";
import styles from './styles.module.less'

import {connect} from "react-redux"
import {playMusic,setMusicTime,pauseMusic,handleShowArea} from "@/pages/home/store/actions"
import {IonIcon} from "@ionic/react"
import { play, pause } from 'ionicons/icons';
import musicsData from '@/api/data/musics.json'
const MusicPlayer = ({music,pauseCurrent,playMusic,handleShowArea}) => {
    useEffect(() => {
        // getMusics();
        document.addEventListener('fullscreenchange', function(event) {
            if (!document.fullscreenElement) {
              // 退出全屏操作
              handleShowArea(false)
            }
          });
        return ()=>{
        }
    }, [])

    const changeAudio = (item)=>{
        let newItem = {...item,pause: false}
        playMusic(newItem)
    }
    return (
        <div className={`heightFull no-select`}>
            <div className={`overflowY heightFull scrollbarBox ${styles.smallMusicBox}`}>
                <ul>
                    {musicsData.map((item,index)=>
                    <li key={item.id} className="cursor" onClick={()=>changeAudio(item)}>
                        <div className="paV12 flexB">
                            <div className="flexC">
                                <img className="maR12 borderR6" src={item?.imgUrl} />
                                <div className={styles.musicNameBox}>
                                    <p className={`${(music && music.id===item.id) ? "text_active" : ""}`}>{item.name}</p>
                                    <p className={`font14 opacity20 maT6`}>{item.singer}</p>
                                </div>
                            </div>
                            <div className={`maR12 font24 ${styles.audioPlayerBox}`}>
                                <IonIcon icon={ (music?.id===item.id && !pauseCurrent) ? pause : play }></IonIcon>
                            </div>
                        </div>
                        {index!=(musicsData.length-1) && <hr className="opacity10"/>}
                    </li>)}
                </ul>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    music: state.home.music,
    time: state.home.time,
    pauseCurrent: state.home.pauseCurrent,
    showArea: state.home.showArea,
  });
const mapDispatchToProps = {
    playMusic,
    setMusicTime,
    pauseMusic,
    handleShowArea
};


export default connect(mapStateToProps,mapDispatchToProps)(MusicPlayer)