import React,{useEffect, useState,createRef,useRef} from "react";
import styles from './styles.module.less'

import {connect} from "react-redux"
import {playMusic,setMusicTime,pauseMusic,handleShowArea} from "@/pages/home/store/actions"
import AudioPlayer from "./components/audioPlayer"
import {handleTime,handleTimeToNumber,enterFullScreen,exitFullScreen} from "@/util/tools.ts"
import OwnSlider from "@/components/OwnSlider"
import UpDown from "../animaIcons/upDown";
import {IonIcon} from "@ionic/react"
import { play, pause,shuffle } from 'ionicons/icons';
import musicsData from '@/api/data/musics.json'
const childTranslate = createRef();
const MusicPlayer = ({music,time,pauseCurrent,showArea,playMusic,setMusicTime,pauseMusic,handleShowArea}) => {
    const [startMove,setStartMove] = useState(0)
    const [currentLyric,setCurrentLyric] = useState([])
    const ownRef = useRef()
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
        if(music) {
            showArea && enterFullScreen()
            // document.body.style.overflow = showArea ? 'hidden' : 'auto';
            document.querySelector("html").style.overflow = showArea?"hidden":"auto";
            //禁止页面滚动
        }
    }, [showArea])
    useEffect(() => {
        if(!music?.lyric) return;
        currentLyric.some((item,index)=>{
            let toMove = time.currentTime>=item.time&&time.currentTime<=(currentLyric[index+1]?currentLyric[index+1].time:time.duration);
            if(toMove){
                ownRef.current.scrollTo({
                    top: index*27,
                    left: 0,
                    behavior: 'smooth'
                })
            };
            return toMove;
        })
        if(time.currentTime===time.duration){
            ownRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }, [time])

    const changeAudio = (item)=>{
        let newItem = {...item,pause: false}
        playMusic(newItem)
        // childTranslate.current.play(newItem,(false))
        // childTranslate.current.play(newItem,(!music || item.id!=music.id))
        // music && setActiveOther(item.id!=music.id)
    }
    // const getMusics = async ()=>{
    //     // const require = new HttpRequire;
    //     // let URL = "https://www.jango.com/music/The+Weeknd"
    //     // const data = await require.get(URL)
    //     // console.log(data)
    // }
    const handleShowMusicArea = (proportion)=>{
    }
    const handleChangeTime = (proportion)=>{
        if(childTranslate.current.el){
            childTranslate.current.el.pause()
            childTranslate.current.el.currentTime = time.duration*proportion;
            childTranslate.current.el.play().catch(err=>{
                // console.log(err)
            })
        }

    }
    const handleCloseAreaStart = (e)=>{
        setStartMove(e.touches[0].pageY)
    }
    const handleCloseArea = (e)=>{
        if(!e.touches?.[0]){
            handleShowArea(false)
            exitFullScreen();
            return
        }
        let difference = e.touches[0].pageY-startMove;
        if(difference>80){
            handleShowArea(false);
            exitFullScreen();
        }
    }
    const handleCloseAreaEnd = (e)=>{
        setStartMove(0)
    }
    const handleRadomMusic = function(playType){
        let newMusic=null;
        // console.log(playType)
        if(playType==="radom"){
            const randomNum = Math.floor(Math.random() * (musicsData.length-1));
            newMusic = musicsData.filter(item=>item.id!==music?.id)[randomNum]
        }else if(playType==="single"){
            newMusic = music;
        }else{
            let index = musicsData.findIndex(item=>item.id===music?.id);
            newMusic = musicsData[index+1]?musicsData[index+1]:musicsData[0];
        }
        
        pauseMusic(false)
        playMusic({...newMusic});
    }
    return (
        <div onTouchStart={handleCloseAreaStart} onTouchEnd={handleCloseAreaEnd} onTouchMove={handleCloseArea} onDoubleClick={handleCloseArea} className={`heightFull no-select`}>
            <div className={`overflowY heightFull scrollbarBox ${styles.smallMusicBox}`}>
                <ul>
                    {musicsData.map((item,index)=>
                    <li key={item.id} className="cursor" onClick={()=>changeAudio(item)}>
                        <div className="paV12 flexB">
                            <div className="flexC">
                                <img className="maR12 borderR6" src={item?.imgUrl} />
                                {/* {(music) && <UpDown active={!pauseCurrent} length={20}/>} */}
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
            <div className={`${styles.showAreaBox} ${showArea ? styles.showArea : styles.showAreaHide}`} >
                {music?.imgUrl && <div className={styles.showArea_contentBox_backImg} style={{backgroundImage: `url(${music?.imgUrl})`}}></div>}
                <div className={styles.showArea_contentBox} >
                    
                    <div className={`${styles.audioPlayerImg} maR12 ${styles[`${music ?  'active' :  'stop' }Audio`]}`}>
                        <img className={(!pauseCurrent && music)? 'running' : 'paused'} src={music?.imgUrl} />
                        {(music) && <UpDown active={!pauseCurrent} length={20}/>}
                    </div>
                    <div className={styles.showArea_contentBox_rightBox}>
                        <div>
                            <h2 className="fontB">{music?.name}</h2>
                            <p className={`${styles.singer} maT6`}>{music?.singer}</p>
                        </div>
                        <div ref={ownRef} className={`${styles.lyrics} scrollbarBox`}>
                            {
                                currentLyric.length===0 ? <div className={styles.noLyric}>暂无歌词</div> :
                                <ul>
                                    {currentLyric.map((item,index)=>
                                    <li className={
                                        (time.currentTime>=Number(item.time) && 
                                        time.currentTime<=((currentLyric[index+1] ? Number(currentLyric[index+1].time):time.duration)) ? 
                                        styles.text_active : styles.text_default)} 
                                        key={index}
                                    >
                                            {item.lineLyric}
                                    </li>)}
                                </ul>
                            }
                        </div>
                        <div className={styles.audioPlayer}>
                            <div onClick={handleShowMusicArea} className={`${styles.playerBox} flexB maB12 relative`}>
                                <AudioPlayer music={music} time={time} pauseCurrent={pauseCurrent} ref={childTranslate} playMusic={playMusic} setMusicTime={setMusicTime} pauseMusic={pauseMusic} handleRadomMusic={handleRadomMusic}/>
                            </div>
                            <div className={styles.progressBar}>
                                <div className="widthFull">
                                    <OwnSlider pauseMusic={pauseMusic} handleChangeTime={handleChangeTime} {...time}/>
                                    <div className="flexB maT24">
                                        <span className="font14">{handleTime (time.currentTime)}</span>
                                        
                                        <span className="font14">{handleTime (time.currentTime-time.duration)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                                                                              
                </div>
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