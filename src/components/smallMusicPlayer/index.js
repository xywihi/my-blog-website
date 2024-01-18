import React,{useEffect, useState, createRef} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import { play, pause, shuffle } from 'ionicons/icons';
import {connect} from "react-redux"
import {playMusic} from "@/pages/home/store/actions"
import musc from "@/assets/audio/shine.mp3"
import news from "@/assets/audio/new.mp3"
import starts from "@/assets/audio/starts.mp3"
import AudioPlayer from "./components/audioPlayer"

import HttpRequire from "@/http/require"
const audios = [{name:"Shine",resource:musc,pause:false,id:0},{name:"New Normal",resource:news,pause:false,id:1},{name:"we'll be the starts",resource:starts,pause:false,id:2}]
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
const SmallMusicPlayer = ({music,playMusic}) => {
    const [activeOther,setActiveOther] = useState(true)
    const [currentRadio,setCurrentRadio] = useState(null)
    const childTranslate = createRef(null)
    useEffect(() => {
        getMusics()
        return ()=>{
        }
    }, [])
    const handleRadomMusic = function(play){
        const randomNum = Math.floor(Math.random() * r.length);
        let radomMusic = {name:"Unknown",resource:`https://tribeofnoisestorage.blob.core.windows.net/music/${r[randomNum]}.mp3`,pause:music ? !music.pause : true,id:randomNum+'unknown'}
        setCurrentRadio(radomMusic);
        setActiveOther(true);
        // playMusic(radomMusic)
        !childTranslate.current ? play(radomMusic,true) : childTranslate.current.play(radomMusic,true);
    }
    const changeAudio = (item)=>{
        let newItem = {...item,pause: !currentRadio ? true : item.id!=currentRadio.id ? true : !currentRadio.pause}
        setCurrentRadio(newItem)
        childTranslate.current.play(newItem,(!currentRadio || item.id!=currentRadio.id))
        currentRadio && setActiveOther(item.id!=currentRadio.id)
    }
    const getMusics = async ()=>{
        // const require = new HttpRequire;
        // let URL = "https://www.jango.com/music/The+Weeknd"
        // const data = await require.get(URL)
        // console.log(data)
    }
    
    return (
        <div className={`${styles.item2_inner1}`} data-url='https://tse4-mm.cn.bing.net/th/id/OIF-C.a8xSz4omfgM1xB6n3UVwig?pid=ImgDet&rs=1'>
            <div className={`${styles.playerBox} flexB maB12 relative`}>
                <AudioPlayer data={currentRadio} activeOther={activeOther} ref={childTranslate} handleRadomMusic={handleRadomMusic}/>
                <div className="maL24">
                    <div className="icon_hover cursor" onClick={handleRadomMusic}>
                        <IonIcon icon={shuffle} size="36px" ></IonIcon>
                    </div>
                    <div className="icon_hover cursor" onClick={()=>changeAudio(currentRadio)}>
                        {currentRadio && <IonIcon icon={ (currentRadio.pause) ? pause : play } size="36px" ></IonIcon>}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    music: state.home.music,
  });
const mapDispatchToProps = {
    playMusic,
};


export default connect(mapStateToProps,mapDispatchToProps)(SmallMusicPlayer)