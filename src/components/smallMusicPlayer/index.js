import React,{useEffect, useState, createRef,useRef} from "react";
import styles from './styles.module.less'
import OwnSlider from "@/components/OwnSlider"
import UpDown from "../animaIcons/upDown";
import {connect} from "react-redux"
import {handleTime,handleTimeToNumber,enterFullScreen,exitFullScreen} from "@/util/tools.ts"
import {playMusic,setMusicTime,pauseMusic,handleShowArea} from "@/pages/home/store/actions"
import AudioPlayerOne from "./components/AudioPlayerOne";
import AudioPlayerTwo from "./components/AudioPlayerTwo";
import musicsData from '@/api/data/musics.json';
const SmallMusicPlayer = ({music,time,showArea,pauseCurrent,playMusic,pauseMusic,handleShowArea,setMusicTime}) => {
    const [startMove,setStartMove] = useState(0)
    const [activeOther,] = useState(true)
    const [currentLyric,setCurrentLyric] = useState([])
    const childTranslate = createRef(null)
    const ownRef = useRef()
    useEffect(() => {
        //获取当前路由
      // console.log('-------+++++++++++++++++++++++',window.location.hash)
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
        console.log('music-------+++++++++++++++++++++++',music)
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
                ownRef.current?.scrollTo({
                    top: index*27,
                    left: 0,
                    behavior: 'smooth'
                })
            };
            return toMove;
        })
        if(time.currentTime===time.duration){
            ownRef.current?.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }, [time])
    const handleRadomMusic = function(){
        const randomNum = Math.floor(Math.random() * musicsData.length);
        let radomMusic = musicsData[randomNum]
        playMusic({...radomMusic});
    }
    const handleChangeTime = (proportion)=>{
        if(childTranslate.current.el){
            childTranslate.current.el.pause()
            childTranslate.current.el.currentTime = time.duration*proportion;
            childTranslate.current.el.play().then(res=>{
                console.log("播放成功")
                pauseMusic(false)
            }).catch(err=>{
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
    return (
        <>
            {music &&
            <div className={`bg_gray smallMusicPlayer`} data-url='https://tse4-mm.cn.bing.net/th/id/OIF-C.yMIHLghWfARYn23xKJFeZgHaG1?pid=ImgDet&rs=1'>
                <div className={`${styles.playerBox} flexB relative`}>
                    <AudioPlayerOne showArea={showArea} music={music} time={time} pauseCurrent={pauseCurrent} activeOther={activeOther} pauseMusic={pauseMusic} handleShowArea={handleShowArea} ref={childTranslate} handleRadomMusic={handleRadomMusic}/>
                </div>
            </div>}
            <div >
                {music?.imgUrl && <div className={styles.showArea_contentBox_backImg} style={{backgroundImage: `url(${music?.imgUrl})`}}></div>}
                <div className={styles.showArea_contentBox} >
                    
                    {/* <div className={`${styles.audioPlayerImg} maR12 ${styles[`${music ?  'active' :  'stop' }Audio`]}`}>
                        <img className={(!pauseCurrent && music)? 'running' : 'paused'} src={music?.imgUrl} />
                        {(music) && <UpDown active={!pauseCurrent} length={20}/>}
                    </div> */}
                    <div className={styles.showArea_contentBox_rightBox}>
                        {/* <div>
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
                        </div> */}
                        <div className={styles.audioPlayer}>
                            <div className={`${styles.playerBox} flexB maB12 relative`}>
                                <AudioPlayerTwo music={music} time={time} pauseCurrent={pauseCurrent} ref={childTranslate} playMusic={playMusic} setMusicTime={setMusicTime} pauseMusic={pauseMusic} handleRadomMusic={handleRadomMusic}/>
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
        </>
        
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
    pauseMusic,
    handleShowArea,
    setMusicTime
};


export default connect(mapStateToProps,mapDispatchToProps)(SmallMusicPlayer)