import React,{useEffect, useState, createRef} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import { play, pause, shuffle } from 'ionicons/icons';
import {connect} from "react-redux"
import {playMusic,pauseMusic,handleShowArea} from "@/pages/home/store/actions"
import musc from "@/assets/audio/shine.mp3"
import news from "@/assets/audio/new.mp3"
import starts from "@/assets/audio/starts.mp3"
import haojiubujian from "@/assets/audio/haojiubujian.mp3"
import hongmeihuaerkai from "@/assets/audio/hongmeihuaerkai.mp3"
import ningyuan from "@/assets/audio/ningyuan.mp3"
import AudioPlayer from "./components/audioPlayer"
import musicsData from '@/api/data/musics.json';
// const audios = [{name:"Shine",resource:musc,pause:false,id:0},{name:"New Normal",resource:news,pause:false,id:1},{name:"we'll be the starts",resource:starts,pause:false,id:2}]
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
const SmallMusicPlayer = ({music,time,showArea,pauseCurrent,playMusic,pauseMusic,handleShowArea}) => {
    const [activeOther,setActiveOther] = useState(true)
    const childTranslate = createRef(null)
      
    useEffect(() => {
        //获取当前路由
      // console.log('-------+++++++++++++++++++++++',window.location.hash)
        getMusics()
        return ()=>{
        }
    }, [])
    const handleRadomMusic = function(){
        const randomNum = Math.floor(Math.random() * musicsData.length);
        let radomMusic = musicsData[randomNum]
        playMusic({...radomMusic});
    }
    const changeAudio = (item)=>{
        let newItem = {...item,pause: music.pause}
        playMusic(newItem)
        childTranslate.current.play(newItem,(!music || item.id!=music.id))
        music && setActiveOther(item.id!=music.id)
    }
    const getMusics = async ()=>{
        // const require = new HttpRequire;
        // let URL = "https://www.jango.com/music/The+Weeknd"
        // const data = await require.get(URL)
        // // console.log(data)
    }
    
    return (
        music &&
        <div className={`bg_gray smallMusicPlayer ${styles.item2_inner1}`} data-url='https://tse4-mm.cn.bing.net/th/id/OIF-C.yMIHLghWfARYn23xKJFeZgHaG1?pid=ImgDet&rs=1'>
            <div className={`${styles.playerBox} flexB relative`}>
                <AudioPlayer showArea={showArea} music={music} time={time} pauseCurrent={pauseCurrent} activeOther={activeOther} pauseMusic={pauseMusic} handleShowArea={handleShowArea} ref={childTranslate} handleRadomMusic={handleRadomMusic}/>
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
    pauseMusic,
    handleShowArea
};


export default connect(mapStateToProps,mapDispatchToProps)(SmallMusicPlayer)