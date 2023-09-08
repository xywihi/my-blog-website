import React,{useEffect, useState} from "react";
import styles from './styles.module.less'
import {IonIcon} from "@ionic/react"
import { play, pause, shuffle } from 'ionicons/icons';
import {connect} from "react-redux"
import HttpRequire from "../../../../http/require";
import {playMusic} from "../../store/actions"
import musc from "../../../../assets/audio/shine.mp3"
import news from "../../../../assets/audio/new.mp3"
import starts from "../../../../assets/audio/starts.mp3"
import AudioPlayer from "../../../../components/audioPlayer"
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
]
const MusicPlayer = ({music,playMusic}) => {
    const [activeOther,setActiveOther] = useState(null)
    useEffect(() => {
       
        return ()=>{
        }
    }, [])
    const radomMusic = () => {
        console.log('/..ksdhfjsdhkfhsd')
        // const require = new HttpRequire
        // const apiKey = 'sN3NTyNA7H2rTLLbz4p8nrRpPO9i9ofC'; // 用你的MusicBrainz API密钥替换
        // const artistName = 'The Beatles'; // 要搜索的艺术家名称
        const randomNum = Math.floor(Math.random() * 10);
        console.log("randomNum",randomNum)
        playMusic({name:"Unknown",resource:`https://tribeofnoisestorage.blob.core.windows.net/music/${r[randomNum]}.mp3`,pause:music ? !music.pause : true,id:randomNum+'unknown'})
        music && setActiveOther(true)
    }
    const changeAudio = (item)=>{
        
        playMusic({...item,pause:music ? !music.pause : !item.pause})
        music && setActiveOther(item.id!=music.id)
    }
    
    return (
        
        <div className={`${styles.item2_inner1}`} data-url='https://tse4-mm.cn.bing.net/th/id/OIF-C.a8xSz4omfgM1xB6n3UVwig?pid=ImgDet&rs=1'>
            <div className={`${styles.playerBox} flexB maB12 relative`}>
                <AudioPlayer data={music} activeOther={activeOther}/>
                <div>
                    <div className="icon_hover cursor" onClick={radomMusic}>
                        <IonIcon icon={shuffle} size="36px" ></IonIcon>
                    </div>
                    <div className="icon_hover cursor" onClick={()=>changeAudio(music)}>
                        {music && <IonIcon icon={ (music.pause || activeOther) ? pause : play } size="36px" ></IonIcon>}
                    </div>
                </div>
            </div>
            <ul>
                {audios.map((item,index)=>
                    <li key={item.id} className="cursor" onClick={()=>changeAudio(item)}>
                        <div className="paV12 flexB">
                            <span className="textSingeLine font14">{item.name}</span>
                            {(music && music.id===item.id) && <IonIcon icon={ (music.pause || activeOther) ? pause : play} size="36px"></IonIcon>}
                        </div>
                        {index!=(audios.length-1) && <hr className="opacity20"/>}
                    </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    music: state.home.music,
  });
const mapDispatchToProps = {
    playMusic,
};


export default connect(mapStateToProps,mapDispatchToProps)(MusicPlayer)